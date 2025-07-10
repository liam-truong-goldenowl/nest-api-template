import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TaskStatus } from '@/common/enums';
import { BaseEntity } from '@/common/entities/base.entity';
import { User } from '@/api/users/entities/user.entity';

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
  status: TaskStatus;

  @Column({ name: 'due_date', nullable: true })
  dueDate?: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
