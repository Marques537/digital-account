import { Injectable } from '@nestjs/common';
import { Transfer } from '../interface/Transfer.interface';

@Injectable()
export class HistoryTransferService {
  private transferences: Transfer[] = [];

  findByDocument(document: string) {
    this.transferences.push({
      senderDocument: '21',
      receiverDocument: '23',
      value: 100,
      dateTime: new Date(),
    });

    this.transferences.push({
      senderDocument: '23',
      receiverDocument: '23',
      value: 200,
      dateTime: new Date(),
    });
    this.transferences.push({
      senderDocument: '31',
      receiverDocument: '23',
      value: 100,
      dateTime: new Date(),
    });
    this.transferences.push({
      senderDocument: '21',
      receiverDocument: '33',
      value: 140,
      dateTime: new Date(),
    });
    this.transferences.push({
      senderDocument: '21',
      receiverDocument: '93',
      value: 100,
      dateTime: new Date(),
    });

    return this.transferences.filter(
      (transfer) =>
        transfer.senderDocument === document ||
        transfer.receiverDocument === document,
    );
  }
}
