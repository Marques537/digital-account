import { Injectable, BadRequestException } from '@nestjs/common';
import { Transfer } from '../interface/Transfer.interface';
import { DigitalAccount } from '../interface/DigitalAccount.interface';
import { CreateTransferDto } from '../dto/Create-Transfer.dto';
import { TransferDto } from '../dto/Transfer.dto';

@Injectable()
export class TransferService {
  private transferences: Transfer[] = [];
  private accounts: DigitalAccount[] = [];

  create(createTransfer: CreateTransferDto) {
    this.accounts.push({
      name: 'Matheus',
      document: '958.754.690-30',
      availableValue: 10,
    });

    this.accounts.push({
      name: 'Luiza',
      document: '689.368.840-77',
      availableValue: 500,
    });

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
        transfer.value === createTransfer.value &&
        transfer.dateTime <= new Date(), // adicionar checagem com base nos minutos
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
