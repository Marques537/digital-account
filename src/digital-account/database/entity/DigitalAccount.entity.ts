import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DigitalAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column()
  document: string;

  @Column()
  availableValue: number;
}
