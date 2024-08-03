import { Controller, Get } from '@nestjs/common';

import { TodoService } from 'src/service/todo.service';

@Controller()
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/todos')
  async findAll() {
    return this.todoService.findAll();
  }
}
