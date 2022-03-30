import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderDocument: string;

  @Column()
  receiverDocument: string;

  @Column()
  value: number;

  @Column()
  dateTime: Date;
}
