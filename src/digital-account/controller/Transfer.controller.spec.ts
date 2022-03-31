import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransferDto } from '../dto/Create-Transfer.dto';
import { TransferDto } from '../dto/Transfer.dto';
import { CreateTransferService } from '../service/CreateTransfer.service';
import { HistoryTransferService } from '../service/HistoryTransfer.service';
import { TransferController } from './Transfer.controller';
import * as dayjs from 'dayjs';
import { Transfer } from '../database/entity/Transfer.entity';
import { DigitalAccount } from '../database/entity/DigitalAccount.entity';

const transferDto = new TransferDto({
  id: 1,
  availableValue: 1000,
  senderDocument: '077.989.030-20',
  receiverDocument: '462.611.860-73',
  value: 70.3,
  dateTime: dayjs(Date.now()).toDate(),
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
describe('DigitalAccountController', () => {
  let transferController: TransferController;
  let createTransferService: CreateTransferService;
  let historyTransferService: HistoryTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferController],
      providers: [
        {
          provide: CreateTransferService,
          useValue: { execute: jest.fn().mockResolvedValue(transferDto) },
        },
        {
          provide: HistoryTransferService,
          useValue: { execute: jest.fn().mockResolvedValue(transfersList) },
        },
      ],
    }).compile();

    transferController = module.get<TransferController>(TransferController);
    createTransferService = module.get<CreateTransferService>(
      CreateTransferService,
    );
    historyTransferService = module.get<HistoryTransferService>(
      HistoryTransferService,
    );
  });

  it('should be defined', () => {
    expect(transferController).toBeDefined();
    expect(createTransferService).toBeDefined();
    expect(historyTransferService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new Transfer sucessfully', async () => {
      //Arrange
      const body: CreateTransferDto = {
        senderDocument: '077.989.030-20',
        receiverDocument: '462.611.860-73',
        value: 70.3,
      };
      //Act
      const result = await transferController.create(body);
      //Assert
      expect(result).toEqual(transferDto);
      expect(createTransferService.execute).toHaveBeenCalledTimes(1);
      expect(createTransferService.execute).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      //Arrange
      const body: CreateTransferDto = {
        senderDocument: '077.989.030-20',
        receiverDocument: '462.611.860-73',
        value: 70.3,
      };
      jest
        .spyOn(createTransferService, 'execute')
        .mockRejectedValueOnce(new Error());
      //Assert
      expect(transferController.create(body)).rejects.toThrowError();
    });
  });

  describe('findByDocument', () => {
    it('should return all transfer by document sucessfully', async () => {
      //Arrange
      const result = await transferController.findByDocument('077.989.030-20');
      //Act
      //Assert
      expect(result).toEqual(transfersList);
      expect(historyTransferService.execute).toHaveBeenCalledTimes(1);
      expect(historyTransferService.execute).toHaveBeenCalledWith(
        '077.989.030-20',
      );
    });
    it('should throw an exception', () => {
      jest
        .spyOn(historyTransferService, 'execute')
        .mockRejectedValueOnce(new Error());

      expect(
        transferController.findByDocument('077.989.030-20'),
      ).rejects.toThrowError();
    });
  });
});
