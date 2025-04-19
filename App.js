// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Heatmap from './components/Heatmap';
import StreakBar from './components/Streakbar';
import BarGraph from './components/BarGraph';
import StreakGrid from './components/StreakGrid';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Heatmap" component={Heatmap} />
        <Stack.Screen name="StreakBar" component={StreakBar} />
        <Stack.Screen name="BarGraph" component={BarGraph} />
        <Stack.Screen name="StreakGrid" component={StreakGrid} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}