export type RootStackParamList = {
  // Auth Stack
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  
  // Main Stack
  Main: undefined;
  
  // Task Stack
  Tasks: undefined;
  TaskDetails: { id: string };
  CreateTask: undefined;
  
  // Focus Stack
  Focus: undefined;
  FocusSession: { taskId?: string };
  FocusSummary: { sessionId: string };
  
  // Insights Stack
  Insights: undefined;
  InsightDetails: { type: string };
  
  // Settings Stack
  Settings: undefined;
  Profile: undefined;
  Preferences: undefined;
}; 