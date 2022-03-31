import { Test, TestingModule } from '@nestjs/testing';
import { DigitalAccountController } from './DigitalAccount.controller';
import { CreateDigitalAccountService } from '../service/CreateDigitalAccount.service';
import { CreateAccountDto } from '../dto/Create-DigitalAccount.dto';
import { DigitalAccountDto } from '../dto/DigitalAccount.dto';

const digitalAccountDto = new DigitalAccountDto({
  name: 'Test Name',
  document: '684.216.130-49',
  availableValue: 1909.9,
});

describe('DigitalAccountController', () => {
  let digitalAccountController: DigitalAccountController;
  let createDigitalAccountService: CreateDigitalAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigitalAccountController],
      providers: [
        {
          provide: CreateDigitalAccountService,
          useValue: { execute: jest.fn().mockResolvedValue(digitalAccountDto) },
        },
      ],
    }).compile();

    digitalAccountController = module.get<DigitalAccountController>(
      DigitalAccountController,
    );
    createDigitalAccountService = module.get<CreateDigitalAccountService>(
      CreateDigitalAccountService,
    );
  });

  it('should be defined', () => {
    expect(digitalAccountController).toBeDefined();
    expect(createDigitalAccountService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new Digital Account sucessfully', async () => {
      //Arrange
      const body: CreateAccountDto = {
        name: 'Test Name',
        document: '684.216.130-49',
        availableValue: 1909.9,
      };
      //Act
      const result = await digitalAccountController.create(body);
      //Assert
      expect(result).toEqual(digitalAccountDto);
      expect(createDigitalAccountService.execute).toHaveBeenCalledTimes(1);
      expect(createDigitalAccountService.execute).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      //Arrange
      const body: CreateAccountDto = {
        name: 'Test Name',
        document: '684.216.130-49',
        availableValue: 1909.9,
      };
      jest
        .spyOn(createDigitalAccountService, 'execute')
        .mockRejectedValueOnce(new Error());
      //Assert
      expect(digitalAccountController.create(body)).rejects.toThrowError();
    });
  });
});
