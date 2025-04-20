import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Profile({ navigation }) {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('Scores');
  const [periodTab, setPeriodTab] = useState('This week');

  // Theme colors
  const theme = darkMode ? darkTheme : lightTheme;
  
  // Profile data
  const userData = {
    name: 'Amjad Khan',
    designation: 'Earth 🌎 | Productivity',
    score: 94,
    date: '25 July, 2021',
  };

  // Progress data
  const score = 94; // Score percentage
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };
  
  const handlePeriodPress = (period) => {
    setPeriodTab(period);
  };

  // Bottom tabs (reused from Home.js)
  const handleBottomTabPress = (tab) => {
    // Navigation based on tab selection
    switch(tab) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'Analysis':
        navigation.navigate('Analysis');
        break;
      case 'Activity':
        navigation.navigate('Activity');
        break;
      case 'Action Mode':
        navigation.navigate('Mode');
        break;
      case 'Friends':
        navigation.navigate('Profile');
        break;
    }
  };

  // Calendar data
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const currentDay = 25;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header with back button and settings */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.backButton, { color: theme.text }]}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Image source={require('./assets/settings.png')} style={[styles.settingsIcon, { tintColor: theme.text }]} />
          </TouchableOpacity>
        </View>

        {/* Profile Info Section */}
        <View style={styles.profileSection}>
          <Image 
            source={require('./assets/profile.png')} 
            style={styles.profileImage} 
          />
          <Text style={[styles.profileName, { color: theme.text }]}>{userData.name}</Text>
          <Text style={[styles.profileDesignation, { color: theme.secondaryText }]}>{userData.designation}</Text>
          
          {/* Date Display */}
          <View style={styles.dateContainer}>
            <Text style={[styles.dateText, { color: theme.secondaryText }]}>{userData.date}</Text>
            <TouchableOpacity>
              <Image source={require('./assets/calendar.png')} style={[styles.miniCalendarIcon, { tintColor: theme.secondaryText }]} />
            </TouchableOpacity>
          </View>

          {/* Calendar Week View */}
          <View style={styles.weekCalendar}>
            {days.map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <Text style={[styles.dayLabel, { color: theme.secondaryText }]}>{day}</Text>
                <View 
                  style={[
                    styles.dayCircle, 
                    index === 0 && { backgroundColor: theme.accent, opacity: 0.2 }, 
                    index === 0 && styles.currentDayCircle
                  ]}
                >
                  <Text 
                    style={[
                      styles.dayNumber, 
                      { color: index === 0 ? theme.accent : theme.secondaryText },
                      index === 0 && styles.currentDayText
                    ]}
                  >
                    {index + 23}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          
          {/* Mood/Mode Section */}
          <View style={styles.moodSection}>
            <Text style={[styles.moodLabel, { color: theme.text }]}>Mode</Text>
            <View style={styles.moodIcons}>
              <View style={[styles.moodIconContainer, { backgroundColor: '#FFD60A20' }]}>
                <Text style={styles.moodEmoji}>😊</Text>
              </View>
              <View style={[styles.moodIconContainer, { backgroundColor: '#FF950020' }]}>
                <Text style={styles.moodEmoji}>😋</Text>
              </View>
              <View style={[styles.moodIconContainer, { backgroundColor: '#FF375F20' }]}>
                <Text style={styles.moodEmoji}>🤩</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Tab Selection */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Scores' && styles.activeTab]} 
            onPress={() => handleTabPress('Scores')}
          >
            <Text style={[
              styles.tabText, 
              { color: activeTab === 'Scores' ? theme.accent : theme.secondaryText }
            ]}>Scores</Text>
            {activeTab === 'Scores' && <View style={[styles.activeTabIndicator, { backgroundColor: theme.accent }]} />}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Habits' && styles.activeTab]} 
            onPress={() => handleTabPress('Habits')}
          >
            <Text style={[
              styles.tabText, 
              { color: activeTab === 'Habits' ? theme.accent : theme.secondaryText }
            ]}>Habits</Text>
            {activeTab === 'Habits' && <View style={[styles.activeTabIndicator, { backgroundColor: theme.accent }]} />}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Challenges' && styles.activeTab]} 
            onPress={() => handleTabPress('Challenges')}
          >
            <Text style={[
              styles.tabText, 
              { color: activeTab === 'Challenges' ? theme.accent : theme.secondaryText }
            ]}>Challenges</Text>
            {activeTab === 'Challenges' && <View style={[styles.activeTabIndicator, { backgroundColor: theme.accent }]} />}
          </TouchableOpacity>
        </View>

        {/* Period Selection */}
        <View style={styles.periodContainer}>
          <TouchableOpacity 
            style={[styles.periodTab, periodTab === 'Today' && styles.activePeriodTab]} 
            onPress={() => setPeriodTab('Today')}
          >
            <Text style={[
              styles.periodText, 
              { color: periodTab === 'Today' ? theme.text : theme.secondaryText }
            ]}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.periodTab, periodTab === 'This week' && styles.activePeriodTab]} 
            onPress={() => setPeriodTab('This week')}
          >
            <Text style={[
              styles.periodText, 
              { color: periodTab === 'This week' ? theme.text : theme.secondaryText }
            ]}>This week</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.periodTab, periodTab === 'This month' && styles.activePeriodTab]} 
            onPress={() => setPeriodTab('This month')}
          >
            <Text style={[
              styles.periodText, 
              { color: periodTab === 'This month' ? theme.text : theme.secondaryText }
            ]}>This month</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./assets/calendar.png')} style={[styles.calendarIcon, { tintColor: theme.secondaryText }]} />
          </TouchableOpacity>
        </View>

        {/* Content based on Active Tab */}
        {activeTab === 'Scores' && (
          <View style={styles.scoresSection}>
            <View style={styles.scoreHeaderRow}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>SCORES</Text>
              <View style={styles.bestRecordContainer}>
                <View style={[styles.recordDot, { backgroundColor: theme.accent }]} />
                <Text style={[styles.recordText, { color: theme.secondaryText }]}>Best record</Text>
              </View>
            </View>
            
            {/* Progress Circle for Score */}
            <View style={styles.scoreCircleContainer}>
              <View style={[styles.scoreBackgroundCircle, { borderColor: theme.progressBg }]} />
              
              {/* Progress Arc */}
              <View style={styles.progressArcContainer}>
                <View
                  style={[
                    styles.progressArc,
                    {
                      borderColor: theme.accent,
                      borderRightColor: 'transparent',
                      borderBottomColor: 'transparent',
                      transform: [{ rotate: '0deg' }]
                    }
                  ]}
                />
                <View
                  style={[
                    styles.progressArc,
                    {
                      borderColor: theme.accent,
                      borderLeftColor: 'transparent',
                      borderBottomColor: 'transparent',
                      transform: [{ rotate: '90deg' }]
                    }
                  ]}
                />
                <View
                  style={[
                    styles.progressArc,
                    {
                      borderColor: theme.accent,
                      borderLeftColor: 'transparent',
                      borderTopColor: 'transparent',
                      transform: [{ rotate: '180deg' }],
                    }
                  ]}
                />
                <View
                  style={[
                    styles.progressArc,
                    {
                      borderColor: theme.accent,
                      borderRightColor: 'transparent',
                      borderTopColor: 'transparent',
                      transform: [{ rotate: '270deg' }],
                      opacity: score >= 94 ? 1 : 0
                    }
                  ]}
                />
              </View>
              
              {/* Score Text */}
              <View style={styles.scoreTextContainer}>
                <Text style={[styles.scoreValue, { color: theme.text }]}>{score}%</Text>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'Habits' && (
          <View style={styles.habitsSection}>
            <Text style={[styles.habitsTitle, { color: theme.text }]}>My Activities</Text>
            <View style={styles.habitsHeaderRow}>
              <Text style={[styles.habitsSubtitle, { color: theme.secondaryText }]}>All Habits</Text>
              <TouchableOpacity>
                <Text style={[styles.seeAllText, { color: theme.accent }]}>See all</Text>
              </TouchableOpacity>
            </View>
            
            {/* Habit Item */}
            <View style={[styles.habitItem, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.habitIconContainer}>
                <Text style={styles.habitIcon}>🍔</Text>
              </View>
              <View style={styles.habitDetails}>
                <Text style={[styles.habitName, { color: theme.text }]}>Avoid fast food</Text>
                <Text style={[styles.habitStreak, { color: theme.secondaryText }]}>Completed</Text>
              </View>
              <View style={[styles.habitStatusCircle, { borderColor: '#4CD964' }]}>
                <View style={[styles.habitStatusDot, { backgroundColor: '#4CD964' }]} />
              </View>
            </View>
            
            {/* Habit Item */}
            <View style={[styles.habitItem, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.habitIconContainer}>
                <Text style={styles.habitIcon}>🍦</Text>
              </View>
              <View style={styles.habitDetails}>
                <Text style={[styles.habitName, { color: theme.text }]}>Avoid ice cream</Text>
                <Text style={[styles.habitStreak, { color: theme.secondaryText }]}>12 of 21 days</Text>
              </View>
              <View style={[styles.habitStatusCircle, { borderColor: '#FF9500' }]}>
                <View style={[styles.habitStatusIndicator, { backgroundColor: '#FF9500' }]} />
              </View>
            </View>
            
            {/* Add Habit Button */}
            <TouchableOpacity style={[styles.addHabitButton, { backgroundColor: theme.accent }]}>
              <Text style={styles.addHabitText}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'Challenges' && (
          <View style={styles.challengesSection}>
            <Text style={[styles.challengesTitle, { color: theme.text }]}>Active Challenges</Text>
            
            {/* Challenge Item */}
            <View style={[styles.challengeItem, { backgroundColor: theme.cardBackground }]}>
              <View style={[styles.challengeIconCircle, { backgroundColor: '#4CD96420' }]}>
                <Text style={{ fontSize: 24 }}>🏃</Text>
              </View>
              <View style={styles.challengeDetails}>
                <Text style={[styles.challengeName, { color: theme.text }]}>Morning Run</Text>
                <Text style={[styles.challengeDescription, { color: theme.secondaryText }]}>Run 3km every morning</Text>
                <View style={[styles.challengeProgressBar, { backgroundColor: theme.progressBg }]}>
                  <View style={[styles.challengeProgressFill, { width: '65%', backgroundColor: theme.accent }]} />
                </View>
                <Text style={[styles.challengeProgressText, { color: theme.secondaryText }]}>13/20 days</Text>
              </View>
            </View>
            
            {/* Challenge Item */}
            <View style={[styles.challengeItem, { backgroundColor: theme.cardBackground }]}>
              <View style={[styles.challengeIconCircle, { backgroundColor: '#FF950020' }]}>
                <Text style={{ fontSize: 24 }}>📚</Text>
              </View>
              <View style={styles.challengeDetails}>
                <Text style={[styles.challengeName, { color: theme.text }]}>Reading Challenge</Text>
                <Text style={[styles.challengeDescription, { color: theme.secondaryText }]}>Read 30 minutes daily</Text>
                <View style={[styles.challengeProgressBar, { backgroundColor: theme.progressBg }]}>
                  <View style={[styles.challengeProgressFill, { width: '40%', backgroundColor: '#FF9500' }]} />
                </View>
                <Text style={[styles.challengeProgressText, { color: theme.secondaryText }]}>8/20 days</Text>
              </View>
            </View>
            
            {/* Join Challenge Button */}
            <TouchableOpacity style={[styles.joinChallengeButton, { backgroundColor: theme.accent }]}>
              <Text style={styles.joinChallengeText}>Join New Challenge</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={[styles.bottomNav, { backgroundColor: theme.cardBackground }]}>
        {bottomTabs.map((tab) => (
          <TouchableOpacity
            key={tab.label}
            style={styles.navItem}
            onPress={() => handleBottomTabPress(tab.label)}
          >
            <Image
              source={tab.icon}
              style={[
                styles.navIcon,
                { tintColor: tab.label === 'Friends' ? theme.accent : theme.secondaryText }
              ]}
            />
            <Text style={[
              styles.navLabel,
              { 
                color: tab.label === 'Friends' ? theme.accent : theme.secondaryText,
                fontWeight: tab.label === 'Friends' ? '600' : 'normal',
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

const bottomTabs = [
  {
    label: 'Home',
    icon: require('./assets/home.png'),
  },
  {
    label: 'Analysis',
    icon: require('./assets/analysis.png'),
  },
  {
    label: 'Activity',
    icon: require('./assets/plus.png'),
  },
  {
    label: 'Action Mode',
    icon: require('./assets/timer.png'),
  },
  {
    label: 'Friends',
    icon: require('./assets/profile.png'),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  profileDesignation: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 14,
    marginRight: 8,
  },
  miniCalendarIcon: {
    width: 18,
    height: 18,
  },
  weekCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentDayCircle: {
    backgroundColor: '#4CD96420',
  },
  dayNumber: {
    fontSize: 14,
  },
  currentDayText: {
    fontWeight: 'bold',
  },
  moodSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
  },
  moodLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  moodIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  moodIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  moodEmoji: {
    fontSize: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3E3E3E',
  },
  tab: {
    paddingVertical: 15,
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 0,
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '50%',
    borderRadius: 1.5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  periodTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activePeriodTab: {
    backgroundColor: '#2C2C2E',
  },
  periodText: {
    fontSize: 14,
  },
  calendarIcon: {
    width: 20,
    height: 20,
  },
  scoresSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scoreHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bestRecordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  recordText: {
    fontSize: 14,
  },
  scoreCircleContainer: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scoreBackgroundCircle: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    borderRadius: screenWidth * 0.25,
    borderWidth: 10,
    position: 'absolute',
  },
  progressArcContainer: {
    position: 'absolute',
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
  },
  progressArc: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    borderRadius: screenWidth * 0.25,
    borderWidth: 10,
    position: 'absolute',
  },
  scoreTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  habitsSection: {
    paddingHorizontal: 10,
  },
  habitsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  habitsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  habitsSubtitle: {
    fontSize: 16,
  },
  seeAllText: {
    fontSize: 14,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  habitIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#2C2C2E',
  },
  habitIcon: {
    fontSize: 20,
  },
  habitDetails: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  habitStreak: {
    fontSize: 14,
  },
  habitStatusCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  habitStatusIndicator: {
    width: '70%',
    height: 2,
  },
  addHabitButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  addHabitText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  challengesSection: {
    paddingHorizontal: 10,
  },
  challengesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  challengeItem: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  challengeIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  challengeDetails: {
    flex: 1,
  },
  challengeName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  challengeProgressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
    overflow: 'hidden',
  },
  challengeProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  challengeProgressText: {
    fontSize: 12,
  },
  joinChallengeButton: {
    paddingVertical: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  joinChallengeText: {
    fontSize: 16,
    color: 'white',
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