import { DigitalAccount } from '../database/entity/DigitalAccount.entity';
import { Expose } from 'class-transformer';
export class HistoryTransferDto {
  @Expose()
  id: number;
  @Expose()
  value: number;
  @Expose()
  senderDigitalAccount: DigitalAccount;
  @Expose()
  receiverDigitalAccount: DigitalAccount;
  @Expose()
  dateTime: Date;
}
