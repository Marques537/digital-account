import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Transfer } from '../database/entity/Transfer.entity';
import { DigitalAccount } from '../database/entity/DigitalAccount.entity';
import { CreateTransferDto } from '../dto/Create-Transfer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, MoreThan } from 'typeorm';
import { TransferDto } from '../dto/Transfer.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class CreateTransferService {
  constructor(
    @InjectRepository(Transfer)
    private transfersRepository: Repository<Transfer>,
    @InjectRepository(DigitalAccount)
    private accountRepository: Repository<DigitalAccount>,
    private connection: Connection,
  ) {}

  async execute(createTransfer: CreateTransferDto): Promise<TransferDto> {
    const senderAccount = await this.accountRepository.findOne({
      document: createTransfer.senderDocument,
    });
    const receiverAccount = await this.accountRepository.findOne({
      document: createTransfer.receiverDocument,
    });

    if (!senderAccount) {
      throw new NotFoundException('senderAccount does not exist');
    }
    if (!receiverAccount) {
      throw new NotFoundException('receiverAccount does not exist');
    }
    if (senderAccount.availableValue < createTransfer.value) {
      throw new ConflictException('insufficient funds');
    }
    if (senderAccount.id == receiverAccount.id) {
      throw new ConflictException(
        'the destination and origin account are the same',
      );
    }
    const date = dayjs(new Date()).subtract(2, 'minutes').toDate();
    const duplicateTransfer = await this.transfersRepository.findOne({
      senderId: senderAccount.id,
      receiverId: receiverAccount.id,
      value: createTransfer.value,
      dateTime: MoreThan(date),
    });
    if (duplicateTransfer) {
      throw new ConflictException('duplicate transfer');
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      senderAccount.availableValue =
        senderAccount.availableValue - createTransfer.value;
      receiverAccount.availableValue =
        receiverAccount.availableValue + createTransfer.value;

      await queryRunner.manager.save(senderAccount);
      await queryRunner.manager.save(receiverAccount);

      const transfer = new Transfer();
      transfer.senderId = senderAccount.id;
      transfer.receiverId = receiverAccount.id;
      transfer.value = createTransfer.value;
      transfer.dateTime = new Date();

      const createdTransfer = await queryRunner.manager.save(transfer);

      const response: TransferDto = {
        id: createdTransfer.id,
        senderDocument: senderAccount.document,
        receiverDocument: receiverAccount.document,
        value: createdTransfer.value,
        availableValue: senderAccount.availableValue,
        dateTime: createdTransfer.dateTime,
      };
      await queryRunner.commitTransaction();
      return response;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await queryRunner.release();
    }
  }
}
