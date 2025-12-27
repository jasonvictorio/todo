import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { v4 as uuid } from 'uuid'

interface Task {
  id: string
  text: string
  completed: boolean
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  task = ''
  tasks: Task[] = []

  get incompleteTasks() {
    return this.tasks.filter((t) => t.completed)
  }

  get completeTasks() {
    return this.tasks.filter((t) => !t.completed)
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
}
