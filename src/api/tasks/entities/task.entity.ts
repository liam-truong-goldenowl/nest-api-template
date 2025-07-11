import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { TaskStatus } from '@/common/enums';
import { User } from '@/api/users/entities/user.entity';
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

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
