import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, TextInput } from 'react-native';

export default function Friends({ navigation }) {
  const [darkMode, setDarkMode] = useState(true);
  const [searchText, setSearchText] = useState('');
  
  // Sample user habits
  const [myHabits, setMyHabits] = useState([
    { id: 1, name: 'Morning Run', frequency: 'daily' },
    { id: 2, name: 'Meditation', frequency: 'daily' },
    { id: 3, name: 'Reading', frequency: 'daily' },
  ]);
  
  // Sample friends data with habits and streak information
  const [friends, setFriends] = useState([
    { 
      id: 1, 
      name: 'Alex Johnson', 
      status: 'Active now',
      habits: [
        { id: 1, name: 'Morning Run', lastCompleted: new Date() },
        { id: 3, name: 'Reading', lastCompleted: new Date() }
      ],
      streak: 3,
      friendshipPoints: 120
    },
    { 
      id: 2, 
      name: 'Sam Wilson', 
      status: 'Active 2h ago',
      habits: [
        { id: 2, name: 'Meditation', lastCompleted: new Date() }
      ],
      streak: 1,
      friendshipPoints: 75
    },
    { 
      id: 3, 
      name: 'Taylor Swift', 
      status: 'Active 1d ago',
      habits: [
        { id: 3, name: 'Reading', lastCompleted: new Date(Date.now() - 86400000) }
      ],
      streak: 0,
      friendshipPoints: 50
    },
  ]);
  
  const [invites, setInvites] = useState([
    { id: 4, name: 'Jamie Lee', mutualFriends: 3 },
    { id: 5, name: 'Chris Evans', mutualFriends: 5 },
  ]);

  // Recommendations based on habits and friendship points
  const [recommendations, setRecommendations] = useState([
    { 
      id: 6, 
      name: 'Emma Stone', 
      habits: ['Morning Run', 'Yoga'],
      compatibilityScore: '85%'
    },
    { 
      id: 7, 
      name: 'Michael Jordan', 
      habits: ['Morning Run', 'Basketball'],
      compatibilityScore: '70%'
    },
  ]);

  // Check for habit matches and update streaks
  useEffect(() => {
    const checkHabitMatches = () => {
      const updatedFriends = friends.map(friend => {
        // Check if any habits match with user's habits
        const matchingHabits = friend.habits.filter(habit => 
          myHabits.some(myHabit => myHabit.name === habit.name)
        );
        
        // If habits match and were completed today
        const todayMatches = matchingHabits.filter(habit => 
          isToday(new Date(habit.lastCompleted))
        ).length;
        
        let newStreak = friend.streak;
        let newPoints = friend.friendshipPoints;
        
        if (todayMatches > 0) {
          // Increase streak if habits match today
          newStreak += 1;
          // Add points based on streak
          newPoints += (10 * newStreak);
        } else {
          // Reset streak if no matches today
          newStreak = 0;
        }
        
        return {
          ...friend,
          streak: newStreak,
          friendshipPoints: newPoints
        };
      });
      
      setFriends(updatedFriends);
    };
    
    // Run once when component mounts
    checkHabitMatches();
    
    // Set up interval to check regularly (e.g., once a day)
    const interval = setInterval(checkHabitMatches, 86400000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Theme colors
  const theme = darkMode ? darkTheme : lightTheme;

  const handleViewAnalysis = (friendId) => {
    navigation.navigate('FriendAnalysis', { friendId });
  };

  const handleViewHabitDetails = (friendId) => {
    navigation.navigate('HabitDetails', { friendId });
  };

  const handleAcceptInvite = (inviteId) => {
    const acceptedInvite = invites.find(invite => invite.id === inviteId);
    setFriends([...friends, { 
      id: acceptedInvite.id, 
      name: acceptedInvite.name, 
      status: 'New friend',
      habits: [],
      streak: 0,
      friendshipPoints: 10
    }]);
    setInvites(invites.filter(invite => invite.id !== inviteId));
  };

  const handleDeclineInvite = (inviteId) => {
    setInvites(invites.filter(invite => invite.id !== inviteId));
  };

  const handleAddRecommended = (recommendedId) => {
    const recommendedFriend = recommendations.find(rec => rec.id === recommendedId);
    setFriends([...friends, { 
      id: recommendedFriend.id, 
      name: recommendedFriend.name, 
      status: 'New friend',
      habits: recommendedFriend.habits.map(habit => ({ 
        id: Math.random(), 
        name: habit,
        lastCompleted: new Date()
      })),
      streak: 0,
      friendshipPoints: 10
    }]);
    setRecommendations(recommendations.filter(rec => rec.id !== recommendedId));
  };

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Friends</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('./assets/close.png')} style={[styles.closeIcon, { tintColor: theme.text }]} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
          <Text style={{ color: theme.accentText }}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.cardBackground }]}>
        <Image source={require('./assets/search.png')} style={[styles.searchIcon, { tintColor: theme.secondaryText }]} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search members..."
          placeholderTextColor={theme.secondaryText}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Friends Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Friends</Text>
        
        {filteredFriends.length > 0 ? (
          filteredFriends.map(friend => (
            <View key={friend.id} style={[styles.friendCard, { backgroundColor: theme.cardBackground }]}>
              <TouchableOpacity 
                style={styles.friendInfo}
                onPress={() => navigation.navigate('Home')}
              >
                <Image source={require('./assets/profile.png')} style={styles.profileImage} />
                <View style={styles.friendText}>
                  <Text style={[styles.friendName, { color: theme.text }]}>{friend.name}</Text>
                  <Text style={[styles.friendStatus, { color: theme.secondaryText }]}>{friend.status}</Text>
                  
                  {/* Habit match and streak information */}
                  <View style={styles.habitInfo}>
                    <View style={styles.streakContainer}>
                      <Text style={[styles.streakText, { color: theme.accent }]}>
                        {friend.streak > 0 ? `🔥 ${friend.streak} day streak` : 'No active streak'}
                      </Text>
                    </View>
                    <Text style={[styles.pointsText, { color: theme.secondaryText }]}>
                      {friend.friendshipPoints} points
                    </Text>
                  </View>
                  
                  {/* Show matching habits */}
                  {friend.habits.length > 0 && (
                    <View style={styles.habitsContainer}>
                      <Text style={[styles.habitLabel, { color: theme.secondaryText }]}>
                        Shared habits: {friend.habits.map(h => h.name).join(', ')}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.habitButton, { backgroundColor: theme.secondaryBackground }]}
                  onPress={() => handleViewHabitDetails(friend.id)}
                >
                  <Text style={[styles.buttonText, { color: theme.text }]}>Habits</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.analysisButton, { backgroundColor: theme.accent }]}
                  onPress={() => handleViewAnalysis(friend.id)}
                >
                  <Text style={styles.buttonText}>Analysis</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={[styles.noResults, { color: theme.secondaryText }]}>No friends found</Text>
        )}

        {/* Invites Section */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 30 }]}>Invites</Text>
        
        {invites.length > 0 ? (
          invites.map(invite => (
            <View key={invite.id} style={[styles.inviteCard, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.friendInfo}>
                <Image source={require('./assets/profile.png')} style={styles.profileImage} />
                <View style={styles.friendText}>
                  <Text style={[styles.friendName, { color: theme.text }]}>{invite.name}</Text>
                  <Text style={[styles.friendStatus, { color: theme.secondaryText }]}>{invite.mutualFriends} mutual friends</Text>
                </View>
              </View>
              <View style={styles.inviteButtons}>
                <TouchableOpacity 
                  style={[styles.declineButton, { backgroundColor: theme.cardBackground, borderColor: theme.secondaryText }]}
                  onPress={() => handleDeclineInvite(invite.id)}
                >
                  <Text style={[styles.declineText, { color: theme.text }]}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.acceptButton, { backgroundColor: theme.accent }]}
                  onPress={() => handleAcceptInvite(invite.id)}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={[styles.noResults, { color: theme.secondaryText }]}>No pending invites</Text>
        )}

        {/* Recommendations Section - NEW */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 30 }]}>Recommended Friends</Text>
        
        {recommendations.length > 0 ? (
          recommendations.map(recommendation => (
            <View key={recommendation.id} style={[styles.recommendationCard, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.friendInfo}>
                <Image source={require('./assets/profile.png')} style={styles.profileImage} />
                <View style={styles.friendText}>
                  <Text style={[styles.friendName, { color: theme.text }]}>{recommendation.name}</Text>
                  <Text style={[styles.compatibilityScore, { color: theme.accent }]}>
                    {recommendation.compatibilityScore} habit compatibility
                  </Text>
                  <Text style={[styles.friendStatus, { color: theme.secondaryText }]}>
                    Shares habits: {recommendation.habits.join(', ')}
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                style={[styles.addButton, { backgroundColor: theme.accent }]}
                onPress={() => handleAddRecommended(recommendation.id)}
              >
                <Text style={styles.buttonText}>Add Friend</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={[styles.noResults, { color: theme.secondaryText }]}>No recommendations available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Theme Configuration (consistent with Home.js)
const darkTheme = {
  background: '#000000',
  cardBackground: '#1C1C1E',
  secondaryBackground: '#2C2C2E',
  text: '#FFFFFF',
  secondaryText: '#8E8E93',
  accent: '#4CD964', // Green accent color
  accentText: '#FFFFFF',
};

const lightTheme = {
  background: '#F2F2F7',
  cardBackground: '#FFFFFF',
  secondaryBackground: '#E5E5EA',
  text: '#000000',
  secondaryText: '#6C6C70',
  accent: '#4CD964', // Green accent color
  accentText: '#000000',
};

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
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  themeToggle: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  friendCard: {
    flexDirection: 'column',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  inviteCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  recommendationCard: {
    flexDirection: 'column',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  friendText: {
    flex: 1,
    justifyContent: 'center',
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
  },
  friendStatus: {
    fontSize: 13,
    marginTop: 2,
  },
  habitInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  streakText: {
    fontSize: 13,
    fontWeight: '600',
  },
  pointsText: {
    fontSize: 13,
  },
  habitsContainer: {
    marginTop: 4,
  },
  habitLabel: {
    fontSize: 12,
  },
  compatibilityScore: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  analysisButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  habitButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  inviteButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  acceptButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  declineButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  addButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  declineText: {
    fontSize: 14,
    fontWeight: '600',
  },
  noResults: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
  },
});