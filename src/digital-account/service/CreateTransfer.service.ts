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
import { Repository, Connection, MoreThanOrEqual } from 'typeorm';
import { TransferDto } from '../dto/Transfer.dto';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

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
    const date = dayjs(new Date())
      .utc()
      .subtract(2, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
    const duplicateTransfer = await this.transfersRepository.findOne({
      senderId: senderAccount.id,
      receiverId: receiverAccount.id,
      value: createTransfer.value,
      dateTime: MoreThanOrEqual(date),
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

      await this.accountRepository.save(senderAccount);
      await this.accountRepository.save(receiverAccount);

      const transfer = new Transfer();
      transfer.senderId = senderAccount.id;
      transfer.receiverId = receiverAccount.id;
      transfer.value = createTransfer.value;
      transfer.dateTime = dayjs(new Date()).toDate();

      const createdTransfer = await this.transfersRepository.save(transfer);

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
