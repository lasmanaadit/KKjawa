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
});