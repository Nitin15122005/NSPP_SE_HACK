import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = () => {
    if (!username || !password || !email || password !== confirm) {
      Alert.alert('Oops!', 'Please fill out all fields correctly.');
    } else {
      Alert.alert('✅ Signed up!', `Welcome, ${username}!`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Rick_and_Morty_season_5.png/220px-Rick_and_Morty_season_5.png',
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Rick & Morty</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.verifyBox}>
          <Ionicons name="checkbox-outline" size={20} color="#aaa" />
          <Text style={styles.verifyText}>Verify you are human</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.signInText}>
          Have an account? <Text style={styles.link}>Sign In</Text>
        </Text>

        <Text style={styles.socialText}>or you can sign in with</Text>
        <View style={styles.socialIcons}>
          <Ionicons name="logo-google" size={24} color="#666" />
          <Ionicons name="logo-github" size={24} color="#666" style={{ marginHorizontal: 20 }} />
          <Ionicons name="logo-facebook" size={24} color="#666" />
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#f0f4f8', // soft light blue background
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '85%',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  verifyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  verifyText: {
    marginLeft: 10,
    color: '#555',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3a6073',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signInText: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    color: '#3a6073',
    fontWeight: '600',
  },
  socialText: {
    marginTop: 20,
    color: '#888',
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
