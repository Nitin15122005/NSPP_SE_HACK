// GrowthActionScreen.js

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';

const GrowthActionScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [tasksByDate, setTasksByDate] = useState({
    '2025-04-19': [
      { id: '1', title: 'Drink Water', completed: true },
      { id: '2', title: 'Workout', completed: false },
      { id: '3', title: 'Working', completed: false },
      { id: '4', title: 'Meditation', completed: false },
      { id: '5', title: 'Walk the dog', completed: false },
    ],
  });

  const toggleTask = (taskId) => {
    setTasksByDate((prev) => {
      const tasks = prev[selectedDate] || [];
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return { ...prev, [selectedDate]: updatedTasks };
    });
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => toggleTask(item.id)}
      activeOpacity={0.7}
    >
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.title}
      </Text>
      <Icon
        name={item.completed ? 'check-square' : 'square-o'}
        size={24}
        color={item.completed ? '#FF9900' : '#ccc'}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Routines</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#FF9900',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#FF9900',
          selectedDayTextColor: '#fff',
          todayTextColor: '#FF9900',
          arrowColor: '#FF9900',
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 18,
        }}
        style={styles.calendar}
      />

      <Text style={styles.sectionTitle}>Today Task</Text>
      <FlatList
        data={tasksByDate[selectedDate] || []}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        contentContainerStyle={styles.taskList}
      />
    </SafeAreaView>
  );
};

export default GrowthActionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fb',
    padding: 16,
    paddingTop: 54,
  },
  calendar: {
    borderRadius: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
    paddingBottom: 32,
  },
  taskList: {
    paddingBottom: 16,
  },
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});
