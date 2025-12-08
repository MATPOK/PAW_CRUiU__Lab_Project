import { IsString, IsNotEmpty, IsEmail, IsInt } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsInt()
  departmentId: number; // To połączy pracownika z działem
}