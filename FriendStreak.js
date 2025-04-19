const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F4FC', // Light color background
  },
  animatedTitle: {
    position: 'absolute',
    top: 30,
    fontSize: 28,
    fontWeight: 'bold',
  },
  contentWrapper: {
    marginTop: 160,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light background for content area
    paddingVertical: 30,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  modeButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  modeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#95A5A6',
  },
  modeButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#FFE066',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
    marginTop: 20,
  },
  suggestionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  suggestionBox: {
    backgroundColor: '#EAF7FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  suggestionText: {
    fontSize: 16,
    color: '#34495E',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  choiceText: {
    fontSize: 15,
    color: '#2C3E50',
  },
  streakBox: {
    backgroundColor: '#F0E68C',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '700',
  },
  friendChoiceText: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 10,
    marginTop: 20,
  },
  friendChoiceButton: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 16, // Completed the paddingHorizontal here
    borderRadius: 10,
    marginVertical: 4,
    width: '100%',
    alignItems: 'center',
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
});
