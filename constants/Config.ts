export default {
  app: {
    name: 'DeepWork AI',
    version: '1.0.0',
  },
  api: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  focus: {
    defaultSessionDuration: 25, // minutes
    defaultBreakDuration: 5, // minutes
    longBreakDuration: 15, // minutes
    sessionsBeforeLongBreak: 4,
  },
  tasks: {
    priorityLevels: [
      { value: 1, label: 'Low' },
      { value: 2, label: 'Medium' },
      { value: 3, label: 'High' },
      { value: 4, label: 'Urgent' },
      { value: 5, label: 'Critical' },
    ],
    statusOptions: [
      { value: 'todo', label: 'To Do' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' },
    ],
  },
}; 