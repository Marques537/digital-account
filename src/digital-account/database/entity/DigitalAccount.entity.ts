import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transfer } from '../entity/Transfer.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class DigitalAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  @ApiProperty()
  name: string;

  @Expose()
  @Column({ unique: true })
  @ApiProperty()
  document: string;

  @Column()
  availableValue: number;

  @OneToMany(() => Transfer, (transfer) => transfer.senderDigitalAccount)
  transfersSent: Transfer[];

  @OneToMany(() => Transfer, (transfer) => transfer.receiverDigitalAccount)
  receivedTransfers: Transfer[];

  constructor(digitalAccount?: Partial<DigitalAccount>) {
    this.id = digitalAccount?.id;
    this.name = digitalAccount?.name;
    this.document = digitalAccount?.document;
    this.availableValue = digitalAccount?.availableValue;
    this.transfersSent = digitalAccount?.transfersSent;
    this.receivedTransfers = digitalAccount?.receivedTransfers;
  }
}
