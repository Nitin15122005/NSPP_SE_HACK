import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Image,
  Switch,
  ScrollView
} from 'react-native';

export default function ActionMode({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [progress, setProgress] = useState(70);
  
  // Mock user data
  const user = {
    name: "Alex",
    avatar: require('./assets/profile.png') // You'll need to ensure this asset exists
  };
  
  // Action mode specific activities
  const activities = [
    { 
      id: 1, 
      title: 'HIIT Training', 
      description: 'Burn max calories in minimal time', 
      icon: '🔥',
      color: '#FF4136'
    },
    { 
      id: 2, 
      title: 'Strength Training', 
      description: 'Push your limits, gain power', 
      icon: '💪',
      color: '#FF851B'
    },
    { 
      id: 3, 
      title: 'Boxing', 
      description: 'Release your aggression', 
      icon: '🥊',
      color: '#B10DC9'
    },
    { 
      id: 4, 
      title: 'Sprint Session', 
      description: 'Maximum speed, maximum results', 
      icon: '⚡',
      color: '#0074D9'
    }
  ];

  // Toggle dark mode
  const toggleSwitch = () => {
    setIsDarkMode(previousState => !previousState);
  };

  return (
    <SafeAreaView style={[
      styles.container, 
      isDarkMode ? styles.darkContainer : styles.lightContainer
    ]}>
      {/* Header with profile and dark mode toggle */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image 
            source={user.avatar} 
            style={styles.avatar}
            defaultSource={require('./assets/profile.png')}
          />
          <Text style={[
            styles.userName, 
            isDarkMode ? styles.darkText : styles.lightText
          ]}>
            {user.name}
          </Text>
        </View>
        
        <View style={styles.toggleContainer}>
          <Text style={[
            styles.toggleLabel, 
            isDarkMode ? styles.darkText : styles.lightText
          ]}>
            {isDarkMode ? '🌙' : '☀️'}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FF4136' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDarkMode}
          />
        </View>
      </View>

      {/* Main content */}
      <View style={styles.mainContent}>
        <Text style={[
          styles.title, 
          isDarkMode ? styles.darkText : styles.lightText
        ]}>
          ACTION MODE
        </Text>
        
        {/* Progress Circle */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>{progress}%</Text>
            <Text style={styles.progressLabel}>INTENSITY</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Days Streak</Text>
          </View>
          
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>⏱️</Text>
            <Text style={styles.statValue}>87</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>⚡</Text>
            <Text style={styles.statValue}>243</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
        </View>

        {/* Activities */}
        <View style={styles.activitiesSection}>
          <View style={styles.sectionHeader}>
            <Text style={[
              styles.sectionTitle, 
              isDarkMode ? styles.darkText : styles.lightText
            ]}>
              COMBAT ACTIVITIES
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.activitiesList}>
            {activities.map(activity => (
              <TouchableOpacity 
                key={activity.id} 
                style={[styles.activityCard, { borderLeftColor: activity.color }]}
                onPress={() => console.log(`Selected activity: ${activity.title}`)}
              >
                <Text style={styles.activityIcon}>{activity.icon}</Text>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                </View>
                <Text style={styles.activityArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
          route: 'Mode.js'
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navText}>Analysis</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>+</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>⚡</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Action</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  lightContainer: {
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#2C3E50',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    marginRight: 8,
    fontSize: 16,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 65, 54, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  progressCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 10,
    borderColor: '#FF4136',
    backgroundColor: 'rgba(255, 65, 54, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FF4136',
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF4136',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 15,
    margin: 5,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  activitiesSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    color: '#FF4136',
  },
  activitiesList: {
    flex: 1,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 5,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  activityDescription: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 3,
  },
  activityArrow: {
    fontSize: 24,
    color: '#FF4136',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1A1A1A',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    flex: 1,
  },
  activeNavButton: {
    backgroundColor: 'rgba(255, 65, 54, 0.15)',
    borderRadius: 10,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: '#AAA',
  },
  activeNavIcon: {
    color: '#FF4136',
  },
  navText: {
    fontSize: 12,
    color: '#AAA',
  },
  activeNavText: {
    color: '#FF4136',
    fontWeight: 'bold',
  }
});