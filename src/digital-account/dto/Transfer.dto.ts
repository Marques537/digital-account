import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'brazilian-class-validator';
import { Expose } from 'class-transformer';

export class TransferDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  availableValue: number;

  @ApiProperty()
  @Expose()
  value: number;

  @ApiProperty()
  @Expose()
  @IsCPF()
  receiverDocument: string;

  @ApiProperty()
  @Expose()
  @IsCPF()
  senderDocument: string;

  @ApiProperty()
  @Expose()
  dateTime: Date;

  constructor(transferDto?: Partial<TransferDto>) {
    this.id = transferDto?.id;
    this.availableValue = transferDto?.availableValue;
    this.value = transferDto?.value;
    this.receiverDocument = transferDto?.receiverDocument;
    this.senderDocument = transferDto?.senderDocument;
    this.dateTime = transferDto?.dateTime;
  }
}
