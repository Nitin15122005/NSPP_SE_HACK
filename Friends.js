import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, TextInput } from 'react-native';

export default function Friends({ navigation }) {
  const [darkMode, setDarkMode] = useState(true);
  const [searchText, setSearchText] = useState('');
  
  // Sample friends data
  const [friends, setFriends] = useState([
    { id: 1, name: 'Alex Johnson', status: 'Active now' },
    { id: 2, name: 'Sam Wilson', status: 'Active 2h ago' },
    { id: 3, name: 'Taylor Swift', status: 'Active 1d ago' },
  ]);
  
  const [invites, setInvites] = useState([
    { id: 4, name: 'Jamie Lee', mutualFriends: 3 },
    { id: 5, name: 'Chris Evans', mutualFriends: 5 },
  ]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Theme colors
  const theme = darkMode ? darkTheme : lightTheme;

  const handleViewAnalysis = (friendId) => {
    navigation.navigate('FriendAnalysis', { friendId });
  };

  const handleAcceptInvite = (inviteId) => {
    const acceptedInvite = invites.find(invite => invite.id === inviteId);
    setFriends([...friends, { id: acceptedInvite.id, name: acceptedInvite.name, status: 'New friend' }]);
    setInvites(invites.filter(invite => invite.id !== inviteId));
  };

  const handleDeclineInvite = (inviteId) => {
    setInvites(invites.filter(invite => invite.id !== inviteId));
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
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.analysisButton, { backgroundColor: theme.accent }]}
                onPress={() => handleViewAnalysis(friend.id)}
              >
                <Text style={styles.buttonText}>View Analysis</Text>
              </TouchableOpacity>
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
      </ScrollView>
    </SafeAreaView>
  );
}

// Theme Configuration (consistent with Home.js)
const darkTheme = {
  background: '#000000',
  cardBackground: '#1C1C1E',
  text: '#FFFFFF',
  secondaryText: '#8E8E93',
  accent: '#4CD964', // Green accent color
  accentText: '#FFFFFF',
};

const lightTheme = {
  background: '#F2F2F7',
  cardBackground: '#FFFFFF',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  inviteCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  friendText: {
    justifyContent: 'center',
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
  },
  friendStatus: {
    fontSize: 13,
    marginTop: 4,
  },
  analysisButton: {
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