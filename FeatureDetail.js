import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeatureDetail = ({ route }) => {
  const { feature } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{feature.emoji}</Text>
      <Text style={styles.title}>{feature.title}</Text>
      <Text style={styles.description}>{feature.detail}</Text>
    </View>
  );
};

export default FeatureDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});
