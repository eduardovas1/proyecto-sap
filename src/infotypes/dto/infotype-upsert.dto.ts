import { IsObject, IsOptional, IsString, Matches } from 'class-validator';

export class InfotypeUpsertDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  validFrom?: string; // YYYY-MM-DD

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  validTo?: string; // YYYY-MM-DD

  @IsObject()
  data!: Record<string, any>; // campos del infotipo (sin XCNUMPER, XCFECINI, XCFECFIN)
}
