import { Injectable } from '@nestjs/common';
import { Transfer } from '../interface/Transfer.interface';
import { CreateTransferDto } from '../dto/Create-Transfer.dto';

@Injectable()
export class TransferService {
  private Transferences: Transfer[] = [];

  create(createTransfer: CreateTransferDto) {
    const transfer = {
      ...createTransfer,
      dateTime: new Date(),
    };
    const id: number = this.Transferences.push(transfer);
    return { id, ...transfer } as Transfer;
  }
}
