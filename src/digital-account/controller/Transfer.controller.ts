import { Body, Controller, Post, Get, Param, Inject } from '@nestjs/common';
import { CreateTransferDto } from '../dto/Create-Transfer.dto';
import { HistoryTransferDto } from '../dto/History-Transfer.dto';
import { TransferDto } from '../dto/Transfer.dto';
import { TransferService } from '../service/CreateTransfer.service';
import { HistoryTransferService } from '../service/HistoryTransfer.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('transfer')
@ApiTags('transfer')
export class TransferController {
  constructor(
    @Inject(TransferService)
    private readonly transferService: TransferService,
    @Inject(HistoryTransferService)
    private readonly historyTransferService: HistoryTransferService,
  ) {}

  @Post()
  async create(
    @Body() createTransferDto: CreateTransferDto,
  ): Promise<TransferDto> {
    return await this.transferService.create(createTransferDto);
  }
  @Get(':document')
  @ApiCreatedResponse({
    type: HistoryTransferDto,
  })
  async findByDocument(
    @Param('document') document: string,
  ): Promise<HistoryTransferDto[]> {
    return await this.historyTransferService.findByDocument(document);
  }
}
