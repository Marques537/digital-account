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
import { Repository } from 'typeorm';
import { TransferDto } from '../dto/Transfer.dto';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transfersRepository: Repository<Transfer>,
    @InjectRepository(DigitalAccount)
    private accountRepository: Repository<DigitalAccount>,
  ) {}

  async create(createTransfer: CreateTransferDto): Promise<TransferDto> {
    let senderAccount = await this.accountRepository.findOne({
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

    const duplicateTransfer = await this.transfersRepository.findOne(
      { ...createTransfer },
      //   transfer.dateTime <= new Date(), // adicionar checagem com base nos minutos
    );
    if (duplicateTransfer) {
      throw new ConflictException('duplicate transfer');
    }
    try {
      //fazer tudo em uma transação
      senderAccount = await this.accountRepository.save({
        ...senderAccount,
        availableValue: senderAccount.availableValue - createTransfer.value,
      });
      await this.accountRepository.save({
        ...receiverAccount,
        availableValue: receiverAccount.availableValue + createTransfer.value,
      });
      const createdTransfer = await this.transfersRepository.save({
        ...createTransfer,
        dateTime: new Date(),
      });

      const response: TransferDto = {
        ...createdTransfer,
        availableValue: senderAccount.availableValue,
      };
      return response;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
