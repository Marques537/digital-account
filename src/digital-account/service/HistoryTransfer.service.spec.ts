import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { DigitalAccount } from '../database/entity/DigitalAccount.entity';
import { Transfer } from '../database/entity/Transfer.entity';
import { HistoryTransferService } from './HistoryTransfer.service';
import * as dayjs from 'dayjs';

const digitalAccount = new DigitalAccount({
  id: 1,
  name: 'fAlex',
  document: '684.216.130-49',
  availableValue: 1000,
});
const transfersList: Transfer[] = [
  new Transfer({
    id: 1,
    senderId: 1,
    receiverId: 3,
    value: 10,
    dateTime: dayjs(Date.now()).toDate(),
    senderDigitalAccount: new DigitalAccount(),
    receiverDigitalAccount: new DigitalAccount(),
  }),
  new Transfer({
    id: 2,
    senderId: 2,
    receiverId: 3,
    value: 20,
    dateTime: dayjs(Date.now()).toDate(),
    senderDigitalAccount: new DigitalAccount(),
    receiverDigitalAccount: new DigitalAccount(),
  }),
  new Transfer({
    id: 3,
    senderId: 3,
    receiverId: 1,
    value: 30,
    dateTime: dayjs(Date.now()).toDate(),
    senderDigitalAccount: new DigitalAccount(),
    receiverDigitalAccount: new DigitalAccount(),
  }),
];

describe('HistoryTransferService', () => {
  let historyTransferService: HistoryTransferService;
  let accountRepository: Repository<DigitalAccount>;
  let transferRepository: Repository<Transfer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryTransferService,
        {
          provide: getRepositoryToken(DigitalAccount),
          useValue: {
            findOne: jest.fn().mockResolvedValue(digitalAccount),
          },
        },
        {
          provide: getRepositoryToken(Transfer),
          useValue: {
            createQueryBuilder: jest.fn(() => ({
              select: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              orWhere: jest.fn().mockReturnThis(),
              innerJoin: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue(transfersList),
            })),
          },
        },
      ],
    }).compile();

    historyTransferService = module.get<HistoryTransferService>(
      HistoryTransferService,
    );
    accountRepository = module.get<Repository<DigitalAccount>>(
      getRepositoryToken(DigitalAccount),
    );
    transferRepository = module.get<Repository<Transfer>>(
      getRepositoryToken(Transfer),
    );
  });

  it('should be defined', () => {
    expect(historyTransferService).toBeDefined();
    expect(accountRepository).toBeDefined();
    expect(transferRepository).toBeDefined();
  });

  describe('execute', () => {
    it('returns transfers sucessfully', async () => {
      const result = await historyTransferService.execute('077.989.030-20');

      expect(accountRepository.findOne).toHaveBeenCalledTimes(1);
      expect(transferRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(result).toEqual(transfersList);
    });

    it('should throw an exception the account does not exist', () => {
      jest.spyOn(accountRepository, 'findOne').mockResolvedValueOnce(undefined);

      expect(
        historyTransferService.execute('077.989.030-20'),
      ).rejects.toThrowError();
      expect(accountRepository.findOne).toHaveBeenCalledTimes(1);
      expect(transferRepository.createQueryBuilder).toHaveBeenCalledTimes(0);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(accountRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      expect(
        historyTransferService.execute('077.989.030-20'),
      ).rejects.toThrowError();
    });
  });
});
