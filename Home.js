import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Home({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('Home');
  const [darkMode, setDarkMode] = useState(true);
  
  // Initialize tutorials state with the existing tutorials
  const [activitiesList, setActivitiesList] = useState(tutorials);
  
  // Calculate progress percentage
  const progress = 70;
  // Calculate the circle circumference
  const circleRadius = screenWidth * 0.3 - 4; // Accounting for border width
  const circleCircumference = 2 * Math.PI * circleRadius;
  // Calculate the filled portion based on progress
  const fillOffset = circleCircumference * (1 - progress / 100);

  // Handle new activity from route params
  useEffect(() => {
    if (route.params?.newActivity) {
      // Make sure progress is defined
      const newActivity = {
        ...route.params.newActivity,
        progress: route.params.newActivity.progress ?? 0 // Use nullish coalescing
      };
      
      // Add the new activity to the list
      setActivitiesList(currentList => [newActivity, ...currentList]);
      
      // Update dark mode if it was changed
      if (route.params.darkMode !== undefined) {
        setDarkMode(route.params.darkMode);
      }
    }
  }, [route.params]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    
    // Navigation based on tab selection
    switch(tab) {
      case 'Home':
        // Already on home screen
        break;
      case 'Analysis':
        navigation.navigate('Analysis', { darkMode });
        break;
      case 'Activity':
        navigation.navigate('Activity', { darkMode });
        break;
      case 'Action Mode':
        navigation.navigate('Mode', { darkMode }); // Updated to navigate to Mode.js instead of MyWatch
        break;
      case 'Friends':
        navigation.navigate('Friends', { darkMode });
        break;
      default:
        // Default case to handle any undefined tabs
        break;
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Theme colors
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header with Theme Toggle */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={[styles.greeting, { color: theme.text }]}>Rick & Morty</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image source={require('./assets/profile.png')} style={styles.profileIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
            <Text style={{ color: theme.accentText }}>
              {darkMode ? '☀️ Calm' : '🌙 Action'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Today Label */}
        <Text style={[styles.todayLabel, { color: theme.secondaryText }]}>TODAY</Text>

        {/* Progress Circle */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCircleContainer}>
            {/* Background Circle */}
            <View style={[styles.progressCircle, { borderColor: theme.progressBg }]} />
            
            {/* SVG Progress Circle */}
            <View style={styles.svgContainer}>
              <View style={styles.svgCircle}>
                <View
                  style={[
                    styles.progressArc,
                    {
                      borderColor: theme.accent,
                      width: screenWidth * 0.6,
                      height: screenWidth * 0.6,
                      borderRadius: screenWidth * 0.3,
                      borderWidth: 8,
                      position: 'absolute',
                      borderLeftColor: 'transparent',
                      borderBottomColor: 'transparent',
                      transform: [
                        { rotateZ: `${progress * 3.6}deg` }
                      ],
                      opacity: progress <= 25 ? 1 : 0
                    }
                  ]}
                />
                
                <View
                  style={[
                    styles.progressArc,
                    {
                      borderColor: theme.accent,
                      width: screenWidth * 0.6,
                      height: screenWidth * 0.6,
                      borderRadius: screenWidth * 0.3,
                      borderWidth: 8,
                      position: 'absolute',
                      borderRightColor: 'transparent',
                      borderBottomColor: 'transparent',
                      transform: [
                        { rotateZ: '0deg' }
                      ],
                      opacity: progress > 25 && progress <= 50 ? 1 : 0
                    }
                  ]}
                />
                
                <View
                  style={[
                    styles.progressArc,
                    {
                      borderColor: theme.accent,
                      width: screenWidth * 0.6,
                      height: screenWidth * 0.6,
                      borderRadius: screenWidth * 0.3,
                      borderWidth: 8,
                      position: 'absolute',
                      borderRightColor: 'transparent',
                      borderTopColor: 'transparent',
                      transform: [
                        { rotateZ: '90deg' }
                      ],
                      opacity: progress > 50 && progress <= 75 ? 1 : 0
                    }
                  ]}
                />
                
                <View
                  style={[
                    styles.progressArc,
                    {
                      borderColor: theme.accent,
                      width: screenWidth * 0.6,
                      height: screenWidth * 0.6,
                      borderRadius: screenWidth * 0.3,
                      borderWidth: 8,
                      position: 'absolute',
                      borderLeftColor: 'transparent',
                      borderTopColor: 'transparent',
                      transform: [
                        { rotateZ: '180deg' }
                      ],
                      opacity: progress > 75 ? 1 : 0
                    }
                  ]}
                />
              </View>
            </View>

            {/* Center Content */}
            <View style={styles.progressCenterContent}>
              <View style={styles.stepsIconContainer}>
                <Image 
                  source={require('./assets/target.png')} 
                  style={styles.stepsIcon} 
                  tintColor={theme.accent}
                />
              </View>
              <Text style={[styles.stepsCount, { color: theme.text }]}>{progress}%</Text>
              <Text style={[styles.stepsGoal, { color: theme.secondaryText }]}>Completed</Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#FF375F20' }]}>
              <Text style={{ color: '#FF375F', fontSize: 16 }}>🔥</Text>
            </View>
            <Text style={[styles.statValue, { color: theme.text }]}>12</Text>
            <Text style={[styles.statLabel, { color: theme.secondaryText }]}>Days</Text>
            <Text style={[styles.statSubLabel, { color: theme.secondaryText }]}>Streak</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#4CD96420' }]}>
              <Text style={{ color: '#4CD964', fontSize: 16 }}>📖</Text>
            </View>
            <Text style={[styles.statValue, { color: theme.text }]}>58</Text>
            <Text style={[styles.statLabel, { color: theme.secondaryText }]}>minutes</Text>
            <Text style={[styles.statSubLabel, { color: theme.secondaryText }]}>Study</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#5E5CE620' }]}>
              <Text style={{ color: '#5E5CE6', fontSize: 16 }}>💧</Text>
            </View>
            <Text style={[styles.statValue, { color: theme.text }]}>20</Text>
            <Text style={[styles.statLabel, { color: theme.secondaryText }]}>%</Text>
            <Text style={[styles.statSubLabel, { color: theme.secondaryText }]}>Goal</Text>
          </View>
        </View>

        {/* Activities Section */}
        <View style={styles.tutorialsHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Activities</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllActivities')}>
            <Text style={[styles.seeAll, { color: theme.accent }]}>See all</Text>
          </TouchableOpacity>
        </View>

        {activitiesList.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.tutorialCard, { backgroundColor: theme.cardBackground }]}
            onPress={() => navigation.navigate(item.navigationTarget)}
          >
            <View style={[styles.tutorialIconContainer, { backgroundColor: item.iconBg }]}>
              <Image 
                source={item.icon} 
                style={styles.tutorialIcon} 
                tintColor={item.iconColor}
              />
            </View>
            <View style={styles.tutorialTextContainer}>
              <Text style={[styles.tutorialTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.tutorialDescription, { color: theme.secondaryText }]}>{item.description}</Text>
            </View>
            <Text style={[styles.arrow, { color: theme.accent }]}>{'>'}</Text>
          </TouchableOpacity>
        ))}

        {/* Start Workout Button */}
        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: theme.accent }]}
          onPress={() => navigation.navigate('NewWorkout')}
        >
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
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
  background: '#000000',
  cardBackground: '#1C1C1E',
  text: '#FFFFFF',
  secondaryText: '#8E8E93',
  accent: '#4CD964', // Green accent color
  accentText: '#FFFFFF',
  progressBg: '#333333',
};

