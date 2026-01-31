import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
import { InfotypesModule } from './infotypes/infotypes.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [PrismaModule, EmployeesModule, InfotypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
