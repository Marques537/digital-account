import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DigitalAccount } from '../database/entity/DigitalAccount.entity';
import { Transfer } from '../database/entity/Transfer.entity';
import { CreateAccountDto } from '../dto/Create-DigitalAccount.dto';
import { CreateDigitalAccountService } from './CreateDigitalAccount.service';

const digitalAccount = new DigitalAccount({
  id: 1,
  name: 'fAlex',
  document: '684.216.130-49',
  availableValue: 1000,
});

describe('CreateDigitalAccountService', () => {
  let createDigitalAccountService: CreateDigitalAccountService;
  let accountRepository: Repository<DigitalAccount>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDigitalAccountService,
        {
          provide: getRepositoryToken(DigitalAccount),
          useValue: {
            findOne: jest.fn().mockResolvedValue(undefined),
            save: jest.fn().mockResolvedValue(digitalAccount),
          },
        },
      ],
    }).compile();

    createDigitalAccountService = module.get<CreateDigitalAccountService>(
      CreateDigitalAccountService,
    );
    accountRepository = module.get<Repository<DigitalAccount>>(
      getRepositoryToken(DigitalAccount),
    );
  });

  it('should be defined', () => {
    expect(createDigitalAccountService).toBeDefined();
    expect(accountRepository).toBeDefined();
  });
  describe('execute', () => {
    it('should create a new Digital Account sucessfully', async () => {
      const body: CreateAccountDto = {
        name: 'Alex',
        document: '684.216.130-49',
        availableValue: 1000,
      };

      const result = await createDigitalAccountService.execute(body);

      expect(accountRepository.findOne).toHaveBeenCalledTimes(1);
      expect(accountRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(digitalAccount);
    });

    it('should throw an exception Account already exists', () => {
      const body: CreateAccountDto = {
        name: 'Alex',
        document: '684.216.130-49',
        availableValue: 1000,
      };
      jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValueOnce(digitalAccount);

      expect(createDigitalAccountService.execute(body)).rejects.toThrowError();
      expect(accountRepository.findOne).toHaveBeenCalledTimes(1);
      expect(accountRepository.save).toHaveBeenCalledTimes(0);
    });

    it('should throw an exception', () => {
      const body: CreateAccountDto = {
        name: 'Alex',
        document: '684.216.130-49',
        availableValue: 1000,
      };

      jest
        .spyOn(accountRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      expect(createDigitalAccountService.execute(body)).rejects.toThrowError();
    });
  });
});
