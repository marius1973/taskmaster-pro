import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, FilterType } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  
  filteredTasks = this.taskService.filteredTasks;
  currentFilter = this.taskService.currentFilter;

  setFilter(filter: FilterType) {
    this.taskService.setFilter(filter);
  }

  toggleTask(id: string) {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }
}