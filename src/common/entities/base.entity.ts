import {
  BaseEntity as TypeOrmBase,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBase {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
