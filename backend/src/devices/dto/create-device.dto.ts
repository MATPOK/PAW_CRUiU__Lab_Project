import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty({ example: 'SN-12345', description: 'Unikalny numer seryjny' })
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @ApiProperty({ example: 'Laptop (Dell XPS)', description: 'Typ urządzenia' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 4500.00, description: 'Cena zakupu w PLN' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: '2023-10-25T00:00:00.000Z', description: 'Data zakupu' })
  @IsDateString()
  purchaseDate: string;

  @ApiProperty({ example: 1, description: 'ID pracownika (opcjonalne)', required: false })
  @IsNumber()
  @IsOptional()
  employeeId?: number;
}