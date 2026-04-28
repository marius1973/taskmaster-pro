export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'work' | 'personal' | 'shopping' | 'other';
  createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';