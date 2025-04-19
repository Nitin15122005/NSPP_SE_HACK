import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      {/* Text Greeting */}
      <Text style={styles.title1}>Rick&Morty</Text>
      
      <Image
        source={require('./assets/rickmorty2.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.message}>Rick&Morty isn’t just a habit tracker. It’s a mindset shifter. Track your way—chill or charged. Your habits, your vibe.</Text>
      <Text style={styles.title}>Ready to build habits</Text>
      <Text style={styles.subtitle}>that match your vibe?</Text>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('Mode')}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Wavy Background at Bottom */}
      <Image
        source={require('./assets/wave1.png')}
        style={styles.wave}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F4FC',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  greeting: {
    fontSize: 20,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  title1: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2C3E50',
    paddingBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '400',
    color: '#4B5563',
    marginBottom: 24,
  },
  message: {
    fontSize: 18,
    fontWeight: '200',
    color: '#2C3E50',
    paddingBottom: 16,
    fontFamily: 'Montserrat-Regular',
  },
  continueButton: {
    backgroundColor: '#FFE066',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 2,
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '600',
  },
  image: {
    bottom: 0,
    width: screenWidth,
    height: 400,
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    height: 120,
  },
});
