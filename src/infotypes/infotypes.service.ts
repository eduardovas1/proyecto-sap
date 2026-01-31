import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { INFOTYPES, InfotypeCode } from './infotypes.registry';
import { InfotypeUpsertDto } from './dto/infotype-upsert.dto';

function parseDateOrThrow(s: string): Date {
  const d = new Date(`${s}T00:00:00`);
  if (Number.isNaN(d.getTime())) throw new BadRequestException('Fecha inválida. Usa YYYY-MM-DD');
  return d;
}

function to9999(): Date {
  return new Date('9999-12-31T00:00:00');
}

function minusOneDay(d: Date): Date {
  const x = new Date(d);
  x.setDate(x.getDate() - 1);
  return x;
}

@Injectable()
export class InfotypesService {
  constructor(private prisma: PrismaService) {}

  // Wrappers para que el Controller compile con nombres estándar
  getCurrent(xcnumper: string, code: string, date?: string) {
    return this.getCurrent(xcnumper, code, date); // 👈 cambia este nombre al tuyo real
  }

  getHistory(xcnumper: string, code: string) {
    return this.getHistory(xcnumper, code); // 👈 cambia este nombre al tuyo real
  }

  getRange(xcnumper: string, code: string, from?: string, to?: string) {
    return this.getRange(xcnumper, code, from, to); // 👈 cambia este nombre al tuyo real
  }


  async createVersion(xcnumper: string, code: string, body: InfotypeUpsertDto) {
    const cfg = INFOTYPES[code as InfotypeCode];
    if (!cfg) throw new NotFoundException(`Infotipo ${code} no configurado`);

    const model = (this.prisma as any)[cfg.table];
    if (!model) throw new NotFoundException(`Modelo Prisma ${cfg.table} no existe`);

    const validFrom = body.validFrom ? parseDateOrThrow(body.validFrom) : new Date();
    const validTo = body.validTo ? parseDateOrThrow(body.validTo) : to9999();

    // ⚠️ data: NO debe traer XCNUMPER/XCFECINI/XCFECFIN (los controla el backend)
    const data = body.data ?? {};
    delete data.XCNUMPER;
    delete data.XCFECINI;
    delete data.XCFECFIN;

    // Busco el vigente a la fecha validFrom
    const current = await model.findFirst({
      where: {
        XCNUMPER: xcnumper,
        XCFECINI: { lte: validFrom },
        XCFECFIN: { gte: validFrom },
      },
      orderBy: { XCFECINI: 'desc' },
    });

    return this.prisma.$transaction(async (tx) => {
      const txModel = (tx as any)[cfg.table];

      // 1) Si hay vigente, lo cierro el día anterior al nuevo inicio
      if (current) {
        const newEndForCurrent = minusOneDay(validFrom);

        // si el nuevo inicio es antes o igual al inicio actual, no se puede cerrar correctamente
        if (newEndForCurrent < new Date(current.XCFECINI)) {
          throw new BadRequestException(
            `validFrom (${body.validFrom}) debe ser mayor que XCFECINI actual (${current.XCFECINI.toISOString().slice(0,10)})`,
          );
        }

        await txModel.updateMany({
          where: { XCNUMPER: xcnumper, XCFECINI: current.XCFECINI },
          data: { XCFECFIN: newEndForCurrent },
        });
      }

      // 2) Inserto la nueva versión
      const created = await txModel.create({
        data: {
          XCNUMPER: xcnumper,
          XCFECINI: validFrom,
          XCFECFIN: validTo,
          ...data,
        },
      });

      return {
        ok: true,
        code,
        xcnumper,
        created,
        closedPrevious: current ? { XCFECINI: current.XCFECINI, oldEnd: current.XCFECFIN } : null,
      };
    });
  }
}
