export type User = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  full_name: string | null;
  avatar_url: string | null;
  preferences: UserPreferences | null;
  time_zone: string | null;
  last_login: string | null;
};

export type UserPreferences = {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  sound: boolean;
  vibration: boolean;
};

export type Task = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  due_date: string | null;
  priority: number;
  status: 'todo' | 'in_progress' | 'completed';
  tags: string[] | null;
  ai_priority_score: number | null;
  estimated_duration: number | null;
  parent_task_id: string | null;
};

export type FocusSession = {
  id: string;
  user_id: string;
  task_id: string | null;
  started_at: string;
  ended_at: string | null;
  duration: number;
  completed: boolean;
  focus_score: number | null;
  notes: string | null;
  interruptions: number | null;
};

export type ProductivityInsight = {
  id: string;
  user_id: string;
  created_at: string;
  insight_type: string;
  content: string;
  data_points: any;
  dismissed: boolean;
};

export type Achievement = {
  id: string;
  user_id: string;
  achievement_type: string;
  unlocked_at: string | null;
  progress: number;
  metadata: any;
};

export type Tag = {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  created_at: string;
  read_at: string | null;
  type: string;
  content: string;
  action_url: string | null;
}; 