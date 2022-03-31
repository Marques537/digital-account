import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'brazilian-class-validator';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class DigitalAccountDto {
  @ApiProperty()
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  @Expose()
  document: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  availableValue: number;

  constructor(digitalAccountDto?: Partial<DigitalAccountDto>) {
    this.id = digitalAccountDto?.id;
    this.name = digitalAccountDto?.name;
    this.document = digitalAccountDto?.document;
    this.availableValue = digitalAccountDto?.availableValue;
  }
}
