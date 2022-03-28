import { Module } from '@nestjs/common';

import { DigitalAccountModule } from './digital-account/DigitalAccount.module';
@Module({
  imports: [DigitalAccountModule],
})
export class AppModule {}
