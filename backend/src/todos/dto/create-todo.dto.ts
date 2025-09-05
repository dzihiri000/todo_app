/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;
}
