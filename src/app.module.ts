import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalAccountModule } from './digital-account/DigitalAccount.module';
@Module({
  imports: [DigitalAccountModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
