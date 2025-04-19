import { View, Text } from 'react-native';

const dailyBoosts = [
  "💧 Drink a glass of water!",
  "💪 Do 10 pushups!",
  "🧘 Take 1 minute to breathe.",
  "📵 Stay off social media for 10 min."
];

const getTodayBoost = () => {
  const index = new Date().getDate() % dailyBoosts.length;
  return dailyBoosts[index];
};

const DailyBoostWidget = () => (
  <View style={styles.widget}>
    <Text style={styles.text}>{getTodayBoost()}</Text>
  </View>
);