const lightTheme = {
  background: '#F2F2F7',
  cardBackground: '#FFFFFF',
  text: '#000000',
  secondaryText: '#6C6C70',
  accent: '#4CD964', // Green accent color
  accentText: '#000000',
  progressBg: '#E5E5EA',
};

const tutorials = [
  {
    title: 'Cycling',
    description: 'Track every mile, own every ride.',
    icon: require('./assets/timer.png'),
    iconColor: '#4CD964',
    iconBg: '#4CD96420',
    navigationTarget: 'CyclingScreen'
  },
  {
    title: 'Read a book',
    description: 'Escape into a new world',
    icon: require('./assets/book.png'),
    iconColor: '#FF9500',
    iconBg: '#FF950020',
    navigationTarget: 'ReadingScreen'
  },
];

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
    route: 'Mode.js', // Updated to Mode.js instead of MyWatch.js
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
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  themeToggle: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  todayLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressCircleContainer: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    position: 'absolute',
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgCircle: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    position: 'relative',
  },
  progressCircle: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    borderRadius: screenWidth * 0.3,
    borderWidth: 8,
    position: 'absolute',
  },
  progressArc: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    borderRadius: screenWidth * 0.3,
    borderWidth: 8,
  },
  progressCenterContent: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  stepsIconContainer: {
    marginBottom: 10,
  },
  stepsIcon: {
    width: 40,
    height: 40,
  },
  stepsCount: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  stepsGoal: {
    fontSize: 14,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
  },
  statSubLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tutorialsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 14,
  },
  tutorialCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderColor: 'yellow',
  },
  tutorialIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  tutorialIcon: {
    width: 24,
    height: 24,
  },
  tutorialTextContainer: {
    flex: 1,
  },
  tutorialTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  tutorialDescription: {
    fontSize: 13,
    marginTop: 4,
  },
  arrow: {
    fontSize: 20,
    fontWeight: '600',
  },
  startButton: {
    paddingVertical: 16,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 30,
    marginTop: 15,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
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
    width: '110%',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});