import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../global/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  school: string;
}

