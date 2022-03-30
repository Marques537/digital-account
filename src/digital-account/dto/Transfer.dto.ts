import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'brazilian-class-validator';
import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class TransferDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  availableValue: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  value: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsCPF()
  receiverDocument: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsCPF()
  senderDocument: string;

  @ApiProperty()
  @Expose()
  @IsDate()
  dateTime: Date;
}
