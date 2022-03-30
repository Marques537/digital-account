import { Injectable, BadRequestException } from '@nestjs/common';
import { Transfer } from '../database/entity/Transfer.entity';
import { DigitalAccount } from '../database/entity/DigitalAccount.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryTransferDto } from '../dto/History-Transfer.dto';
@Injectable()
export class HistoryTransferService {
  constructor(
    @InjectRepository(Transfer)
    private transfersRepository: Repository<Transfer>,
    @InjectRepository(DigitalAccount)
    private accountsRepository: Repository<DigitalAccount>,
  ) {}

  async execute(document: string): Promise<Transfer[]> {
    const Account = await this.accountsRepository.findOne({
      document: document,
    });
    if (Account) {
      return await this.transfersRepository
        .createQueryBuilder('transfer')
        .select([
          'transfer.id',
          'sender.document',
          'sender.name',
          'receiver.document',
          'receiver.name',
          'transfer.value',
          'transfer.dateTime',
        ])
        .andWhere('transfer.senderId = :senderId', {
          senderId: Account.id,
        })
        .orWhere('transfer.receiverId = :receiverId', {
          receiverId: Account.id,
        })
        .innerJoin('transfer.senderDigitalAccount', 'sender')
        .innerJoin('transfer.receiverDigitalAccount', 'receiver')
        .getMany();
    } else throw new BadRequestException('Account not found');
  }
}
