import { Injectable, BadRequestException } from '@nestjs/common';
import { Transfer } from '../database/entity/Transfer.entity';
import { DigitalAccount } from '../database/entity/DigitalAccount.entity';
import { CreateTransferDto } from '../dto/Create-Transfer.dto';
import { TransferDto } from '../dto/Transfer.dto';

@Injectable()
export class TransferService {
  private transferences: CreateTransferDto[] = [];
  private accounts: DigitalAccount[] = [];

  create(createTransfer: CreateTransferDto) {
    const senderAccount = this.accounts.find(
      (account) => account.document === createTransfer.senderDocument,
    );
    const receiverAccount = this.accounts.find(
      (account) => account.document === createTransfer.receiverDocument,
    );

    if (!senderAccount || !receiverAccount) {
      throw new BadRequestException('Alguma das contas não existe');
    }
    if (senderAccount.availableValue < createTransfer.value) {
      throw new BadRequestException('Saldo insuficiente');
    }

    const duplicateTransfer = this.transferences.find(
      (transfer) =>
        transfer.senderDocument === createTransfer.senderDocument &&
        transfer.receiverDocument === createTransfer.receiverDocument &&
        transfer.value === createTransfer.value,
      //   transfer.dateTime <= new Date(), // adicionar checagem com base nos minutos
    );
    if (duplicateTransfer) {
      throw new BadRequestException('Transferencia duplicada');
    }

    const transfer = {
      ...createTransfer,
      dateTime: new Date(),
    };
    const id: number = this.transferences.push(transfer);
    const availableValue = senderAccount.availableValue - transfer.value;
    return { id, availableValue, ...transfer } as TransferDto;
  }
  findByDocument(document: string) {
    return this.transferences.filter(
      (transfer) =>
        transfer.senderDocument === document ||
        transfer.receiverDocument === document,
    );
  }
}
