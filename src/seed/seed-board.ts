interface SeedBoard {
  name: string;
  description?: string | null;
}

interface SeedTask {
  name: string;
  description?: string | null;
  icon: SeedTaskIcon;
  status?: SeedTaskStatus;
}

type SeedTaskIcon = 'man-working' | 'dialog' | 'coffee' | 'weightlifter' | 'books' | 'clock';

type SeedTaskStatus = 'in-progress' | 'completed' | 'wont-do' | null;

export const seedTasks: SeedTask[] = [
  {
    name: 'Task in Progress',
    description: null,
    icon: 'clock',
    status: 'in-progress',
  },
  {
    name: 'Task Completed',
    description: null,
    icon: 'weightlifter',
    status: 'completed',
  },
  {
    name: "Task Won't Do",
    description: null,
    icon: 'coffee',
    status: 'wont-do',
  },
  {
    name: 'Task To Do',
    description: 'Work on a Challenge on devChallenges.io, learn TypeScript.',
    icon: 'books',
    status: null,
  },
];

export const seedBoard: SeedBoard = {
  name: 'My Task Board',
  description: 'Tasks to keep organised',
};