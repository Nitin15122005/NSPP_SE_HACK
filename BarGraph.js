import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const initialData = [
  { day: 'Mon', value: 3 },
  { day: 'Tue', value: 5 },
  { day: 'Wed', value: 2 },
  { day: 'Thu', value: 6 },
  { day: 'Fri', value: 4 },
  { day: 'Sat', value: 7 },
  { day: 'Sun', value: 1 },
];

export default function BarGraph() {
  const [showGraph, setShowGraph] = useState(true);
  const [highlighted, setHighlighted] = useState(null);

  const max = Math.max(...initialData.map((d) => d.value));
  const average =
    initialData.reduce((sum, d) => sum + d.value, 0) / initialData.length;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setShowGraph(!showGraph)}
      >
        <Text style={styles.toggleText}>
          {showGraph ? 'Hide Weekly Graph 🔽' : 'Show Weekly Graph 🔼'}
        </Text>
      </TouchableOpacity>

      {showGraph && (
        <>
          <Text style={styles.title}>📅 Weekly Progress</Text>

          {initialData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setHighlighted(index === highlighted ? null : index)}
              style={[
                styles.barContainer,
                highlighted === index && styles.highlighted,
              ]}
            >
              <Text style={styles.label}>{item.day}</Text>

              <View style={styles.barBackground}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${(item.value / max) * 100}%`,
                      backgroundColor:
                        highlighted === index ? '#facc15' : '#4f46e5',
                    },
                  ]}
                />
              </View>

              <Text style={styles.value}>{item.value}</Text>
            </TouchableOpacity>
          ))}

          {/* Average Line Display */}
          <Text style={styles.avgText}>
            ⬤ Average: {average.toFixed(1)} tasks/day
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8fafc',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#ccc',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleButton: {
    backgroundColor: '#e0e7ff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleText: {
    fontWeight: '600',
    color: '#3730a3',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#1e293b',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  highlighted: {
    backgroundColor: '#fef9c3',
  },
  label: {
    width: 40,
    fontSize: 14,
    color: '#334155',
  },
  barBackground: {
    flex: 1,
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#4f46e5',
    borderRadius: 6,
  },
  value: {
    width: 28,
    textAlign: 'right',
    fontSize: 14,
    color: '#334155',
  },
  avgText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#64748b',
    fontStyle: 'italic',
    fontSize: 13,
  },
});
