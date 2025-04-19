import React from 'react';
import { View, Text, StyleSheet, ScrollView, ProgressBarAndroid } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const DetailScreen = ({ route }) => {
  const { title, description, completion, chartData } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.sub}>{description}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Tracking:</Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          progress={completion / 100}
          color="green"
        />
        <Text style={styles.percentText}>{completion}% Completed</Text>

        <BarChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ data: chartData }]
          }}
          width={320}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: () => `#4CAF50`,
            labelColor: () => `#333`,
          }}
          style={{ marginVertical: 8 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold' },
  sub: { color: '#666', marginBottom: 20 },
  card: {
    backgroundColor: '#f0f4f8',
    borderRadius: 20,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  percentText: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'green',
    fontSize: 16,
  },
});

export default DetailScreen;
