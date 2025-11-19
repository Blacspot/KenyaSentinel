import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function SafetyScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Safety Awareness</Text>
          <Text style={styles.headerSubtitle}>Stay informed and safe</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Safety Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>General Safety</Text>
            <Text style={styles.tipText}>
              • Stay aware of your surroundings{'\n'}
              • Avoid walking alone at night{'\n'}
              • Keep emergency contacts handy{'\n'}
              • Trust your instincts
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Online Safety</Text>
            <Text style={styles.tipText}>
              • Be cautious with personal information{'\n'}
              • Verify sources before sharing{'\n'}
              • Use strong passwords{'\n'}
              • Report suspicious activities
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Emergency Preparedness</Text>
            <Text style={styles.tipText}>
              • Know your emergency numbers{'\n'}
              • Have a family emergency plan{'\n'}
              • Keep important documents safe{'\n'}
              • Stay updated with local alerts
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgLight,
  },
  header: {
    backgroundColor: Colors.headerBg,
    padding: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.textLight,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    opacity: 0.9,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textHeading,
    marginBottom: 12,
  },
  tipCard: {
    backgroundColor: Colors.bgWhite,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textHeading,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 20,
  },
});
