import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([
    { id: '1', title: 'Drink Water', color: '#B4D4FF', done: false },
    { id: '2', title: 'Run', color: '#FFB4B4', done: false },
    { id: '3', title: 'Water Plants', color: '#FFD59E', done: false },
  ]);

  const [done, setDone] = useState([{ id: '4', title: 'Wake up early', color: '#D4F9B8' }]);

  const handleComplete = (id) => {
    const item = todos.find((t) => t.id === id);
    setTodos(todos.filter((t) => t.id !== id));
    setDone([...done, item]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Today.</Text>
      <Text style={styles.date}>August 31, 2020</Text>

      <Text style={styles.section}>To Do</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.taskItem, { backgroundColor: item.color }]} onPress={() => handleComplete(item.id)}>
            <Text style={styles.taskText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.section}>Done</Text>
      <FlatList
        data={done}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, { backgroundColor: item.color, opacity: 0.6 }]}>
            <Text style={styles.taskText}>{item.title}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Habit</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>Home</Text>
        <Text style={styles.navItem}>Profile</Text>
        <Text style={styles.navItem}>Progress</Text>
        <Text style={styles.navItem}>Settings</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  taskItem: {
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#B4D4FF',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  navItem: {
    fontSize: 14,
    color: '#666',
  },
});
