import { Column, Entity, OneToMany } from 'typeorm';

import { Task } from '@/api/tasks/entities/task.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user, {
    cascade: true,
  })
  tasks: Task[];
}
