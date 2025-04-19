import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const calmingHabits = [
  { id: '1', emoji: '🧘‍♀️', title: 'Meditate', time: '0 / 15 min' },
  { id: '2', emoji: '📓', title: 'Journal', time: '0 / 1 entry' },
  { id: '3', emoji: '📖', title: 'Read a Book', time: '0 / 20 min' },
  { id: '4', emoji: '🌳', title: 'Nature Walk', time: '0 / 30 min' },
  { id: '5', emoji: '💖', title: 'Practice Gratitude', time: '0 / 3 things' },
  { id: '6', emoji: '📵', title: 'Digital Detox', time: '0 / 1 hr' },
];

const actionHabits = [
  { id: 'a1', emoji: '🏋️‍♂️', title: 'Workout', time: '0 / 3 sets' },
  { id: 'a2', emoji: '💼', title: 'Crush Work Tasks', time: '0 / 5 tasks' },
  { id: 'a3', emoji: '🧹', title: 'Clean Room', time: '0 / 1 area' },
  { id: 'a4', emoji: '📈', title: 'Plan the Day', time: '0 / 1 session' },
  { id: 'a5', emoji: '🍳', title: 'Cook a Meal', time: '0 / 1 meal' },
  { id: 'a6', emoji: '🚿', title: 'Cold Shower', time: '0 / 1 done' },
];

export default function GrowthActionScreen() {
  const [completed, setCompleted] = useState({});
  const [mode, setMode] = useState('growth'); // 'growth' or 'action'
  const navigation = useNavigation();
  const habits = mode === 'growth' ? calmingHabits : actionHabits;

  const toggleComplete = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'growth' ? 'action' : 'growth'));
  };

  return (
  <ScrollView style={[styles.container, mode === 'action' && styles.actionMode]}>
    <View style={styles.headerWrapper}>
      <Text style={styles.header}>
        {mode === 'growth' ? 'Personal Growth Mode 🌿' : 'Action Mode ⚡️'}
      </Text>

      <View style={styles.toggleWrapper}>
        <TouchableOpacity style={styles.modeSwitch} onPress={toggleMode}>
          <Text style={styles.modeSwitchText}>
            {mode === 'growth' ? 'Switch to Action Mode' : 'Switch to Growth Mode'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <Text style={styles.sectionTitle}>Today’s Tasks</Text>
    {habits.map((habit) => (
  <View
    key={habit.id}
    style={[styles.habitCard, completed[habit.id] && styles.completedCard]}
  >
    <TouchableOpacity
      style={styles.habitInfo}
      onPress={() => navigation.navigate('TaskDashboard', { habit })}
    >
      <Text style={styles.emoji}>{habit.emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.habitTitle,
            completed[habit.id] && { textDecorationLine: 'line-through', color: '#999' },
          ]}
        >
          {habit.title}
        </Text>
        <Text style={styles.habitProgress}>{habit.time}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => toggleComplete(habit.id)}>
      <Ionicons
        name={completed[habit.id] ? 'checkbox' : 'square-outline'}
        size={24}
        color={completed[habit.id] ? '#4CAF50' : '#AAA'}
      />
    </TouchableOpacity>
  </View>
))}


  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  actionMode: {
    backgroundColor: '#FFF5F5',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerWrapper: {
    marginTop: 60, // ⬅️ was 40, now 60 for more space
    marginBottom: 20,
    alignItems: 'center',
  },
  modeSwitch: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  modeSwitchText: {
    fontWeight: '600',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    shadowColor: '#CCC',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  completedCard: {
    backgroundColor: '#E8F5E9',
  },
  emoji: {
    fontSize: 28,
    marginRight: 12,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  habitProgress: {
    fontSize: 12,
    color: '#777',
  },
  habitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  toggleWrapper: {
  alignItems: 'center',
  marginBottom: 20,
},
});
