import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Jan', description: 'Imię pracownika' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Kowalski', description: 'Nazwisko pracownika' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'jan.kowalski@firma.pl', description: 'Adres email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 2, description: 'ID działu, w którym pracuje' })
  @IsNumber()
  @IsNotEmpty()
  departmentId: number;
}