import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';

const habits = [
  { id: '1', emoji: '🏋️‍♀️', title: 'Go to the Gym' },
  { id: '2', emoji: '🏃‍♀️', title: 'Go for a Run' },
  { id: '3', emoji: '💃', title: 'Dance for 10 min' },
  
  { id: '6', emoji: '🎧', title: 'Pump-up Playlist' },
  { id: '7', emoji: '🚿', title: 'Cold Shower' },
  { id: '8', emoji: '🚴‍♂️', title: 'Bike Ride' },
  { id: '9', emoji: '🥊', title: 'Boxing Session' },
  { id: '10', emoji: '🧗‍♀️', title: 'Climb or Stretch' },
];

const numColumns = 2;
const squareSize = Dimensions.get('window').width / numColumns - 40;

const Action = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, { width: squareSize, height: squareSize }]}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔥 Action Mode</Text>
      <FlatList
        data={habits}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default Action;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  emoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
