import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { useColorScheme } from 'react-native';

type ButtonProps = {
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  onPress: () => void;
  children: React.ReactNode;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  labelStyle?: any;
  icon?: string;
  uppercase?: boolean;
};

export default function Button({
  mode = 'contained',
  onPress,
  children,
  color,
  disabled = false,
  loading = false,
  style,
  labelStyle,
  icon,
  uppercase = false,
}: ButtonProps) {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  
  return (
    <View style={styles.container}>
      <PaperButton
        mode={mode}
        onPress={onPress}
        disabled={disabled}
        loading={loading}
        style={[styles.button, style]}
        labelStyle={[styles.label, labelStyle]}
        icon={icon}
        uppercase={uppercase}
        buttonColor={color || theme.primary}
        textColor={mode === 'contained' ? '#fff' : theme.primary}
      >
        {children}
      </PaperButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 