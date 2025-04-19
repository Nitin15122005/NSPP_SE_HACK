import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
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
  const [mode, setMode] = useState('growth');
  const [customHabits, setCustomHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ emoji: '', title: '', time: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const navigation = useNavigation();

  const baseHabits = mode === 'growth' ? calmingHabits : actionHabits;
  const habits = [...baseHabits, ...customHabits.filter((h) => h.mode === mode)];

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
            onPress={() => navigation.navigate('Heatmap')} //, { habit })}
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

      {showAddForm && (
        <View style={styles.addForm}>
          <Text style={styles.addLabel}>Add New Habit</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Emoji"
              value={newHabit.emoji}
              onChangeText={(text) => setNewHabit((prev) => ({ ...prev, emoji: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newHabit.title}
              onChangeText={(text) => setNewHabit((prev) => ({ ...prev, title: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Progress (e.g. 0 / 1)"
              value={newHabit.time}
              onChangeText={(text) => setNewHabit((prev) => ({ ...prev, time: text }))}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              if (newHabit.title.trim()) {
                const id = `${mode}_${Date.now()}`;
                setCustomHabits((prev) => [...prev, { ...newHabit, id, mode }]);
                setNewHabit({ emoji: '', title: '', time: '' });
                setShowAddForm(false);
              }
            }}
          >
            <Text style={styles.addButtonText}>Save Habit</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setShowAddForm((prev) => !prev)}
        style={styles.addHabitBtn}
      >
        <Text style={styles.addHabitBtnText}>
          {showAddForm ? 'Cancel' : '+ Add New Habit'}
        </Text>
      </TouchableOpacity>
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
  headerWrapper: {
    marginTop: 60,
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    paddingBottom: 16,
  },
  toggleWrapper: {
    alignItems: 'center',
    marginBottom: 20,
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
  addHabitBtn: {
    backgroundColor: '#DDEEFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addHabitBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addForm: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#CCC',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  addLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'column',
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
