import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function Login({ navigation }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleAuth = () => {
    // Here you would implement actual authentication
    // For now, just navigate to Home
    navigation.navigate('Home');
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    // Clear fields when switching modes
    setEmail('');
    setPassword('');
    setUsername('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        {/* Logo and Title */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('./assets/target.png')} 
            style={styles.logo}
            tintColor="#4CD964"
          />
          <Text style={styles.appTitle}>Rick & Morty</Text>
          <Text style={styles.appSubtitle}>Habit Tracker</Text>
        </View>

        {/* Toggle between Sign In and Sign Up */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, isSignIn ? styles.activeToggle : {}]}
            onPress={() => setIsSignIn(true)}
          >
            <Text style={[styles.toggleText, isSignIn ? styles.activeToggleText : {}]}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, !isSignIn ? styles.activeToggle : {}]}
            onPress={() => setIsSignIn(false)}
          >
            <Text style={[styles.toggleText, !isSignIn ? styles.activeToggleText : {}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {!isSignIn && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#8E8E93"
                value={username}
                onChangeText={setUsername}
              />
            </View>
          )}
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#8E8E93"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#8E8E93"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {isSignIn && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Main Auth Button */}
        <TouchableOpacity 
          style={styles.authButton} 
          onPress={handleAuth}
        >
          <Text style={styles.authButtonText}>
            {isSignIn ? 'Sign In' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('./assets/google.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('./assets/facebook.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('./assets/microsoft.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Terms Text */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 24,
  },
  keyboardAvoidView: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#4CD964',
    borderRadius: 8,
  },
  toggleText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
  activeToggleText: {
    color: '#000000',
    fontWeight: '600',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#FFFFFF',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    color: '#FFFFFF',
    padding: 16,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#4CD964',
    fontSize: 14,
  },
  authButton: {
    backgroundColor: '#4CD964',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  authButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333',
  },
  dividerText: {
    color: '#8E8E93',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  termsText: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 12,
    lineHeight: 18,
  },
  linkText: {
    color: '#4CD964',
  },
});