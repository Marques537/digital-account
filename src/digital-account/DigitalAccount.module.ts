import { Module } from '@nestjs/common';
import { DigitalAccountController } from './controller/DigitalAccount.controller';
import { TransferController } from './controller/Transfer.controller';
import { CreateDigitalAccountService } from './service/CreateDigitalAccount.service';
import { TransferService } from './service/CreateTransfer.service';
import { HistoryTransferService } from './service/HistoryTransfer.service';

@Module({
  controllers: [DigitalAccountController, TransferController],
  providers: [
    CreateDigitalAccountService,
    TransferService,
    HistoryTransferService,
  ],
})
export class DigitalAccountModule {}
