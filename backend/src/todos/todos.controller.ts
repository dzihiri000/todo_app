import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo | null> {
    return this.todosService.findOne(Number(id));
  }

  @Post()
  create(@Body('title') title: string): Promise<Todo | null> {
    return this.todosService.create(title);
  }
}
