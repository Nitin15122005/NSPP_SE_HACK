import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function StreakGrid() {
  const [streakDays, setStreakDays] = useState(Array(30).fill(false));
  const [showGraph, setShowGraph] = useState(false);

  const toggleDay = (index) => {
    const updated = [...streakDays];
    updated[index] = !updated[index];
    setStreakDays(updated);
  };

  const resetAll = () => {
    setStreakDays(Array(30).fill(false));
  };

  const activeCount = streakDays.filter(Boolean).length;

  // Generate weekly data (5 weeks of 7 days)
  const weeks = Array.from({ length: 5 }, (_, i) => streakDays.slice(i * 7, i * 7 + 7));

  // Get number of active days per week for the graph
  const weeklyActiveCounts = weeks.map(week => week.filter(Boolean).length);

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.headerRow}>
        <MaterialCommunityIcons name="calendar-month" size={24} color="#ef4444" />
        <Text style={styles.header}>Streak Timeline</Text>
      </View>

      {/* Day Labels */}
      <View style={styles.weekRow}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <Text key={i} style={styles.dayLabel}>{d}</Text>
        ))}
      </View>

      {/* Circles Grid */}
      <View style={styles.grid}>
        {streakDays.map((active, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleDay(index)}
            style={[
              styles.circle,
              active ? styles.activeCircle : styles.inactiveCircle,
            ]}
          />
        ))}
      </View>

      {/* Footer Info */}
      <Text style={styles.footer}>🔵 {activeCount} active days this month</Text>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.circle, styles.activeCircle]} />
          <Text style={styles.legendText}>Active</Text>
        </View>
        <TouchableOpacity style={styles.legendItem} onPress={resetAll}>
          <View style={[styles.circle, styles.inactiveCircle]} />
          <Text style={styles.legendText}>Inactive (Tap to Reset)</Text>
        </TouchableOpacity>
      </View>

      {/* Graph Toggle Button */}
      <TouchableOpacity style={styles.graphToggle} onPress={() => setShowGraph(!showGraph)}>
        <Text style={styles.graphToggleText}>
          {showGraph ? 'Hide Graph 📉' : 'Show Graph 📈'}
        </Text>
      </TouchableOpacity>

      {/* Visual Graph */}
      {showGraph && (
        <View style={styles.graphContainer}>
          {weeklyActiveCounts.map((count, index) => (
            <View key={index} style={styles.barItem}>
              <View style={[styles.bar, { height: count * 10 }]} />
              <Text style={styles.barLabel}>W{index + 1}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 8,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayLabel: {
    fontSize: 14,
    color: '#475569',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    margin: 4,
  },
  activeCircle: {
    backgroundColor: '#3b82f6',
  },
  inactiveCircle: {
    backgroundColor: '#cbd5e1',
  },
  footer: {
    marginTop: 16,
    fontSize: 15,
    textAlign: 'center',
    color: '#334155',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#475569',
  },
  graphToggle: {
    marginTop: 20,
    backgroundColor: '#bae6fd',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  graphToggleText: {
    fontSize: 16,
    color: '#0c4a6e',
    fontWeight: '500',
  },
  graphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginTop: 16,
    height: 120,
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 10,
  },
  barItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 20,
    backgroundColor: '#3b82f6',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  barLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#475569',
  },
});