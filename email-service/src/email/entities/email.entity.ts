import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Email {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  to: string;

  @Column('text')
  subject: string;

  @Column('text')
  body: string;

  @Column('text', { array: true })
  files: string[];
}
