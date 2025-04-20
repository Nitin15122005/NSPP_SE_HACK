import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  Image,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Activity({ navigation, route }) {
  // Get dark mode from route params if available, otherwise default to true
  const [darkMode, setDarkMode] = useState(route.params?.darkMode || true);
  const [activityName, setActivityName] = useState('');
  const [duration, setDuration] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [activeTab, setActiveTab] = useState('Activity');
  
  // For progress circle (to avoid the 'progress' property error)
  const [progress, setProgress] = useState(0);
  
  // Theme colors
  const theme = darkMode ? darkTheme : lightTheme;
  
  // Update parent screen's dark mode if this changes
  useEffect(() => {
    navigation.setParams({ darkMode: darkMode });
  }, [darkMode]);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  // Fixed handleTabPress function
  const handleTabPress = (tab) => {
    setActiveTab(tab);
    
    // Navigation based on tab selection
    switch(tab) {
      case 'Home':
        navigation.navigate('Home', { darkMode });
        break;
      case 'Analysis':
        navigation.navigate('Analysis', { darkMode });
        break;
      case 'Activity':
        // Stay on current screen
        break;
      case 'Action Mode':
        navigation.navigate('Mode', { darkMode });
        break;
      case 'Friends':
        navigation.navigate('Friends', { darkMode });
        break;
      default:
        // Default case to handle any undefined tabs
        break;
    }
  };
  
  const saveActivity = () => {
    // Validate inputs
    if (!activityName.trim()) {
      Alert.alert('Error', 'Please enter an activity name');
      return;
    }
    
    if (!duration.trim()) {
      Alert.alert('Error', 'Please enter a duration');
      return;
    }
    
    // Create activity object with all necessary properties
    const newActivity = {
      title: activityName,
      description: `${duration} mins • ${priority} priority`,
      icon: require('./assets/timer.png'), // Default icon - you can customize this
      iconColor: getPriorityColor(priority),
      iconBg: `${getPriorityColor(priority)}20`,
      navigationTarget: 'ActivityDetail',
      duration: duration,
      priority: priority,
      progress: 0 // Add default progress to fix the 'progress' property issue
    };
    
    // Navigate back to home with the new activity
    navigation.navigate('Home', { 
      newActivity: newActivity,
      darkMode: darkMode
    });
  };
  
  // Function to get color based on priority
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High':
        return '#FF375F'; // Red
      case 'Medium':
        return '#FF9500'; // Orange
      case 'Low':
        return '#4CD964'; // Green
      default:
        return '#4CD964';
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header with Theme Toggle */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={[styles.backButton, { color: theme.accent }]}>← Back</Text>
            </TouchableOpacity>
            <Text style={[styles.greeting, { color: theme.text }]}>Add Activity</Text>
            <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
              <Text style={{ color: theme.accentText }}>
                {darkMode ? '☀️ Calm' : '🌙 Action'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Container */}
        <View style={[styles.formContainer, { backgroundColor: theme.cardBackground }]}>
          {/* Activity Name */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Activity Name</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: darkMode ? '#2C2C2E' : '#F2F2F7',
                color: theme.text,
                borderColor: theme.progressBg
              }]}
              placeholder="Enter activity name"
              placeholderTextColor={theme.secondaryText}
              value={activityName}
              onChangeText={setActivityName}
            />
          </View>
          
          {/* Duration */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Duration (minutes)</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: darkMode ? '#2C2C2E' : '#F2F2F7',
                color: theme.text,
                borderColor: theme.progressBg
              }]}
              placeholder="Enter duration in minutes"
              placeholderTextColor={theme.secondaryText}
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
            />
          </View>
          
          {/* Priority */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Priority</Text>
            <View style={[styles.pickerContainer, { 
              backgroundColor: darkMode ? '#2C2C2E' : '#F2F2F7',
              borderColor: theme.progressBg
            }]}>
              <Picker
                selectedValue={priority}
                onValueChange={(itemValue) => setPriority(itemValue)}
                style={{ color: theme.text }}
                dropdownIconColor={theme.text}
              >
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="High" value="High" />
              </Picker>
            </View>
          </View>

          {/* Color Preview */}
          <View style={styles.previewContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Preview</Text>
            <View style={[styles.previewCard, { backgroundColor: theme.background }]}>
              <View style={[styles.tutorialCard, { backgroundColor: theme.cardBackground }]}>
                <View style={[styles.tutorialIconContainer, { backgroundColor: `${getPriorityColor(priority)}20` }]}>
                  <Image 
                    source={require('./assets/timer.png')} 
                    style={styles.tutorialIcon} 
                    tintColor={getPriorityColor(priority)}
                  />
                </View>
                <View style={styles.tutorialTextContainer}>
                  <Text style={[styles.tutorialTitle, { color: theme.text }]}>
                    {activityName || 'Activity Name'}
                  </Text>
                  <Text style={[styles.tutorialDescription, { color: theme.secondaryText }]}>
                    {`${duration || '0'} mins • ${priority} priority`}
                  </Text>
                </View>
                <Text style={[styles.arrow, { color: theme.accent }]}>{'>'}</Text>
              </View>
            </View>
          </View>

          {/* Progress Preview (to ensure progress is defined) */}
          <View style={styles.progressPreviewContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Initial Progress</Text>
            <View style={styles.progressSliderContainer}>
              <Text style={{ color: theme.secondaryText }}>0%</Text>
              <View style={[styles.progressBar, { backgroundColor: theme.progressBg }]}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { 
                      backgroundColor: theme.accent,
                      width: `${progress}%` 
                    }
                  ]} 
                />
              </View>
              <Text style={{ color: theme.secondaryText }}>100%</Text>
            </View>
            <Text style={[styles.progressNote, { color: theme.secondaryText }]}>
              New activities start at 0% progress
            </Text>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: theme.accent }]}
            onPress={saveActivity}
          >
            <Text style={styles.buttonText}>Save Activity</Text>
          </TouchableOpacity>
        </View>
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

// Theme Configuration (same as Home.js)
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
    marginTop: 20,
    marginBottom: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
  },
  themeToggle: {
    marginTop: 5,
  },
  formContainer: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  pickerContainer: {
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  previewContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  previewCard: {
    padding: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  tutorialCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
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
  progressPreviewContainer: {
    marginBottom: 20,
  },
  progressSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    flex: 1,
    borderRadius: 3,
    marginHorizontal: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressNote: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  saveButton: {
    paddingVertical: 16,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 30,
    marginTop: 10,
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