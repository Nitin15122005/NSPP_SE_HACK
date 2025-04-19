import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import Mode from './Mode';
import GrowthPage from './Growth_page1';
import ActionPage from './Action_page1';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Mode" component={Mode} />
        <Stack.Screen name="GrowthPage" component={GrowthPage} />
        <Stack.Screen name="ActionPage" component={ActionPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
