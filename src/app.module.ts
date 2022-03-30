import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalAccountModule } from './digital-account/DigitalAccount.module';
import { getConnectionOptions } from 'typeorm';
@Module({
  imports: [
    DigitalAccountModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
  ],
})
export class AppModule {}
