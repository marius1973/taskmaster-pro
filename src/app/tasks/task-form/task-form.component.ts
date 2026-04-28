import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  private taskService = inject(TaskService);
  
  newTask = {
    title: '',
    description: '',
    category: 'personal' as 'work' | 'personal' | 'shopping' | 'other'
  };

  categories = [
    { value: 'work', label: '💼 Trabajo' },
    { value: 'personal', label: '👤 Personal' },
    { value: 'shopping', label: '🛒 Compras' },
    { value: 'other', label: '📌 Otro' }
  ];

  addTask() {
    if (this.newTask.title.trim()) {
      this.taskService.addTask({ ...this.newTask });
      // Resetear formulario
      this.newTask = {
        title: '',
        description: '',
        category: 'personal'
      };
    }
  }
}