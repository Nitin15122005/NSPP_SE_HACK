import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Onboarding({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to RickMortyHabitApp 🚀</Text>
      <Button title="Get Started" onPress={() => navigation.replace('Dashboard')} />
    </View>
  );
}
