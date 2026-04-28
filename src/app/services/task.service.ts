import { Injectable, signal, computed, effect } from '@angular/core';
import { Task, FilterType } from '../models/task.model';
import { StorageService } from './storage.service';

// Re-exportar FilterType como tipo (necesario con isolatedModules)
export type { FilterType };

@Injectable({ providedIn: 'root' })
export class TaskService {
  // Estado privado
  private tasksSignal = signal<Task[]>([]);
  private filterSignal = signal<FilterType>('all');

  // Signals públicas (solo lectura)
  public tasks = this.tasksSignal.asReadonly();
  public currentFilter = this.filterSignal.asReadonly();

  // Computed: Tareas filtradas automáticamente
  public filteredTasks = computed(() => {
    const tasks = this.tasksSignal();
    const filter = this.filterSignal();

    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  });

  // Computed: Estadísticas en tiempo real
  public stats = computed(() => {
    const tasks = this.tasksSignal();
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, completed, pending, completionRate };
  });

  constructor(private storageService: StorageService) {
    // Cargar tareas guardadas al iniciar
    const savedTasks = this.storageService.loadTasks();
    this.tasksSignal.set(savedTasks);

    // Auto-guardar cuando cambian las tareas
    effect(() => {
      const tasks = this.tasksSignal();
      this.storageService.saveTasks(tasks);
      console.log('💾 Tareas auto-guardadas:', tasks.length);
    });
  }

  // Acciones
  addTask(task: Omit<Task, 'id' | 'createdAt' | 'completed'>) {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      completed: false
    };
    this.tasksSignal.update(tasks => [...tasks, newTask]);
  }

  toggleTask(id: string) {
    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  deleteTask(id: string) {
    this.tasksSignal.update(tasks => tasks.filter(task => task.id !== id));
  }

  setFilter(filter: FilterType) {
    this.filterSignal.set(filter);
  }
}