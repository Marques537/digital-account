import { DigitalAccount } from '../database/entity/DigitalAccount.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class HistoryTransferDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  value: number;

  @ApiProperty()
  @Expose()
  senderDigitalAccount: DigitalAccount;

  @ApiProperty()
  @Expose()
  receiverDigitalAccount: DigitalAccount;

  @ApiProperty()
  @Expose()
  dateTime: Date;
}
