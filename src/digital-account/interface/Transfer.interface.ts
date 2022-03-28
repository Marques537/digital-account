export interface Transfer {
  id?: number;
  senderDocument: string;
  receiverDocument: string;
  value: number;
  dateTime: Date;
}
