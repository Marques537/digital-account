import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'brazilian-class-validator';
import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class TransferDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  availableValue: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  receiverDocument: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  senderDocument: string;

  @ApiProperty()
  @IsDate()
  dateTime: Date;
}
