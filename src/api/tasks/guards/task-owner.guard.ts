import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { TasksService } from '../tasks.service';

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(private taskService: TasksService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      user: { sub: number };
      params: { id: string };
    }>();
    const user = { id: request.user.sub };
    const params = request.params;

    const task = await this.taskService.findOne(parseInt(params.id));

    if (task.userId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to access this task',
      );
    }

    return true;
  }
}
