import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  workoutCount: number;
  totalWeight: number;
}

export const ProgressCard: React.FC<Props> = ({
  workoutCount,
  totalWeight,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <View style={styles.row}>
        <View style={styles.statItem}>
          <Text style={styles.number}>{workoutCount}</Text>
          <Text style={styles.label}>Total Workouts</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.number}>{totalWeight.toLocaleString()}</Text>
          <Text style={styles.label}>kg Lifted</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    width: '100%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E5E5E5',
  },
  number: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
});
