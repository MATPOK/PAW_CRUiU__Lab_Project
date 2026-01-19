import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.prisma.department.create({
      data: createDepartmentDto,
    });
  }

  findAll(search?: string) {
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { location: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    return this.prisma.department.findMany({
      where,
      include: { employees: true },
      orderBy: { id: 'asc' }
    });
  }

  findOne(id: number) {
    return this.prisma.department.findUnique({
      where: { id },
      include: { employees: true },
    });
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.prisma.department.update({
      where: { id },
      data: updateDepartmentDto,
    });
  }

  remove(id: number) {
    return this.prisma.department.delete({
      where: { id },
    });
  }
}