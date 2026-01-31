import { Module } from '@nestjs/common';
import { InfotypesController } from './infotypes.controller';
import { InfotypesService } from './infotypes.service';

@Module({
  controllers: [InfotypesController],
  providers: [InfotypesService],
})
export class InfotypesModule {}
