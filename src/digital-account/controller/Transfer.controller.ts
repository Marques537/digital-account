import { Body, Controller, Post, Get, Param, Inject } from '@nestjs/common';
import { CreateTransferDto } from '../dto/Create-Transfer.dto';
import { TransferDto } from '../dto/Transfer.dto';
import { TransferService } from '../service/CreateTransfer.service';
import { HistoryTransferService } from '../service/HistoryTransfer.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('transfer')
@ApiTags('transfer')
export class TransferController {
  @Inject(TransferService)
  private readonly transferService: TransferService;
  @Inject(HistoryTransferService)
  private readonly historyTransferService: HistoryTransferService;

  @Post()
  create(@Body() createTransferDto: CreateTransferDto) {
    return this.transferService.create(createTransferDto);
  }
  @Get(':document')
  @ApiCreatedResponse({
    type: TransferDto,
  })
  findByDocument(@Param('document') document: string) {
    return this.historyTransferService.findByDocument(document);
  }
}
