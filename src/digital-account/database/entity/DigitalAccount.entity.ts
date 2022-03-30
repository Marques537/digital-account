import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transfer } from '../entity/Transfer.entity';
import { Expose } from 'class-transformer';

@Entity()
export class DigitalAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column({ unique: true })
  document: string;

  @Column()
  availableValue: number;

  @OneToMany(() => Transfer, (transfer) => transfer.senderDigitalAccount)
  transfersSent: Transfer[];

  @OneToMany(() => Transfer, (transfer) => transfer.receiverDigitalAccount)
  receivedTransfers: Transfer[];
}
