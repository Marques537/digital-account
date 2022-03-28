import { Module } from '@nestjs/common';
import { DigitalAccountController } from './controller/DigitalAccount.controller';
import { TransferController } from './controller/Transfer.controller';
import { DigitalAccountService } from './service/DigitalAccount.service';
import { TransferService } from './service/CreateTransfer.service';
import { HistoryTransferService } from './service/HistoryTransfer.service';

@Module({
  controllers: [DigitalAccountController, TransferController],
  providers: [DigitalAccountService, TransferService, HistoryTransferService],
})
export class DigitalAccountModule {}
