import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Card as PaperCard, Text } from 'react-native-paper';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

type CardProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
  contentStyle?: any;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
};

export default function Card({
  title,
  subtitle,
  children,
  onPress,
  style,
  contentStyle,
  elevation = 1,
}: CardProps) {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <PaperCard
      style={[
        styles.card,
        { backgroundColor: theme.card },
        style,
      ]}
      onPress={onPress}
      elevation={elevation}
    >
      {(title || subtitle) && (
        <PaperCard.Title
          title={title}
          subtitle={subtitle}
          titleStyle={[styles.title, { color: theme.text }]}
          subtitleStyle={[styles.subtitle, { color: theme.text + '99' }]}
        />
      )}
      <PaperCard.Content style={[styles.content, contentStyle]}>
        {children}
      </PaperCard.Content>
    </PaperCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
  },
  content: {
    paddingHorizontal: Layout.spacing.md,
    paddingBottom: Layout.spacing.md,
  },
}); 