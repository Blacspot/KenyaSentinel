import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import IncidentCard from '@/components/IncidentCard';
import { mockIncidents, trendingTopics } from '@/data/mockData';

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState<'trending' | 'recent'>('trending');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>Trending incidents and updates</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'trending' && styles.activeTab]}
            onPress={() => setActiveTab('trending')}
          >
            <Text style={[styles.tabText, activeTab === 'trending' && styles.activeTabText]}>
              Trending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
            onPress={() => setActiveTab('recent')}
          >
            <Text style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>
              Recent
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === 'trending' ? (
            <View>
              <Text style={styles.sectionTitle}>Trending Now</Text>
              {trendingTopics.map((topic, index) => (
                <View key={index} style={styles.trendingCard}>
                  <Text style={styles.trendingTitle}>{topic.title}</Text>
                  <Text style={styles.trendingLocation}>{topic.location}</Text>
                  <Text style={styles.trendingReports}>{topic.reports} reports</Text>
                </View>
              ))}
            </View>
          ) : (
            <View>
              {mockIncidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} showComments />
              ))}
            </View>
          )}
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.bgWhite,
    marginHorizontal: 16,
    marginTop: -12,
    marginBottom: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  activeTabText: {
    color: Colors.textLight,
    fontWeight: '600',
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