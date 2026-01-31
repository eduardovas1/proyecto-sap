import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

function parseDateOrToday(date?: string): Date {
  if (!date) return new Date();
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) throw new BadRequestException('date inválida. Usa YYYY-MM-DD');
  return d;
}

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async list(date?: string, page = 1, pageSize = 20, q?: string) {
    const at = parseDateOrToday(date);
    const skip = (page - 1) * pageSize;

    const personalModel = (this.prisma as any).TXCAP0004;
    const orgModel = (this.prisma as any).TXCAP0002;

    if (!personalModel) throw new NotFoundException('Modelo Prisma TXCAP0004 no encontrado');
    if (!orgModel) throw new NotFoundException('Modelo Prisma TXCAP0002 no encontrado');

    const wherePersonal: any = {
      XCFECINI: { lte: at },
      XCFECFIN: { gte: at },
    };

    // búsqueda simple: si q es número, filtra por XCNUMPER
    if (q && q.trim()) {
      const s = q.trim();
      if (/^\d+$/.test(s)) wherePersonal.XCNUMPER = s;
    }

    const [total, personals] = await Promise.all([
      personalModel.count({ where: wherePersonal }),
      personalModel.findMany({
        where: wherePersonal,
        orderBy: { XCNUMPER: 'asc' },
        skip,
        take: pageSize,
      }),
    ]);

    const data = await Promise.all(
      (personals as any[]).map(async (p) => {
        const org = await orgModel.findFirst({
          where: {
            XCNUMPER: p.XCNUMPER,
            XCFECINI: { lte: at },
            XCFECFIN: { gte: at },
          },
          orderBy: { XCFECINI: 'desc' },
        });

        return {
          xcnumper: p.XCNUMPER,
          personal: p,
          organizational: org ?? null,
        };
      }),
    );

    return {
      data,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
        date: date ?? null,
      },
    };
  }

  async getOne(xcnumper: string, date?: string) {
    const at = parseDateOrToday(date);

    const personalModel = (this.prisma as any).TXCAP0004;
    const orgModel = (this.prisma as any).TXCAP0002;

    if (!personalModel) throw new NotFoundException('Modelo Prisma TXCAP0004 no encontrado');
    if (!orgModel) throw new NotFoundException('Modelo Prisma TXCAP0002 no encontrado');

    const personal = await personalModel.findFirst({
      where: { XCNUMPER: xcnumper, XCFECINI: { lte: at }, XCFECFIN: { gte: at } },
      orderBy: { XCFECINI: 'desc' },
    });

    if (!personal) throw new NotFoundException(`Empleado ${xcnumper} no encontrado (TXCAP0004 vigente)`);

    const organizational = await orgModel.findFirst({
      where: { XCNUMPER: xcnumper, XCFECINI: { lte: at }, XCFECFIN: { gte: at } },
      orderBy: { XCFECINI: 'desc' },
    });

    return {
      xcnumper,
      date: date ?? null,
      personal,
      organizational: organizational ?? null,
      links: {
        current: `/api/employees/${xcnumper}`,
        infotype0002: `/api/employees/${xcnumper}/infotypes/0002`,
        infotype0004: `/api/employees/${xcnumper}/infotypes/0004`,
      },
    };
  }
}
