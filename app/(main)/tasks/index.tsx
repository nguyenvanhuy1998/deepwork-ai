import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

export default function TasksScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  // Mock data for tasks
  const [tasks, setTasks] = useState([
    { 
      id: '1', 
      title: 'Complete project proposal', 
      description: 'Finish the proposal for the new client project',
      priority: 4, 
      status: 'todo',
      dueDate: '2023-06-15',
      tags: ['work', 'urgent']
    },
    { 
      id: '2', 
      title: 'Review team updates', 
      description: 'Go through weekly team updates and provide feedback',
      priority: 3, 
      status: 'in_progress',
      dueDate: '2023-06-14',
      tags: ['work', 'management']
    },
    { 
      id: '3', 
      title: 'Prepare presentation', 
      description: 'Create slides for the upcoming client meeting',
      priority: 5, 
      status: 'todo',
      dueDate: '2023-06-16',
      tags: ['work', 'client']
    },
    { 
      id: '4', 
      title: 'Grocery shopping', 
      description: 'Buy groceries for the week',
      priority: 2, 
      status: 'todo',
      dueDate: '2023-06-17',
      tags: ['personal']
    },
    { 
      id: '5', 
      title: 'Schedule dentist appointment', 
      description: 'Call dentist to schedule a check-up',
      priority: 1, 
      status: 'completed',
      dueDate: '2023-06-10',
      tags: ['personal', 'health']
    },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'in_progress') return task.status === 'in_progress';
    if (filter === 'todo') return task.status === 'todo';
    return true;
  });

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 5: return theme.error;
      case 4: return theme.warning;
      case 3: return theme.accent;
      case 2: return theme.primary;
      default: return theme.secondary;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return theme.success;
      case 'in_progress': return theme.warning;
      case 'todo': return theme.primary;
      default: return theme.secondary;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderTaskItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      onPress={() => router.push({
        pathname: '/tasks/[id]',
        params: { id: item.id }
      })}
    >
      <Card style={styles.taskCard}>
        <View style={styles.taskHeader}>
          <View 
            style={[
              styles.priorityIndicator, 
              { backgroundColor: getPriorityColor(item.priority) }
            ]} 
          />
          <Text style={[styles.taskTitle, { color: theme.text }]}>
            {item.title}
          </Text>
          <View 
            style={[
              styles.statusBadge, 
              { backgroundColor: getStatusColor(item.status) + '33' }
            ]}
          >
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.replace('_', ' ')}
            </Text>
          </View>
        </View>
        
        {item.description && (
          <Text 
            style={[styles.taskDescription, { color: theme.text + 'CC' }]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        )}
        
        <View style={styles.taskFooter}>
          <Text style={[styles.taskDueDate, { color: theme.text + '99' }]}>
            Due: {formatDate(item.dueDate)}
          </Text>
          
          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {item.tags.map((tag: string) => (
                <View 
                  key={tag} 
                  style={[styles.tag, { backgroundColor: theme.primary + '22' }]}
                >
                  <Text style={[styles.tagText, { color: theme.primary }]}>
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Tasks</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: theme.primary }]}
          onPress={() => router.push('/tasks/create')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'all' && { backgroundColor: theme.primary },
            ]}
            onPress={() => setFilter('all')}
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === 'all' ? '#fff' : theme.text },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'todo' && { backgroundColor: theme.primary },
            ]}
            onPress={() => setFilter('todo')}
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === 'todo' ? '#fff' : theme.text },
              ]}
            >
              To Do
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'in_progress' && { backgroundColor: theme.primary },
            ]}
            onPress={() => setFilter('in_progress')}
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === 'in_progress' ? '#fff' : theme.text },
              ]}
            >
              In Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'completed' && { backgroundColor: theme.primary },
            ]}
            onPress={() => setFilter('completed')}
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === 'completed' ? '#fff' : theme.text },
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.text + 'CC' }]}>
              No tasks found. Create a new task to get started.
            </Text>
            <Button
              onPress={() => router.push('/tasks/create')}
              style={styles.createButton}
              icon="plus"
            >
              Create Task
            </Button>
          </View>
        }
      />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
  },
  filterButton: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.round,
    marginRight: Layout.spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    padding: Layout.spacing.lg,
    paddingTop: 0,
  },
  taskCard: {
    marginBottom: Layout.spacing.md,
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
  statusBadge: {
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.round,
    marginLeft: Layout.spacing.sm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  taskDescription: {
    fontSize: 14,
    marginTop: Layout.spacing.sm,
    marginLeft: Layout.spacing.lg,
  },
  taskFooter: {
    marginTop: Layout.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskDueDate: {
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.round,
    marginLeft: Layout.spacing.xs,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: Layout.spacing.lg,
  },
  createButton: {
    marginTop: Layout.spacing.md,
  },
}); 