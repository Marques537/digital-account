import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DigitalAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  document: string;

  @Column()
  availableValue: number;
}
