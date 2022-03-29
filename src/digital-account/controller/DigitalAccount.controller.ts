import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateAccountDto } from '../dto/Create-DigitalAccount.dto';
import { CreateDigitalAccountService } from '../service/CreateDigitalAccount.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { DigitalAccountDto } from '../dto/DigitalAccount.dto';

@Controller('digital-account')
@ApiTags('digital-account')
export class DigitalAccountController {
  @Inject(CreateDigitalAccountService)
  private readonly createDigitalAccountService: CreateDigitalAccountService;

  @Post()
  @ApiCreatedResponse({
    type: DigitalAccountDto,
  })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.createDigitalAccountService.create(createAccountDto);
  }
}
