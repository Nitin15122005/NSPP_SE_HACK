import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import BarGraph from './BarGraph';
import Calendar from './Calendar';
import Heatmap from './Heatmap';
import StreakBar from './Streakbar';
import StreakGrid from './StreakGrid';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Analysis({ navigation }) {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('Analysis');
  const [activeSection, setActiveSection] = useState('stats');

  // Enhanced activity data with different activity types
  const activityData = {
    '2025-04-01': { selected: true, selectedColor: '#4CD964', activityType: 'cycling' },
    '2025-04-02': { selected: true, selectedColor: '#FF9500', activityType: 'running' },
    '2025-04-03': { selected: true, selectedColor: '#4CD964', activityType: 'cycling' },
    '2025-04-05': { selected: true, selectedColor: '#34C759', activityType: 'yoga' },
    '2025-04-07': { selected: true, selectedColor: '#4CD964', activityType: 'cycling' },
    '2025-04-08': { selected: true, selectedColor: '#5856D6', activityType: 'swimming' },
    '2025-04-09': { selected: true, selectedColor: '#4CD964', activityType: 'cycling' },
    '2025-04-11': { selected: true, selectedColor: '#FF2D55', activityType: 'strength' },
    '2025-04-13': { selected: true, selectedColor: '#4CD964', activityType: 'cycling' },
    '2025-04-15': { selected: true, selectedColor: '#FF9500', activityType: 'running' },
    '2025-04-17': { selected: true, selectedColor: '#4CD964', activityType: 'cycling' },
    '2025-04-19': { selected: true, selectedColor: '#34C759', activityType: 'yoga' },
    '2025-04-20': { selected: true, selectedColor: '#4CD964', activityType: 'cycling' },
  };

  // Sample weekly activity data for the bar graph
  const weeklyData = [
    { day: 'Mon', value: 45, label: '45 min' },
    { day: 'Tue', value: 30, label: '30 min' },
    { day: 'Wed', value: 60, label: '60 min' },
    { day: 'Thu', value: 20, label: '20 min' },
    { day: 'Fri', value: 50, label: '50 min' },
    { day: 'Sat', value: 75, label: '75 min' },
    { day: 'Sun', value: 90, label: '90 min' },
  ];

  // Sample activity distribution for pie chart (simplified)
  const activityDistribution = [
    { name: 'Cycling', value: 45, color: '#4CD964' },
    { name: 'Running', value: 20, color: '#FF9500' },
    { name: 'Yoga', value: 15, color: '#34C759' },
    { name: 'Swimming', value: 10, color: '#5856D6' },
    { name: 'Strength', value: 10, color: '#FF2D55' },
  ];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header with profile icon */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Habit Analysis</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={navigateToProfile} style={styles.profileButton}>
              <Image 
                source={require('./assets/profile.png')} 
                style={styles.profileIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
              <Text style={{ color: theme.accentText }}>
                {darkMode ? '☀️' : '🌙'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Section Toggle with improved UI */}
        <View style={styles.sectionToggle}>
          <TouchableOpacity 
            style={[styles.sectionButton, activeSection === 'stats' && { backgroundColor: theme.accent }]}
            onPress={() => setActiveSection('stats')}
          >
            <Text style={[styles.sectionButtonText, activeSection === 'stats' && { color: '#FFFFFF' }]}>
              Stats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sectionButton, activeSection === 'calendar' && { backgroundColor: theme.accent }]}
            onPress={() => setActiveSection('calendar')}
          >
            <Text style={[styles.sectionButtonText, activeSection === 'calendar' && { color: '#FFFFFF' }]}>
              Calendar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sectionButton, activeSection === 'graphs' && { backgroundColor: theme.accent }]}
            onPress={() => setActiveSection('graphs')}
          >
            <Text style={[styles.sectionButtonText, activeSection === 'graphs' && { color: '#FFFFFF' }]}>
              Insights
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeSection === 'stats' && (
          <>
            {/* Summary Cards with improved layout */}
            <View style={styles.summaryContainer}>
              <View style={[styles.summaryCard, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.summaryValue, { color: theme.accent }]}>12</Text>
                <Text style={[styles.summaryLabel, { color: theme.secondaryText }]}>Day Streak</Text>
                <Text style={[styles.summarySubtext, { color: theme.secondaryText }]}>🔥 Keep it up!</Text>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.summaryValue, { color: theme.accent }]}>18/30</Text>
                <Text style={[styles.summaryLabel, { color: theme.secondaryText }]}>Active Days</Text>
                <Text style={[styles.summarySubtext, { color: theme.secondaryText }]}>📅 This month</Text>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.summaryValue, { color: theme.accent }]}>87%</Text>
                <Text style={[styles.summaryLabel, { color: theme.secondaryText }]}>Consistency</Text>
                <Text style={[styles.summarySubtext, { color: theme.secondaryText }]}>⭐ Personal best</Text>
              </View>
            </View>

            {/* Activity Breakdown */}
            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Activity Breakdown</Text>
              <View style={styles.activityBreakdown}>
                {activityDistribution.map((activity, index) => (
                  <View key={index} style={styles.activityItem}>
                    <View style={[styles.activityColor, { backgroundColor: activity.color }]} />
                    <Text style={[styles.activityText, { color: theme.text }]}>{activity.name}</Text>
                    <Text style={[styles.activityPercent, { color: theme.secondaryText }]}>{activity.value}%</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Streak Bar */}
            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Current Streak</Text>
              <StreakBar theme={theme} currentStreak={12} longestStreak={18} />
            </View>
          </>
        )}

        {activeSection === 'calendar' && (
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Activity Calendar</Text>
            <Calendar markedDates={activityData} theme={theme} />
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#4CD964' }]} />
                <Text style={[styles.legendText, { color: theme.text }]}>Cycling</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#FF9500' }]} />
                <Text style={[styles.legendText, { color: theme.text }]}>Running</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#34C759' }]} />
                <Text style={[styles.legendText, { color: theme.text }]}>Yoga</Text>
              </View>
            </View>
          </View>
        )}

        {activeSection === 'graphs' && (
          <>
            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Weekly Activity</Text>
              <BarGraph theme={theme} data={weeklyData} />
            </View>
            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Activity Heatmap</Text>
              <Heatmap theme={theme} />
            </View>
            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Yearly Overview</Text>
              <StreakGrid theme={theme} />
            </View>
          </>
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={[styles.bottomNav, { backgroundColor: theme.cardBackground }]}>
        {bottomTabs.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={styles.navItem}
            onPress={() => handleTabPress(tab.label)}
          >
            <Image
              source={tab.icon}
              style={[
                styles.navIcon,
                { tintColor: activeTab === tab.label ? theme.accent : theme.secondaryText }
              ]}
            />
            <Text style={[
              styles.navLabel,
              { 
                color: activeTab === tab.label ? theme.accent : theme.secondaryText,
                fontWeight: activeTab === tab.label ? '600' : 'normal',
              },
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// Theme Configuration
const darkTheme = {
  background: '#121212',
  cardBackground: '#1E1E1E',
  text: '#FFFFFF',
  secondaryText: '#A0A0A0',
  accent: '#4CD964',
  accentText: '#FFFFFF',
};

const lightTheme = {
  background: '#F5F5F5',
  cardBackground: '#FFFFFF',
  text: '#333333',
  secondaryText: '#666666',
  accent: '#4CD964',
  accentText: '#000000',
};

const bottomTabs = [
  {
    label: 'Home',
    icon: require('./assets/home.png'),
    route: 'Home.js'
  },
  {
    label: 'Analysis',
    icon: require('./assets/analysis.png'),
    route: 'Analysis.js'
  },
  {
    label: 'Activity',
    icon: require('./assets/plus.png'),
    route: 'Activity.js'
  },
  {
    label: 'Action Mode',
    icon: require('./assets/timer.png'),
    route: 'Mode.js', 
  },
  {
    label: 'Friends',
    icon: require('./assets/profile.png'),
    route: 'Friends.js'
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    marginRight: 15,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  themeButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  sectionToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    padding: 4,
  },
  sectionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  sectionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  summarySubtext: {
    fontSize: 12,
    marginTop: 4,
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  activityBreakdown: {
    marginTop: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  activityColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
  },
  activityPercent: {
    fontSize: 14,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderTopColor: '#3E3E3E',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
  },
});
