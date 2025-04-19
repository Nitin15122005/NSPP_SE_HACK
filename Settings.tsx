import React from 'react';
import { View, Text, Button } from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { useTheme } from 'styled-components/native';

export default function Settings() {
  const { currentTheme, setTheme } = useThemeStore();
  const theme = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
      <Text style={{ color: theme.text, fontSize: 20, marginBottom: 20 }}>Current Theme: {currentTheme}</Text>
      <Button
        title="Toggle Theme"
        onPress={() => setTheme(currentTheme === 'growth' ? 'action' : 'growth')}
      />
    </View>
  );
}
