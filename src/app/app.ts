import { DatePipe } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { v4 as uuid } from 'uuid'
import { TaskItemComponent } from './task-item/task-item'

export type Task = {
  id: string
  text: string
  completed: boolean
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, TaskItemComponent, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  task = ''
  tasks: Task[] = []
  today = new Date()

  get incompleteTasks() {
    return this.tasks.filter((t) => !t.completed)
  }

  get completeTasks() {
    return this.tasks.filter((t) => t.completed)
  }

  createTask(text: string) {
    return {
      id: uuid(),
      text: text,
      completed: false,
    }
  }

  addTask() {
    if (this.task.trim() === '') return
    this.tasks = [this.createTask(this.task.trim()), ...this.tasks]
    this.task = ''
  }

  toggleTask(task: Task) {
    const toggledTask = { ...task, completed: !task.completed }
    this.tasks = this.tasks.map((t) => (t.id !== task.id ? t : toggledTask))
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id)
  }
}
