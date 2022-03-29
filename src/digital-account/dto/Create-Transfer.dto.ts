import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';

export class CreateTransferDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  senderDocument: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  receiverDocument: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  value: number;
}
