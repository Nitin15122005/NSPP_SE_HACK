import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function StreakBar() {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [showDetail, setShowDetail] = useState(false);

  const currentStreak = 7;
  const bestStreak = 14;
  const progress = (currentStreak / bestStreak) * 100;

  const last7Days = [1, 3, 5, 7, 6, 4, 2]; // Sample data for 7 days

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔥 Streak Progress</Text>
      <View style={styles.row}>
        <MaterialCommunityIcons name="fire" size={24} color="#f87171" />
        <Text style={styles.label}>Current Streak: {currentStreak} days</Text>
      </View>
      <View style={styles.barBackground}>
        <Animated.View style={[styles.barFill, { width: animatedWidth }]} />
      </View>
      <Text style={styles.best}>🏅 Best Streak: {bestStreak} days</Text>

      {/* Toggle button */}
      <TouchableOpacity onPress={() => setShowDetail(!showDetail)}>
        <Text style={styles.toggle}>{showDetail ? 'Hide Details ▲' : 'View Breakdown ▼'}</Text>
      </TouchableOpacity>

      {/* Bar Graph Detail */}
      {showDetail && (
        <View style={styles.graph}>
          {last7Days.map((val, i) => (
            <View key={i} style={styles.graphItem}>
              <View style={[styles.graphBar, { height: val * 10 }]} />
              <Text style={styles.graphLabel}>D{i + 1}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
  },
  barBackground: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: 12,
    backgroundColor: '#4ade80',
    borderRadius: 6,
  },
  best: {
    marginTop: 10,
    fontSize: 14,
    color: '#6b7280',
  },
  toggle: {
    marginTop: 12,
    color: '#3b82f6',
    fontWeight: '500',
    textAlign: 'center',
  },
  graph: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginTop: 15,
    paddingBottom: 10,
  },
  graphItem: {
    alignItems: 'center',
  },
  graphBar: {
    width: 10,
    backgroundColor: '#60a5fa',
    borderRadius: 4,
  },
  graphLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748b',
  },
});
