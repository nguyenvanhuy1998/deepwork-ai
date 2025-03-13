import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Config from '../../../constants/Config';

export default function FocusScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  // Mock data for tasks
  const [tasks, setTasks] = useState([
    { 
      id: '1', 
      title: 'Complete project proposal', 
      priority: 4, 
      status: 'todo',
      dueDate: '2023-06-15',
    },
    { 
      id: '2', 
      title: 'Review team updates', 
      priority: 3, 
      status: 'in_progress',
      dueDate: '2023-06-14',
    },
    { 
      id: '3', 
      title: 'Prepare presentation', 
      priority: 5, 
      status: 'todo',
      dueDate: '2023-06-16',
    },
  ]);

  const [selectedDuration, setSelectedDuration] = useState(
    Config.focus.defaultSessionDuration
  );

  const durations = [
    { value: 15, label: '15 min' },
    { value: 25, label: '25 min' },
    { value: 50, label: '50 min' },
    { value: 90, label: '90 min' },
  ];

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 5: return theme.error;
      case 4: return theme.warning;
      case 3: return theme.accent;
      case 2: return theme.primary;
      default: return theme.secondary;
    }
  };

  const startFocusSession = (taskId?: string) => {
    router.push({
      pathname: 'focus/session',
      params: { 
        taskId,
        duration: selectedDuration
      }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Focus</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Session Duration
          </Text>
          <View style={styles.durationContainer}>
            {durations.map(duration => (
              <TouchableOpacity
                key={duration.value}
                style={[
                  styles.durationButton,
                  selectedDuration === duration.value && { 
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                  },
                  selectedDuration !== duration.value && { 
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => setSelectedDuration(duration.value)}
              >
                <Text
                  style={[
                    styles.durationText,
                    { 
                      color: selectedDuration === duration.value 
                        ? '#fff' 
                        : theme.text 
                    },
                  ]}
                >
                  {duration.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Quick Start
          </Text>
          <Card style={styles.quickStartCard}>
            <Text style={[styles.quickStartText, { color: theme.text }]}>
              Start a focus session without selecting a task
            </Text>
            <Button
              onPress={() => startFocusSession()}
              style={styles.startButton}
              icon="play"
            >
              Start Focusing
            </Button>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Focus on a Task
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.text + 'CC' }]}>
            Select a task to focus on during your session
          </Text>
          
          {tasks.map(task => (
            <TouchableOpacity 
              key={task.id}
              onPress={() => startFocusSession(task.id)}
            >
              <Card style={styles.taskCard}>
                <View style={styles.taskHeader}>
                  <View 
                    style={[
                      styles.priorityIndicator, 
                      { backgroundColor: getPriorityColor(task.priority) }
                    ]} 
                  />
                  <Text style={[styles.taskTitle, { color: theme.text }]}>
                    {task.title}
                  </Text>
                  <Ionicons 
                    name="play-circle" 
                    size={24} 
                    color={theme.primary} 
                  />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity 
            style={styles.viewAllContainer}
            onPress={() => router.push('tasks')}
          >
            <Text style={[styles.viewAllText, { color: theme.primary }]}>
              View All Tasks
            </Text>
            <Ionicons name="chevron-forward" size={16} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl + 20, // Extra padding for status bar
    paddingBottom: Layout.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Layout.spacing.sm,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: Layout.spacing.md,
  },
  durationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Layout.spacing.sm,
  },
  durationButton: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.round,
    marginRight: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
    borderWidth: 1,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
  },
  quickStartCard: {
    padding: Layout.spacing.md,
  },
  quickStartText: {
    fontSize: 16,
    marginBottom: Layout.spacing.md,
  },
  startButton: {
    marginTop: Layout.spacing.sm,
  },
  taskCard: {
    marginBottom: Layout.spacing.sm,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: Layout.spacing.sm,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Layout.spacing.md,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: Layout.spacing.xs,
  },
}); 