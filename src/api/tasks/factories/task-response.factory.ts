import { Task } from '../entities/task.entity';
import { TaskResponseDto } from '../dto/task-response.dto';

export class TaskResponseFactory {
  static for(task: Task): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
