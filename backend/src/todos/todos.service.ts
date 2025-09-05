import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  findOne(id: number): Promise<Todo | null> {
    return this.todosRepository.findOneBy({ id });
  }

  create(createTodoDto: CreateTodoDto): Promise<Todo | null> {
    const todo = this.todosRepository.create(createTodoDto);
    return this.todosRepository.save(todo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);

    Object.assign(todo, updateTodoDto);
    return this.todosRepository.save(todo);
  }

  async remove(id: number): Promise<{ message: string }> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
    await this.todosRepository.remove(todo);
    return { message: 'Todo successfully deleted' };
  }
}
