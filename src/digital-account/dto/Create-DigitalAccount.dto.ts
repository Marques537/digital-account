import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'brazilian-class-validator';
import { IsString, IsNumber, IsNotEmpty, Length } from 'class-validator';
export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  @Length(14)
  document: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  availableValue: number;
}
