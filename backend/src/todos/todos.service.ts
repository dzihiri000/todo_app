import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

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

  create(title: string): Promise<Todo | null> {
    const todo = this.todosRepository.create({ title });
    return this.todosRepository.save(todo);
  }

  async update(id: number, completed: boolean): Promise<Todo | null> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      return null;
    }
    todo.completed = completed;
    return this.todosRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
