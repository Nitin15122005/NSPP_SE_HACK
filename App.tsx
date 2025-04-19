import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './src/screens/Onboarding';
import Dashboard from './src/screens/Dashboard';
import HabitEditor from './src/screens/HabitEditor';
import Settings from './src/screens/Settings';
import { ThemeProvider } from 'styled-components/native';
import { useThemeStore } from './src/store/themeStore';
import themes from './src/constants/themes';

const Stack = createNativeStackNavigator();

export default function App() {
  const { currentTheme } = useThemeStore();

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="HabitEditor" component={HabitEditor} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
