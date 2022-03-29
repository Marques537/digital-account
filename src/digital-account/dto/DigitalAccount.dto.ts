import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'brazilian-class-validator';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class DigitalAccountDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  document: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  availableValue: number;
}
