import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Trend {
  topic_key: string;
  title: string;
  location: string;
  reports: number;
}

interface TrendCardProps {
  trend: Trend;
}

export default function TrendCard({ trend }: TrendCardProps) {
  return (
    <View style={styles.trendingCard}>
      <Text style={styles.trendingTitle}>{trend.title}</Text>
      <Text style={styles.trendingLocation}>{trend.location}</Text>
      <Text style={styles.trendingReports}>{trend.reports} reports</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  trendingCard: {
    backgroundColor: Colors.bgWhite,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textHeading,
    marginBottom: 4,
  },
  trendingLocation: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  trendingReports: {
    fontSize: 14,
    color: Colors.primary,
  },
});