import { Injectable } from '@nestjs/common';
import { Transfer } from '../database/entity/Transfer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class HistoryTransferService {
  constructor(private connection: Connection) {}

  private transferences: Transfer[] = [];

  findByDocument(document: string) {
    return this.transferences.filter(
      (transfer) =>
        transfer.senderDocument === document ||
        transfer.receiverDocument === document,
    );
  }
}
