import { BadRequestException, Injectable } from '@nestjs/common';
import { DigitalAccount } from '../database/entity/DigitalAccount.entity';
import { CreateAccountDto } from '../dto/Create-DigitalAccount.dto';

@Injectable()
export class CreateDigitalAccountService {
  private digitalAccounts: CreateAccountDto[] = [];

  create(createDigitalAccount: CreateAccountDto) {
    const createdAccount = this.digitalAccounts.find(
      (Account) => Account.document === createDigitalAccount.document,
    );
    if (!createdAccount) {
      const id = this.digitalAccounts.push(createDigitalAccount);
      return {
        id: id,
        ...createDigitalAccount,
      } as DigitalAccount;
    }
    throw new BadRequestException(
      'There is already an account associated with the informed document.',
    );
  }
}
