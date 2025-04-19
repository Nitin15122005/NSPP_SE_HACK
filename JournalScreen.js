import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const habits = [
  { id: '1', emoji: '🧘‍♀️', title: 'Meditate', time: '0 / 15 min', type: 'timer' },
  { id: '2', emoji: '🏃‍♂️', title: 'Running', time: '1 / 5 km', type: 'log' },
];

const thisWeek = [
  { id: '3', emoji: '🎮', title: 'Limit Video Game', time: '0 / 5 hr', action: 'Succeed' },
  { id: '4', emoji: '🏋️', title: 'Hit the Gym', time: '0 / 3 times', action: '+1' },
  { id: '5', emoji: '👨‍👩‍👧‍👦', title: 'Spend Time with Family', time: '0 / 8 times', action: '+1' },
];

export default function JournalScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Journal 🏃‍♂️</Text>

      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>All Habits</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Today</Text>
      {habits.map((habit) => (
        <View key={habit.id} style={styles.habitCard}>
          <Text style={styles.emoji}>{habit.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.habitTitle}>{habit.title}</Text>
            <Text style={styles.habitProgress}>{habit.time}</Text>
          </View>
          <TouchableOpacity style={styles.habitAction}>
            <Text style={styles.actionText}>{habit.type === 'log' ? 'Log' : 'Timer'}</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.sectionTitle}>4 This Week</Text>
      {thisWeek.map((habit) => (
        <View key={habit.id} style={styles.habitCard}>
          <Text style={styles.emoji}>{habit.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.habitTitle}>{habit.title}</Text>
            <Text style={styles.habitProgress}>{habit.time}</Text>
          </View>
          <TouchableOpacity style={styles.habitAction}>
            <Text style={styles.actionText}>{habit.action}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 28,
    marginRight: 10,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  habitProgress: {
    fontSize: 12,
    color: '#777',
  },
  habitAction: {
    backgroundColor: '#EEF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3366FF',
  },
});
