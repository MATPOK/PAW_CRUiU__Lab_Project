import { IsString, IsNotEmpty, IsNumber, IsPositive, IsDateString, IsOptional } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsDateString()
  purchaseDate: string; // Prisma przyjmie string ISO-8601 i zamieni na datę

  @IsNumber()
  @IsOptional()
  employeeId?: number;
}