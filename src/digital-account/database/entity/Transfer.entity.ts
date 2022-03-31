import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { DigitalAccount } from '../entity/DigitalAccount.entity';
@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => DigitalAccount, (account) => account.id)
  @Column()
  senderId: number;

  @Column()
  receiverId: number;

  @Column()
  value: number;

  @Column()
  dateTime: Date;

  @ManyToOne(() => DigitalAccount, (account) => account.transfersSent)
  @JoinColumn({ name: 'senderId' })
  senderDigitalAccount: DigitalAccount;

  @ManyToOne(() => DigitalAccount, (account) => account.receivedTransfers)
  @JoinColumn({ name: 'receiverId' })
  receiverDigitalAccount: DigitalAccount;

  constructor(transfer?: Partial<Transfer>) {
    this.id = transfer?.id;
    this.senderId = transfer?.senderId;
    this.receiverId = transfer?.receiverId;
    this.value = transfer?.value;
    this.dateTime = transfer?.dateTime;
    this.senderDigitalAccount = transfer?.senderDigitalAccount;
    this.receiverDigitalAccount = transfer?.receiverDigitalAccount;
  }
}
