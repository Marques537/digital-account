import { Injectable } from '@nestjs/common';
import { Transfer } from '../database/entity/Transfer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryTransferDto } from '../dto/History-Transfer.dto';
@Injectable()
export class HistoryTransferService {
  constructor(
    @InjectRepository(Transfer)
    private transfersRepository: Repository<Transfer>,
  ) {}

  async findByDocument(document: string): Promise<HistoryTransferDto[]> {
    return await this.transfersRepository.find({
      where: [{ senderDocument: document }, { receiverDocument: document }],
    });
  }
}
