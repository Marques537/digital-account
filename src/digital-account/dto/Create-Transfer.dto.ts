import { IsString, IsNumber } from 'class-validator';

export class CreateTransferDto {
  @IsString()
  senderDocument: string;

  @IsString()
  receiverDocument: string;

  @IsNumber()
  value: number;
}
