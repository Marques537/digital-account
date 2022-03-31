import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateAccountDto } from '../dto/Create-DigitalAccount.dto';
import { CreateDigitalAccountService } from '../service/CreateDigitalAccount.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { DigitalAccountDto } from '../dto/DigitalAccount.dto';
import { Serialize } from '../../interceptor/serialize.interceptor';

@Controller('digital-account')
@ApiTags('digital-account')
export class DigitalAccountController {
  constructor(
    private readonly createDigitalAccountService: CreateDigitalAccountService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: DigitalAccountDto,
  })
  @Serialize(DigitalAccountDto)
  async create(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<DigitalAccountDto> {
    return await this.createDigitalAccountService.execute(createAccountDto);
  }
}
