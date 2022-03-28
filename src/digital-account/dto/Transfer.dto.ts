import { IsString, IsNumber, IsDate } from 'class-validator';

export class TransferDto {
  @IsNumber()
  id: number;

  @IsNumber()
  availableValue: number;

  @IsString()
  receiverDocument: string;

  @IsString()
  senderDocument: string;

  @IsDate()
  dateTime: Date;
}
