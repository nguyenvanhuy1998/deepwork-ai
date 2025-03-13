import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Card from '../../../components/common/Card';

export default function InsightsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  // Mock data for insights
  const focusStats = {
    totalSessions: 28,
    totalHours: 14.5,
    avgFocusScore: 82,
    mostProductiveDay: 'Tuesday',
    mostProductiveTime: '9:00 AM',
  };

  const weeklyFocusData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.0 },
    { day: 'Wed', hours: 2.0 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 1.5 },
    { day: 'Sat', hours: 1.0 },
    { day: 'Sun', hours: 2.0 },
  ];

  const insights = [
    {
      id: '1',
      type: 'pattern',
      title: 'Most Productive Time',
      description: 'You tend to be most focused between 9:00 AM and 11:00 AM. Consider scheduling your most important tasks during this time.',
      icon: 'time-outline',
    },
    {
      id: '2',
      type: 'suggestion',
      title: 'Break Optimization',
      description: 'Taking slightly longer breaks (7-8 minutes) between focus sessions may improve your overall focus score.',
      icon: 'cafe-outline',
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Consistency Streak',
      description: 'You\'ve completed at least one focus session every day for the past 7 days. Great job maintaining consistency!',
      icon: 'trophy-outline',
    },
  ];

  const maxHours = Math.max(...weeklyFocusData.map(d => d.hours));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Insights</Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.statsCard}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Focus Summary
          </Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                {focusStats.totalSessions}
              </Text>
              <Text style={[styles.statLabel, { color: theme.text + 'CC' }]}>
                Sessions
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                {focusStats.totalHours}h
              </Text>
              <Text style={[styles.statLabel, { color: theme.text + 'CC' }]}>
                Total Hours
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                {focusStats.avgFocusScore}%
              </Text>
              <Text style={[styles.statLabel, { color: theme.text + 'CC' }]}>
                Avg. Focus
              </Text>
            </View>
          </View>
        </Card>

        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Weekly Focus
            </Text>
            <TouchableOpacity>
              <Text style={[styles.chartPeriod, { color: theme.primary }]}>
                Last 7 Days
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.chart}>
            {weeklyFocusData.map((item, index) => (
              <View key={index} style={styles.chartColumn}>
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: `${(item.hours / maxHours) * 100}%`,
                        backgroundColor: theme.primary,
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.barLabel, { color: theme.text + 'CC' }]}>
                  {item.day}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Personalized Insights
          </Text>
          
          {insights.map(insight => (
            <TouchableOpacity 
              key={insight.id}
              onPress={() => {
                router.push(`/insights/${insight.type}` as any);
              }}
            >
              <Card style={styles.insightCard}>
                <View style={styles.insightHeader}>
                  <View 
                    style={[
                      styles.insightIconContainer, 
                      { backgroundColor: theme.primary + '22' }
                    ]}
                  >
                    <Ionicons 
                      name={insight.icon as any} 
                      size={22} 
                      color={theme.primary} 
                    />
                  </View>
                  <Text style={[styles.insightTitle, { color: theme.text }]}>
                    {insight.title}
                  </Text>
                </View>
                <Text 
                  style={[styles.insightDescription, { color: theme.text + 'CC' }]}
                  numberOfLines={2}
                >
                  {insight.description}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
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
  statsCard: {
    marginBottom: Layout.spacing.lg,
    padding: Layout.spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Layout.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.xs,
  },
  statLabel: {
    fontSize: 12,
  },
  chartCard: {
    marginBottom: Layout.spacing.lg,
    padding: Layout.spacing.md,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  chartPeriod: {
    fontSize: 14,
  },
  chart: {
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: Layout.spacing.lg,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    height: 120,
    width: 20,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: Layout.borderRadius.sm,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 12,
    marginTop: Layout.spacing.xs,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Layout.spacing.md,
  },
  insightCard: {
    marginBottom: Layout.spacing.md,
    padding: Layout.spacing.md,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  insightIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.md,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  insightDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 36 + Layout.spacing.md,
  },
}); 