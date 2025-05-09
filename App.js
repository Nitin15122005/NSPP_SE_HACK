import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/native-stack';

import Login from './Login'
import Home from './Home';
import Mode from './Mode';
import GrowthPage from './Growth_page1';
import ActionPage from './Action_page1';
import Calender from './Calendar';
import Heatmap from './Heatmap';
import BarGraph from './BarGraph';
import Streakbar from './Streakbar';
import StreakGrid from './StreakGrid';
import Activity from './Activity';
import Analysis from './Analysis'
import Friends from './Friends'
import Profile from './Profile'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Mode" component={Mode} />
        <Stack.Screen name="GrowthPage" component={GrowthPage} />
        <Stack.Screen name="ActionPage" component={ActionPage} />
        <Stack.Screen name="Calender" component={Calender} />
        <Stack.Screen name="Heatmap" component={Heatmap} />
        <Stack.Screen name="BarGraph" component={BarGraph} />
        <Stack.Screen name="Streakbar" component={Streakbar} />
        <Stack.Screen name="StreakGrid" component={StreakGrid} />
        <Stack.Screen name="Activity" component={Activity} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="Analysis" component={Analysis} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
