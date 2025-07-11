import { Column, Entity } from 'typeorm';

import { TaskStatus } from '@/common/enums';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity('tasks')
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus = TaskStatus.PENDING;

  @Column({ name: 'due_date', nullable: true })
  dueDate?: Date;
}
