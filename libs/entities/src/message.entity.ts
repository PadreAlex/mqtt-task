import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'message' })
export class MessageEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: false })
  message?: string;
}
