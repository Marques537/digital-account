import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DigitalAccount } from '../database/entity/DigitalAccount.entity';
import { CreateAccountDto } from '../dto/Create-DigitalAccount.dto';
import { DigitalAccountDto } from '../dto/DigitalAccount.dto';

@Injectable()
export class CreateDigitalAccountService {
  constructor(
    @InjectRepository(DigitalAccount)
    private digitalAccountsRepository: Repository<DigitalAccount>,
  ) {}
  async execute(
    createDigitalAccount: CreateAccountDto,
  ): Promise<DigitalAccount> {
    const createdAccount = await this.digitalAccountsRepository.findOne({
      document: createDigitalAccount.document,
    });
    if (!createdAccount) {
      try {
        return await this.digitalAccountsRepository.save(createDigitalAccount);
      } catch (err) {
        throw new InternalServerErrorException(err);
      }
    } else {
      throw new ConflictException(
        'There is already an account associated with the informed document.',
      );
    }
  }
}
