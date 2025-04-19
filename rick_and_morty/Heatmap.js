import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const DAYS_IN_MONTH = 31;

const getWeeklyStats = (activeDays) => {
  const weeks = [0, 0, 0, 0, 0];
  activeDays.forEach((day) => {
    const weekIndex = Math.floor((day - 1) / 7);
    if (weeks[weekIndex] !== undefined) weeks[weekIndex]++;
  });
  return weeks;
};

export default function Heatmap({ navigation }) {
  const [activeDays, setActiveDays] = useState([2, 3, 4, 8, 10, 15, 17]);
  const [pressed, setPressed] = useState({
    StreakBar: false,
    BarGraph: false,
    StreakGrid: false,
    Heatmap: false,
  });
  const [showStats, setShowStats] = useState(false);

  const toggleDay = (day) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleButton = (key, route) => {
    setPressed((prev) => ({ ...prev, [key]: !prev[key] }));
    navigation.navigate(route);
  };

  const weeklyStats = getWeeklyStats(activeDays);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {/* Heatmap grid directly here */}
      {pressed.Heatmap && (
  <View style={styles.row}>
    {Array.from({ length: DAYS_IN_MONTH }).map((_, i) => {
      const day = i + 1;
      const isActive = activeDays.includes(day);
      return (
        <TouchableOpacity
          key={day}
          style={[styles.box, isActive ? styles.active : styles.inactive]}
          onPress={() => toggleDay(day)}
        />
      );
    })}
  </View>
)}


      <TouchableOpacity
        style={styles.statsButton}
        onPress={() => setShowStats(!showStats)}
      >
        <Text style={styles.statsText}>
          {showStats ? 'Hide Stats' : 'Show Stats'}
        </Text>
      </TouchableOpacity>

      {showStats && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>🔥 Active Days: {activeDays.length}</Text>
          <Text style={styles.graphLabel}>Weekly Activity:</Text>
          {weeklyStats.map((count, i) => (
            <View key={i} style={styles.barRow}>
              <Text style={styles.weekLabel}>Week {i + 1}</Text>
              <View style={[styles.bar, { width: count * 20 }]}>
                <Text style={styles.barText}>{count}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={styles.buttonGrid}>
        {[
          { label: 'Streak Bar', key: 'Streakbar' },
          { label: 'Bar Graph', key: 'BarGraph' },
          { label: 'Streak Grid', key: 'StreakGrid' },
          { label: 'Heatmap', key: 'Heatmap' },
        ].map(({ label, key }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.squareButton,
              { backgroundColor: pressed[key] ? '#22c55e' : '#4f46e5' },
            ]}
            onPress={() => toggleButton(key, key)}
          >
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    paddingBottom: 54,
    paddingTop: 54,
    },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    justifyContent: 'center',
  },
  box: {
    width: 16,
    height: 16,
    margin: 2,
    borderRadius: 4,
  },
  active: { backgroundColor: '#2563eb' },
  inactive: { backgroundColor: '#e5e7eb' },

  statsButton: {
    alignSelf: 'center',
    backgroundColor: '#14b8a6',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  statsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  statsContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  graphLabel: {
    marginBottom: 4,
    fontWeight: '600',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  weekLabel: {
    width: 70,
    fontSize: 14,
  },
  bar: {
    height: 20,
    backgroundColor: '#4ade80',
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 6,
  },
  barText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  squareButton: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 18,
  },
});