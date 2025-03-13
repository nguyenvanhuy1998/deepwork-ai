import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  style?: any;
  disabled?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad';
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  multiline = false,
  numberOfLines = 1,
  style,
  disabled = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  left,
  right,
}: InputProps) {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        disabled={disabled}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        mode="outlined"
        style={[
          styles.input,
          { backgroundColor: theme.card, color: theme.text },
        ]}
        outlineColor={error ? theme.error : theme.border}
        activeOutlineColor={error ? theme.error : theme.primary}
        textColor={theme.text}
        placeholderTextColor={theme.text + '66'}
        error={!!error}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        left={left}
        right={right}
      />
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.md,
  },
  input: {
    width: '100%',
  },
}); 