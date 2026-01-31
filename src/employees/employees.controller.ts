import { Controller, Get, Param, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesQueryDto } from './dto/employees-query.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employees: EmployeesService) {}

  @Get()
  list(@Query() q: EmployeesQueryDto) {
    return this.employees.list(q.date, q.page ?? 1, q.pageSize ?? 20, q.q);
  }

  @Get(':xcnumper')
  getOne(@Param('xcnumper') xcnumper: string, @Query() q: EmployeesQueryDto) {
    return this.employees.getOne(xcnumper, q.date);
  }
}
