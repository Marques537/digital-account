import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateTransferDto } from '../dto/Create-Transfer.dto';
import { ValidationPipe } from '../../validation/validation.pipe';
import { TransferService } from '../service/CreateTransfer.service';
import { HistoryTransferService } from '../service/HistoryTransfer.service';
//o service vai retonar um transferDTO eu vou jogar ele na resposta do create

@Controller('transfer')
export class TransferController {
  // constructor(private transferService: TransferService) {}
  constructor(private historyTransferService: HistoryTransferService) {}

  // @Post()
  // create(@Body(new ValidationPipe()) createTransferDto: CreateTransferDto) {
  //   return this.transferService.create(createTransferDto);
  // }
  @Get(':document/history')
  findByDocument(@Param('document') document: string) {
    return this.historyTransferService.findByDocument(document);
  }
}
