import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './devices/devices.module';
import { PrismaModule } from './prisma/prisma.module';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [DevicesModule, PrismaModule, DepartmentsModule, EmployeesModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
