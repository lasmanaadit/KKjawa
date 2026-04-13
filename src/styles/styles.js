import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    padding: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
  },

  subtitle: {
    color: '#7f8c8d',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#34495e',
  },

  selectedBox: {
    backgroundColor: '#dfe6e9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  selectedText: {
    fontWeight: 'bold',
    color: '#2d3436',
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 4,
  },

  cardImage: {
    width: '100%',
    height: 180,
  },

  cardContent: {
    padding: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },

  cardAuthor: {
    color: '#7f8c8d',
  },

  horizontalCard: {
    marginRight: 15,
  },

  horizontalImage: {
    width: 140,
    height: 100,
    borderRadius: 12,
  },

  horizontalText: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '600',
    color: '#2c3e50',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  
  navButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  // Style untuk DetailScreen
  detailContainer: {
    padding: 15,
  },
  
  detailImage: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 15,
  },
  
  detailContent: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  
  detailAuthor: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  
  detailDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#34495e',
    marginBottom: 20,
  },
  
  infoBox: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#34495e',
  },
  
  backButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // Style untuk AboutScreen
  aboutContainer: {
    padding: 15,
  },
  
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  
  aboutCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  
  aboutSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',
  },
  
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#34495e',
    marginBottom: 5,
  },
  
  // Style untuk ProfileScreen
  profileContainer: {
    padding: 15,
  },
  
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  
  inputGroup: {
    marginBottom: 15,
  },
  
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  
  saveButton: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  resetButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  profilePreview: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  
  previewText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#34495e',
  },
  // di dalam styles.js, tambahkan:
detailImage: {
  width: '100%',
  height: 250,
  borderRadius: 12,
  marginBottom: 16,
},
detailContent: {
  paddingHorizontal: 8,
},
detailTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#2c3e50',
  marginBottom: 6,
},
detailAuthor: {
  fontSize: 16,
  color: '#7f8c8d',
  marginBottom: 16,
},
detailDescription: {
  fontSize: 15,
  lineHeight: 22,
  color: '#2d3436',
  textAlign: 'justify',
},
favoriteButton: {
  backgroundColor: '#e17055',
  paddingVertical: 12,
  borderRadius: 25,
  alignItems: 'center',
  marginTop: 20,
},
favoriteButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
},
});