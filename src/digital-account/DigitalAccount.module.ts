import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DigitalAccountController } from './controller/DigitalAccount.controller';
import { TransferController } from './controller/Transfer.controller';

import { DigitalAccount } from './database/entity/DigitalAccount.entity';
import { Transfer } from './database/entity/Transfer.entity';

import { CreateDigitalAccountService } from './service/CreateDigitalAccount.service';
import { TransferService } from './service/CreateTransfer.service';
import { HistoryTransferService } from './service/HistoryTransfer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer, DigitalAccount])],
  controllers: [DigitalAccountController, TransferController],
  providers: [
    CreateDigitalAccountService,
    TransferService,
    HistoryTransferService,
  ],
})
export class DigitalAccountModule {}
