import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountDto } from '../dto/Create-DigitalAccount.dto';
import { DigitalAccountService } from '../service/DigitalAccount.service';
import { ValidationPipe } from '../../validation/validation.pipe';

@Controller('digital-account')
export class DigitalAccountController {
  constructor(private digitalAccountService: DigitalAccountService) {}

  @Post()
  create(@Body(new ValidationPipe()) createAccountDto: CreateAccountDto) {
    return this.digitalAccountService.create(createAccountDto);
  }
}
