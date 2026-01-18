import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const totalDevices = await this.prisma.device.count();

    const totalEmployees = await this.prisma.employee.count();

    const totalValueAggregate = await this.prisma.device.aggregate({
      _sum: {
        price: true,
      },
    });

    const devicesInStock = await this.prisma.device.count({
      where: {
        employeeId: null,
      },
    });

    return {
      totalDevices,
      totalEmployees,
      totalValue: totalValueAggregate._sum.price || 0,
      devicesInStock,
    };
  }
}