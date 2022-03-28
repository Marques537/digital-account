import { IsString, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsNumber()
  availableValue: number;
}
