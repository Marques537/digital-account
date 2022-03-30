import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, MinLength } from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';
export class CreateTransferDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  @MinLength(14)
  senderDocument: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  @MinLength(14)
  receiverDocument: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  value: number;
}
