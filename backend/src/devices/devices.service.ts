import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  create(createDeviceDto: CreateDeviceDto) {
    return this.prisma.device.create({
      data: createDeviceDto,
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    // Wykonujemy dwa zapytania równolegle: pobranie danych i policzenie wszystkich
    const [data, total] = await this.prisma.$transaction([
      this.prisma.device.findMany({
        skip: skip,
        take: limit,
        include: { employee: true }, // Od razu pobierzemy dane pracownika!
        orderBy: { id: 'desc' }, // Najnowsze na górze
      }),
      this.prisma.device.count(),
    ]);

    return {
      data,        // Lista urządzeń
      total,       // Łączna liczba urządzeń w bazie
      page,        // Aktualna strona
      limit,       // Ile wyników na stronę
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.prisma.device.findUnique({
      where: { id },
    });
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return this.prisma.device.update({
      where: { id },
      data: updateDeviceDto,
    });
  }

  remove(id: number) {
    return this.prisma.device.delete({
      where: { id },
    });
  }
}