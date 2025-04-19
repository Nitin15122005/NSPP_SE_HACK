import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const features = [
  {
    id: '1',
    emoji: '🧩',
    title: 'Minimalist Widgets & Daily Boosts',
    detail: 'Explore surprise challenges and widgets tailored to your mode.',
  },
  {
    id: '2',
    emoji: '📊',
    title: 'Simple Progress Insights',
    detail: 'Non-judgmental tracking to keep you motivated gently.',
  },
  {
    id: '3',
    emoji: '🎨',
    title: 'Custom Themes & Personalization',
    detail: 'Unlock themes by completing habits and personal milestones.',
  },
];

const BonusFeature = ({ navigation }) => {
  const handleClick = (feature) => {
    navigation.navigate('Detail', { feature });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>✨ Bonus Features</Text>

      {features.map((feature) => (
        <TouchableOpacity key={feature.id} style={styles.card} onPress={() => handleClick(feature)}>
          <Text style={styles.feature}>{feature.emoji} {feature.title}</Text>
          <Text style={styles.description}>Tap to see more...</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default BonusFeature;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f7fa',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  feature: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
});
