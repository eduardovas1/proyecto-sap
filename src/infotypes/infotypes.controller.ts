import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { InfotypesService } from './infotypes.service';
import { InfotypeQueryDto, RangeQueryDto } from './dto/infotypes-query.dto';
import { InfotypeUpsertDto } from './dto/infotype-upsert.dto';


@Controller()
export class InfotypesController {
  constructor(private readonly infotypes: InfotypesService) {}

  @Get('employees/:xcnumper/infotypes/:code')
  getCurrent(
    @Param('xcnumper') xcnumper: string,
    @Param('code') code: string,
    @Query() query: InfotypeQueryDto,
  ) {
    return this.infotypes.getCurrent(xcnumper, code, query.date);
  }

  @Get('employees/:xcnumper/infotypes/:code/history')
  getHistory(
  @Param('xcnumper') xcnumper: string,
  @Param('code') code: string,
  ) {
    return this.infotypes.getHistory(xcnumper, code);
  }

  @Get('employees/:xcnumper/infotypes/:code/range')
  getRange(
    @Param('xcnumper') xcnumper: string,
    @Param('code') code: string,
    @Query() query: RangeQueryDto,
  ) {
    return this.infotypes.getRange(xcnumper, code, query.from, query.to);
  }
  // ✅ NUEVO: crear nueva vigencia (versionado)
  @Post('employees/:xcnumper/infotypes/:code')
  createVersion(
    @Param('xcnumper') xcnumper: string,
    @Param('code') code: string,
    @Body() body: InfotypeUpsertDto,
  ) {
    return this.infotypes.createVersion(xcnumper, code, body);
  }
}
