import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import useAuth from '../../hooks/useAuth';

export default function DashboardScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { user, signOut } = useAuth();

  // Mock data for the dashboard
  const upcomingTasks = [
    { id: '1', title: 'Complete project proposal', priority: 4, dueDate: '2023-06-15' },
    { id: '2', title: 'Review team updates', priority: 3, dueDate: '2023-06-14' },
    { id: '3', title: 'Prepare presentation', priority: 5, dueDate: '2023-06-16' },
  ];

  const focusSessions = [
    { id: '1', duration: 25, date: '2023-06-12', focusScore: 85 },
    { id: '2', duration: 50, date: '2023-06-11', focusScore: 92 },
    { id: '3', duration: 25, date: '2023-06-10', focusScore: 78 },
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.text }]}>
            Hello, {user?.full_name || 'there'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.text + 'CC' }]}>
            Ready to focus today?
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.profileButton, { backgroundColor: theme.card }]}
          onPress={() => router.push('/settings')}
        >
          <Ionicons name="person" size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.startFocusSection}>
          <Card
            style={styles.focusCard}
            elevation={2}
          >
            <Text style={[styles.focusCardTitle, { color: theme.text }]}>
              Start a Focus Session
            </Text>
            <Text style={[styles.focusCardSubtitle, { color: theme.text + 'CC' }]}>
              Boost your productivity with a timed focus session
            </Text>
            <Button
              onPress={() => router.push('/focus')}
              style={styles.startButton}
              icon="play"
            >
              Start Focusing
            </Button>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Priority Tasks
            </Text>
            <TouchableOpacity onPress={() => router.push('/tasks')}>
              <Text style={[styles.seeAll, { color: theme.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {upcomingTasks.map(task => (
            <TouchableOpacity 
              key={task.id}
              onPress={() => router.push({ pathname: '/tasks/[id]', params: { id: task.id } })}
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
                </View>
                <View style={styles.taskFooter}>
                  <Text style={[styles.taskDueDate, { color: theme.text + '99' }]}>
                    Due: {formatDate(task.dueDate)}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}

          <Button
            onPress={() => router.push('/tasks/create')}
            mode="outlined"
            style={styles.addTaskButton}
            icon="plus"
          >
            Add New Task
          </Button>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Recent Focus Sessions
            </Text>
            <TouchableOpacity onPress={() => router.push('/insights')}>
              <Text style={[styles.seeAll, { color: theme.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.sessionsScrollView}
          >
            {focusSessions.map(session => (
              <Card 
                key={session.id}
                style={styles.sessionCard}
                onPress={() => router.push({ 
                  pathname: '/focus/summary', 
                  params: { sessionId: session.id } 
                })}
              >
                <Text style={[styles.sessionScore, { color: theme.primary }]}>
                  {session.focusScore}%
                </Text>
                <Text style={[styles.sessionLabel, { color: theme.text }]}>
                  Focus Score
                </Text>
                <View style={styles.sessionDetails}>
                  <Text style={[styles.sessionDetail, { color: theme.text + '99' }]}>
                    {session.duration} min
                  </Text>
                  <Text style={[styles.sessionDetail, { color: theme.text + '99' }]}>
                    {formatDate(session.date)}
                  </Text>
                </View>
              </Card>
            ))}
          </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl + 20, // Extra padding for status bar
    paddingBottom: Layout.spacing.md,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: Layout.spacing.xs,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg,
  },
  startFocusSection: {
    marginVertical: Layout.spacing.md,
  },
  focusCard: {
    padding: Layout.spacing.md,
  },
  focusCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.xs,
  },
  focusCardSubtitle: {
    fontSize: 14,
    marginBottom: Layout.spacing.md,
  },
  startButton: {
    marginTop: Layout.spacing.sm,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
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
  taskFooter: {
    marginTop: Layout.spacing.sm,
  },
  taskDueDate: {
    fontSize: 12,
  },
  addTaskButton: {
    marginTop: Layout.spacing.sm,
  },
  sessionsScrollView: {
    marginTop: Layout.spacing.sm,
  },
  sessionCard: {
    width: 140,
    marginRight: Layout.spacing.md,
    padding: Layout.spacing.md,
    alignItems: 'center',
  },
  sessionScore: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sessionLabel: {
    fontSize: 14,
    marginTop: Layout.spacing.xs,
  },
  sessionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Layout.spacing.md,
  },
  sessionDetail: {
    fontSize: 12,
  },
}); 