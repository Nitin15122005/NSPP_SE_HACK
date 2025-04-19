import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function Mode({ navigation }) {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleContinue = () => {
    if (selectedMode === 'growth') {
      navigation.navigate('GrowthPage');
    } else if (selectedMode === 'action') {
      navigation.navigate('ActionPage');
    } else {
      alert('Please select a mode first!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🌱 Choose Your Mode ⚡</Text>

      <TouchableOpacity
        style={[
          styles.modeButton,
          selectedMode === 'growth' && styles.selected,
        ]}
        onPress={() => setSelectedMode('growth')}
      >
        <Text style={styles.modeText}>Personal Growth 🌿</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.modeButton,
          selectedMode === 'action' && styles.selected,
        ]}
        onPress={() => setSelectedMode('action')}
      >
        <Text style={styles.modeText}>Action Mode ⚡</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F7FAFC', padding: 24 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 30, color: '#2C3E50' },
  modeButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#C4F1F9',
  },
  modeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  continueButton: {
    marginTop: 40,
    backgroundColor: '#FFE066',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  continueText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
});

