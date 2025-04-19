const bonusFeatures = [
  {
    emoji: '📈',
    title: 'Simple Progress Insights',
    description: 'Visualize your daily tracking easily.',
    image: { uri: 'https://via.placeholder.com/300x180.png?text=Progress' },
    route: 'FeatureDetail',
    completion: 70,
    chartData: [3, 5, 4, 6, 2, 1, 5]
  },
  {
    emoji: '🧘',
    title: 'Mindful Moments',
    description: 'Take short mindful breaks to reset and focus.',
    image: { uri: 'https://via.placeholder.com/300x180.png?text=Mindful' },
    route: 'MindfulDetail',
    completion: 50,
    chartData: [2, 4, 3, 5, 4, 3, 4]
  },
  {
    emoji: '📵',
    title: 'Digital Detox Time',
    description: 'Log screen-free moments for better clarity.',
    image: { uri: 'https://via.placeholder.com/300x180.png?text=Detox' },
    route: 'DetoxDetail',
    completion: 80,
    chartData: [1, 2, 4, 6, 5, 3, 2]
  }
  <TouchableOpacity onPress={() => navigation.navigate(feature.route, feature)}>
  <Text style={styles.detailLink}>View Detail →</Text>
</TouchableOpacity>

];
