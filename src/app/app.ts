import { DatePipe } from '@angular/common'
import { Component, type OnInit } from '@angular/core'
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
export class App implements OnInit {
  task = ''
  tasks: Task[] = []
  today = new Date()

  ngOnInit() {
    const tasksString = localStorage.getItem('todo')
    if (tasksString) {
      try {
        const tasks = JSON.parse(tasksString)
        this.tasks = tasks
      } catch (e) {
        console.error('Could not parse todos from local storage', e)
      }
    }
  }

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
    this.updateTasks([this.createTask(this.task.trim()), ...this.tasks])
    this.task = ''
  }

  toggleTask(task: Task) {
    const toggledTask = { ...task, completed: !task.completed }
    this.updateTasks(
      this.tasks.map((t) => (t.id !== task.id ? t : toggledTask)),
    )
  }

  deleteTask(task: Task) {
    this.updateTasks(this.tasks.filter((t) => t.id !== task.id))
  }

  updateTasks(tasks: Task[]) {
    this.tasks = tasks
    localStorage.setItem('todo', JSON.stringify(tasks))
  }
}
