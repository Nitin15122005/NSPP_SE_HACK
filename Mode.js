import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Image,
  Animated,
  Easing,
  Dimensions,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ConfettiCannon from 'react-native-confetti-cannon';

const { width, height } = Dimensions.get('window');

export default function ActionMode() {
  // STATE
  const [progress, setProgress] = useState(82);
  const [isChallengeActive, setIsChallengeActive] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [activeActivity, setActiveActivity] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [comboCount, setComboCount] = useState(0);
  const [streakDays, setStreakDays] = useState(7);
  
  // ANIMATIONS
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // CHALLENGES DATA
  const challenges = [
    {
      id: 1,
      title: "⚡ LIGHTNING ROUND ⚡",
      task: "20 PUSH-UPS IN 30 SEC!",
      reward: "+200 XP • STREAK SHIELD",
      color: ['#FFD700', '#FFA500'],
      duration: 30,
      difficulty: "HARD"
    },
    {
      id: 2,
      title: "🔥 INFERNO CHALLENGE 🔥",
      task: "HOLD PLANK FOR 60 SECONDS",
      reward: "+300 XP • FLAME BADGE",
      color: ['#FF8C00', '#FF4500'],
      duration: 60,
      difficulty: "EXTREME"
    }
  ];

  // ACTIVITIES
  const activities = [
    { 
      id: 1, 
      title: 'POWER LIFTS', 
      icon: '🏋',
      color: '#FFD700',
      duration: 45,
      xp: 150
    },
    { 
      id: 2, 
      title: 'SPRINT DRILLS', 
      icon: '🏃',
      color: '#FFD700',
      duration: 30,
      xp: 120
    },
    { 
      id: 3, 
      title: 'BOXING COMBO', 
      icon: '🥊',
      color: '#FFD700',
      duration: 60,
      xp: 200
    }
  ];

  // GLOW ANIMATION
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: false
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: false
        })
      ])
    ).start();
  }, []);

  // START CHALLENGE
  const startChallenge = () => {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setCurrentChallenge(randomChallenge);
    setIsChallengeActive(true);
    setTimeLeft(randomChallenge.duration);
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { 
          toValue: 1.3, 
          duration: 500,
          useNativeDriver: true 
        }),
        Animated.timing(pulseAnim, { 
          toValue: 1, 
          duration: 500,
          useNativeDriver: true 
        })
      ])
    ).start();
  };

  // TIMER EFFECT
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && activeActivity) {
      completeActivity();
    }
  }, [timeLeft]);

  // COMPLETE ACTIVITY
  const completeActivity = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setActiveActivity(null);
      setShowConfetti(false);
      setStreakDays(streakDays + 1);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* YELLOW HEADER BANNER */}
      <View style={styles.headerBanner}>
        <Text style={styles.headerTitle}>BEAST MODE ACTIVATED</Text>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.content}>
        {activeActivity ? (
          // FULLSCREEN TIMER MODE
          <Animated.View style={[
            styles.fullscreenTimer,
            { transform: [{ translateX: shakeAnim }] }
          ]}>
            <Text style={styles.timerText}>{timeLeft}</Text>
            <Text style={styles.activityTitle}>{activeActivity.title}</Text>
            <View style={styles.xpBadge}>
              <Text style={styles.xpText}>+{activeActivity.xp} XP</Text>
            </View>
          </Animated.View>
        ) : (
          // DEFAULT VIEW
          <>
            {/* PROGRESS CIRCLE WITH GLOW */}
            <View style={styles.progressContainer}>
              <Animated.View style={[
                styles.progressGlow,
                { 
                  opacity: glowAnim,
                  transform: [{ scale: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2]
                  })}] 
                }
              ]}/>
              <Animated.View style={[
                styles.progressCircle,
                { transform: [{ scale: pulseAnim }] }
              ]}>
                <Text style={styles.progressText}>{progress}%</Text>
                <Text style={styles.progressLabel}>POWER LEVEL</Text>
              </Animated.View>
            </View>

            {/* STREAK DISPLAY */}
            <View style={styles.streakContainer}>
              <Text style={styles.streakText}>🔥 {streakDays}-DAY STREAK</Text>
              <View style={styles.streakProgress}>
                <View style={[styles.streakProgressFill, { width: `${(streakDays % 7) * 14}%` }]}/>
              </View>
            </View>

            {/* CHALLENGE POPUP */}
            {isChallengeActive && (
              <View style={styles.challengeCard}>
                <LinearGradient
                  colors={currentChallenge.color}
                  style={styles.challengeGradient}
                >
                  <Text style={styles.challengeDifficulty}>
                    {currentChallenge.difficulty}
                  </Text>
                  <Text style={styles.challengeTitle}>{currentChallenge.title}</Text>
                  <Text style={styles.challengeTask}>{currentChallenge.task}</Text>
                  
                  <View style={styles.timerContainer}>
                    <View style={styles.timerCircle}>
                      <Text style={styles.timerText}>{timeLeft}s</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.challengeReward}>{currentChallenge.reward}</Text>
                </LinearGradient>
              </View>
            )}

            {/* ACTIVITIES LIST */}
            <ScrollView 
              style={styles.activitiesContainer}
              showsVerticalScrollIndicator={false}
            >
              {activities.map(activity => (
                <TouchableOpacity
                  key={activity.id}
                  style={[
                    styles.activityButton,
                    { borderColor: activity.color }
                  ]}
                  onPress={() => {
                    setActiveActivity(activity);
                    setTimeLeft(activity.duration);
                    setComboCount(comboCount + 1);
                  }}
                >
                  <Text style={styles.activityIcon}>{activity.icon}</Text>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityName}>{activity.title}</Text>
                    <Text style={styles.activityXp}>+{activity.xp} XP</Text>
                  </View>
                  <Text style={styles.activityDuration}>{activity.duration}s</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* CHALLENGE BUTTON */}
            <TouchableOpacity 
              style={styles.challengeButton}
              onPress={startChallenge}
            >
              <LinearGradient
                colors={['#FFD700', '#FFA500']}
                style={styles.challengeButtonGradient}
              >
                <Text style={styles.challengeButtonText}>⚡ ACTIVATE CHALLENGE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </View>

            {/* CONFETTI */}
      {showConfetti && (
        <ConfettiCannon 
          count={300}
          origin={{ x: width / 2, y: 0 }}
          colors={['#FFD700', '#FFA500', '#FFFFFF']}
          fadeOut={true}
        />
      )}

      {/* BOTTOM COMBO COUNTER */}
      <Animated.View style={[
        styles.comboContainer,
        { transform: [{ scale: comboCount > 0 ? 1.1 : 1 }] }
      ]}>
        <Text style={styles.comboText}>COMBO: {comboCount}x</Text>
      </Animated.View>
    </SafeAreaView>
  );
}


// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerBanner: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FFA500',
  },
  headerTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  progressGlow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
  },
  progressCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  progressText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  progressLabel: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 5,
    letterSpacing: 1,
  },
  streakContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  streakText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  streakProgress: {
    height: 6,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  streakProgressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  challengeCard: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  challengeGradient: {
    padding: 20,
  },
  challengeDifficulty: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  challengeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
  },
  challengeTask: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  timerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  challengeReward: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  activitiesContainer: {
    flex: 1,
    marginBottom: 15,
  },
  activityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderLeftWidth: 5,
  },
  activityIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityXp: {
    color: 'rgba(255, 215, 0, 0.7)',
    fontSize: 12,
    marginTop: 3,
  },
  activityDuration: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
  },
  challengeButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  challengeButtonGradient: {
    padding: 18,
    alignItems: 'center',
  },
  challengeButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  fullscreenTimer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  timerText: {
    fontSize: 120,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  activityTitle: {
    fontSize: 36,
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 20,
    textTransform: 'uppercase',
  },
  xpBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  xpText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 18,
  },
  comboContainer: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#FFA500',
  },
  comboText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});