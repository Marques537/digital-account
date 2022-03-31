import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { DigitalAccount } from '../database/entity/DigitalAccount.entity';
import { Transfer } from '../database/entity/Transfer.entity';
import { CreateTransferDto } from '../dto/Create-Transfer.dto';
import { CreateTransferService } from './CreateTransfer.service';
import * as dayjs from 'dayjs';
import { TransferDto } from '../dto/Transfer.dto';

describe('CreateDigitalAccountService', () => {
  let createTransferService: CreateTransferService;
  let accountRepository: Repository<DigitalAccount>;
  let transferRepository: Repository<Transfer>;
  let connection: Connection;

  const transfer = new Transfer({
    id: 1,
    senderId: 1,
    receiverId: 2,
    value: 100,
    senderDigitalAccount: new DigitalAccount(),
    receiverDigitalAccount: new DigitalAccount(),
  });
  const senderAccount = new DigitalAccount({
    id: 1,
    name: 'Testador',
    document: '077.989.030-20',
    availableValue: 1000,
  });

  const receiverAccount = new DigitalAccount({
    id: 2,
    name: 'Teste',
    document: '462.611.860-73',
    availableValue: 1000,
  });

  const transferResponse = new TransferDto({
    id: 1,
    availableValue: 900,
    value: 100,
    senderDocument: '077.989.030-20',
    receiverDocument: '462.611.860-73',
  });

  const qr = {
    manager: {},
  } as QueryRunner;

  class ConnectionMock {
    createQueryRunner(mode?: 'master' | 'slave'): QueryRunner {
      const qr = {
        manager: {},
      } as QueryRunner;
      qr.manager;
      Object.assign(qr.manager, {
        save: jest.fn(),
      });
      qr.connect = jest.fn();
      qr.release = jest.fn();
      qr.startTransaction = jest.fn();
      qr.commitTransaction = jest.fn();
      qr.rollbackTransaction = jest.fn();
      qr.release = jest.fn();
      return qr;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransferService,
        {
          provide: getRepositoryToken(DigitalAccount),
          useValue: {
            findOne: jest.fn().mockResolvedValue(undefined),
            save: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: getRepositoryToken(Transfer),
          useValue: {
            findOne: jest.fn().mockResolvedValue(undefined),
            save: jest.fn().mockResolvedValue(undefined),
          },
        },
        { provide: Connection, useClass: ConnectionMock },
      ],
    }).compile();

    createTransferService = module.get<CreateTransferService>(
      CreateTransferService,
    );
    accountRepository = module.get<Repository<DigitalAccount>>(
      getRepositoryToken(DigitalAccount),
    );
    transferRepository = module.get<Repository<Transfer>>(
      getRepositoryToken(Transfer),
    );
    //    connection = module.get<Connection>(Connection);
  });

  it('should be defined', () => {
    expect(createTransferService).toBeDefined();
    expect(accountRepository).toBeDefined();
    expect(transferRepository).toBeDefined();
  });
  describe('execute', () => {
    it('should create transfer sucessfully', async () => {
      const body: CreateTransferDto = {
        senderDocument: '077.989.030-20',
        receiverDocument: '462.611.860-73',
        value: 100,
      };
      jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValueOnce(senderAccount);
      jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValueOnce(receiverAccount);

      jest
        .spyOn(accountRepository, 'save')
        .mockResolvedValueOnce(senderAccount);
      jest
        .spyOn(accountRepository, 'save')
        .mockResolvedValueOnce(receiverAccount);
      jest.spyOn(transferRepository, 'save').mockResolvedValueOnce(transfer);

      const result = await createTransferService.execute(body);

      expect(accountRepository.findOne).toHaveBeenCalledTimes(2);
      expect(result).toEqual(transferResponse);
    });
    it('should sender account does not exists', async () => {
      const body: CreateTransferDto = {
        senderDocument: '077.989.030-20',
        receiverDocument: '462.611.860-73',
        value: 100,
      };
      jest.spyOn(transferRepository, 'save').mockResolvedValueOnce(transfer);

      expect(createTransferService.execute(body)).rejects.toThrowError();
    });
    it('should receiver account does not exists', async () => {
      const body: CreateTransferDto = {
        senderDocument: '077.989.030-20',
        receiverDocument: '462.611.860-73',
        value: 100,
      };
      jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValueOnce(senderAccount);
      jest.spyOn(transferRepository, 'save').mockResolvedValueOnce(transfer);
      expect(createTransferService.execute(body)).rejects.toThrowError();
    });
    it('should transfer value is bigger than available value', async () => {
      const body: CreateTransferDto = {
        senderDocument: '077.989.030-20',
        receiverDocument: '462.611.860-73',
        value: 10000,
      };
      jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValueOnce(senderAccount);
      jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValueOnce(receiverAccount);
      jest.spyOn(transferRepository, 'save').mockResolvedValueOnce(transfer);
      expect(createTransferService.execute(body)).rejects.toThrowError();
    });
    it('should the senderAccount and receiverAccount are equal', async () => {
      const body: CreateTransferDto = {
        senderDocument: '077.989.030-20',
        receiverDocument: '462.611.860-73',
        value: 100,
      };
      jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValueOnce(senderAccount);
      jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValueOnce(senderAccount);
      jest.spyOn(transferRepository, 'save').mockResolvedValueOnce(transfer);
      expect(createTransferService.execute(body)).rejects.toThrowError();
    });
    it('should throw the transfer are duplicate', async () => {
      const body: CreateTransferDto = {
        senderDocument: '077.989.030-20',
        receiverDocument: '462.611.860-73',
        value: 100,
      };
      jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValueOnce(senderAccount);
      jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValueOnce(senderAccount);
      jest.spyOn(transferRepository, 'findOne').mockResolvedValueOnce(transfer);
      jest.spyOn(transferRepository, 'save').mockResolvedValueOnce(transfer);
      expect(createTransferService.execute(body)).rejects.toThrowError();
    });
    it('should throw an exception', async () => {
      const body: CreateTransferDto = {
        senderDocument: '077.989.030-20',
        receiverDocument: '462.611.860-73',
        value: 100,
      };
      jest
        .spyOn(accountRepository, 'findOne')
        .mockRejectedValueOnce(new Error());
      jest
        .spyOn(accountRepository, 'findOne')
        .mockResolvedValueOnce(senderAccount);
      jest.spyOn(transferRepository, 'findOne').mockResolvedValueOnce(transfer);
      jest.spyOn(transferRepository, 'save').mockResolvedValueOnce(transfer);
      expect(createTransferService.execute(body)).rejects.toThrowError();
    });
  });
});
