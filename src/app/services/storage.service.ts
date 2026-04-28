import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly STORAGE_KEY = 'taskmaster_tasks';

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  loadTasks(): Task[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return [];
    
    try {
      const tasks = JSON.parse(data);
      // Reconstruir las fechas que se pierden en JSON
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
    } catch {
      return [];
    }
  }
}