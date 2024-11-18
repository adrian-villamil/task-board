export interface Task {
  id: string;
  name: string;
  description: string | null;
  icon: TaskIcon;
  status: TaskStatus;
}

export type TaskIcon = 'man-working' | 'dialog' | 'coffee' | 'weightlifter' | 'books' | 'clock';

export type TaskStatus = 'in-progress' | 'completed' | 'wont-do' | null;