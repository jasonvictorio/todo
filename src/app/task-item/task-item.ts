import { Component, EventEmitter, Input, Output } from '@angular/core'
import type { Task } from '../app'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.html',
  host: {
    class: 'task',
    '[class.completed]': 'task.completed',
  },
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task
  @Output() toggle = new EventEmitter<void>()
  @Output() delete = new EventEmitter<void>()

  onToggle() {
    this.toggle.emit()
  }

  onDelete() {
    console.log('ondelete')
    this.delete.emit()
  }
}
