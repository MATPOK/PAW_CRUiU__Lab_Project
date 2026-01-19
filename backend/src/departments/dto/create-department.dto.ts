import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'IT', description: 'Nazwa działu' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Piętro 3', description: 'Lokalizacja biura' })
  @IsString()
  @IsNotEmpty()
  location: string;
}