import { Column, Entity, OneToMany } from 'typeorm';

import { Task } from '@/api/tasks/entities/task.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
