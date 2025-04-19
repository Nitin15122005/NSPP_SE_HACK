
import React, { useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Image, Animated, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

// BonusFeature mock with one feature using remote image
const bonusFeatures = [
  {
    title: '📈 Simple Progress Insights',
    description: 'Visualize your daily tracking easily.',
    image: { uri: 'https://via.placeholder.com/300x180.png?text=Progress' },
  },
];

// Simple BonusFeature screen to navigate
const BonusFeature = ({ navigation }) => (
  <View style={styles.container}>
    {bonusFeatures.map((feature, index) => (
      <View key={index} style={styles.card}>
        <Image source={feature.image} style={styles.image} />
        <Text style={styles.title}>{feature.title}</Text>
        <Text style={styles.description}>{feature.description}</Text>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Detail', { feature })}
        >
          View Detail →
        </Text>
      </View>
    ))}
  </View>
);

const Stack = createNativeStackNavigator();
const screenWidth = Dimensions.get('window').width - 48;

const DetailScreen = ({ route }) => {
  const { feature } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [3, 5, 4, 6, 2, 1, 5],
      },
    ],
  };

  return (
    <Animated.View style={[styles.detailContainer, { opacity: fadeAnim }]}>
      <Image source={feature.image} style={styles.image} />
      <Text style={styles.title}>{feature.title}</Text>
      <Text style={styles.description}>{feature.description}</Text>

      {feature.title.includes('Progress') && (
        <View style={styles.progressBox}>
          <Text style={styles.progressLabel}>Daily Tracking:</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>70% Completed</Text>

          <BarChart
            data={chartData}
            width={screenWidth}
            height={180}
            fromZero
            showValuesOnTopOfBars
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#f0f4f8',
              backgroundGradientTo: '#f0f4f8',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />
        </View>
      )}
    </Animated.View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BonusFeature"
          component={BonusFeature}
          options={{ title: 'Bonus Features' }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Feature Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: '#3b82f6',
    marginTop: 8,
  },
  detailContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fefefe',
    alignItems: 'center',
  },
  progressBox: {
    width: '100%',
    backgroundColor: '#f0f4f8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 14,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#4ade80',
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#10b981',
  },
  chart: {
    marginTop: 16,
    borderRadius: 12,
  },
});
