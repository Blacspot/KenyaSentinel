import IncidentCard from '@/components/IncidentCard';
import { Colors } from '@/constants/Colors';
import { Incident, mockIncidents } from '@/data/mockData';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Kenyan cities and towns with approximate bounding boxes
const kenyaCities = [
  { name: 'Nairobi', minLat: -1.5, maxLat: -1.0, minLng: 36.5, maxLng: 37.0 },
  { name: 'Mombasa', minLat: -4.1, maxLat: -4.0, minLng: 39.5, maxLng: 39.7 },
  { name: 'Kisumu', minLat: -0.2, maxLat: 0.0, minLng: 34.5, maxLng: 35.0 },
  { name: 'Nakuru', minLat: -0.5, maxLat: -0.2, minLng: 35.5, maxLng: 36.5 },
  { name: 'Eldoret', minLat: 0.4, maxLat: 0.6, minLng: 35.2, maxLng: 35.4 },
  { name: 'Thika', minLat: -1.1, maxLat: -0.9, minLng: 37.0, maxLng: 37.2 },
  { name: 'Malindi', minLat: -3.3, maxLat: -3.1, minLng: 40.0, maxLng: 40.2 },
  { name: 'Kitale', minLat: 0.9, maxLat: 1.1, minLng: 34.9, maxLng: 35.1 },
  { name: 'Garissa', minLat: -0.5, maxLat: -0.3, minLng: 39.5, maxLng: 39.7 },
  { name: 'Kakamega', minLat: 0.2, maxLat: 0.4, minLng: 34.6, maxLng: 34.8 },
  { name: 'Meru', minLat: 0.0, maxLat: 0.2, minLng: 37.5, maxLng: 37.7 },
  { name: 'Nyeri', minLat: -0.5, maxLat: -0.3, minLng: 36.8, maxLng: 37.0 },
  { name: 'Embu', minLat: -0.6, maxLat: -0.4, minLng: 37.4, maxLng: 37.6 },
  { name: 'Machakos', minLat: -1.6, maxLat: -1.4, minLng: 37.2, maxLng: 37.4 },
  { name: 'Kericho', minLat: -0.4, maxLat: -0.2, minLng: 35.2, maxLng: 35.4 },
  { name: 'Bomet', minLat: -0.8, maxLat: -0.6, minLng: 35.3, maxLng: 35.5 },
  { name: 'Narok', minLat: -1.2, maxLat: -1.0, minLng: 35.8, maxLng: 36.0 },
  { name: 'Kajiado', minLat: -2.0, maxLat: -1.8, minLng: 36.6, maxLng: 36.8 },
  { name: 'Isiolo', minLat: 0.3, maxLat: 0.5, minLng: 38.4, maxLng: 38.6 },
  { name: 'Marsabit', minLat: 2.3, maxLat: 2.5, minLng: 37.9, maxLng: 38.1 },
  { name: 'Wajir', minLat: 1.7, maxLat: 1.9, minLng: 40.0, maxLng: 40.2 },
  { name: 'Mandera', minLat: 3.9, maxLat: 4.1, minLng: 41.8, maxLng: 42.0 },
  { name: 'Lamu', minLat: -2.3, maxLat: -2.1, minLng: 40.8, maxLng: 41.0 },
  { name: 'Kilifi', minLat: -3.7, maxLat: -3.5, minLng: 39.8, maxLng: 40.0 },
  { name: 'Kwale', minLat: -4.5, maxLat: -4.3, minLng: 39.4, maxLng: 39.6 },
  { name: 'Taita Taveta', minLat: -3.5, maxLat: -3.3, minLng: 38.3, maxLng: 38.5 },
  { name: 'Tana River', minLat: -1.5, maxLat: -1.3, minLng: 39.0, maxLng: 39.2 },
  { name: 'Samburu', minLat: 1.2, maxLat: 1.4, minLng: 37.5, maxLng: 37.7 },
  { name: 'Turkana', minLat: 3.0, maxLat: 3.2, minLng: 35.5, maxLng: 35.7 },
  { name: 'West Pokot', minLat: 1.5, maxLat: 1.7, minLng: 35.0, maxLng: 35.2 },
  { name: 'Bungoma', minLat: 0.5, maxLat: 0.7, minLng: 34.5, maxLng: 34.7 },
  { name: 'Busia', minLat: 0.4, maxLat: 0.6, minLng: 34.0, maxLng: 34.2 },
  { name: 'Siaya', minLat: -0.1, maxLat: 0.1, minLng: 34.2, maxLng: 34.4 },
  { name: 'Homa Bay', minLat: -0.7, maxLat: -0.5, minLng: 34.4, maxLng: 34.6 },
  { name: 'Migori', minLat: -1.1, maxLat: -0.9, minLng: 34.4, maxLng: 34.6 },
  { name: 'Kisii', minLat: -0.8, maxLat: -0.6, minLng: 34.7, maxLng: 34.9 },
  { name: 'Nyamira', minLat: -0.6, maxLat: -0.4, minLng: 34.9, maxLng: 35.1 },
  { name: 'Nandi', minLat: 0.1, maxLat: 0.3, minLng: 35.1, maxLng: 35.3 },
  { name: 'Uasin Gishu', minLat: 0.4, maxLat: 0.6, minLng: 35.3, maxLng: 35.5 },
  { name: 'Trans Nzoia', minLat: 1.0, maxLat: 1.2, minLng: 34.9, maxLng: 35.1 },
  { name: 'Vihiga', minLat: 0.0, maxLat: 0.2, minLng: 34.6, maxLng: 34.8 },
  { name: 'Laikipia', minLat: 0.2, maxLat: 0.4, minLng: 36.5, maxLng: 36.7 },
  { name: "Murang'a", minLat: -0.8, maxLat: -0.6, minLng: 37.1, maxLng: 37.3 },
  { name: 'Kirinyaga', minLat: -0.6, maxLat: -0.4, minLng: 37.3, maxLng: 37.5 },
  { name: 'Kiambu', minLat: -1.2, maxLat: -1.0, minLng: 36.7, maxLng: 36.9 },
];

function getCityFromCoords(lat: number, lng: number): string {
  if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
    return 'Unknown Location';
  }
  for (const city of kenyaCities) {
    if (lat >= city.minLat && lat <= city.maxLat && lng >= city.minLng && lng <= city.maxLng) {
      return city.name;
    }
  }
  return `${lat.toFixed(2)}, ${lng.toFixed(2)}`; // Fallback to coords
}

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState<'trending' | 'recent'>('trending');
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchRealTrends();
  }, []);

  function calculatePriority(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score >= 15) return 'critical';
    if (score >= 10) return 'high';
    if (score >= 5) return 'medium';
    return 'low';
  }

  function mapTrendToIncident(trend: any): Incident {
    const coords = trend.location_bucket.split('_');
    let location = 'Unknown Location';
    let locationCoords: { lat: number; lng: number } | undefined;
    if (coords.length === 2) {
      const lat = Number(coords[0]);
      const lng = Number(coords[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        location = getCityFromCoords(lat, lng);
        locationCoords = { lat, lng };
      }
    }
    return {
      id: trend.topic_key,
      type: trend.category,
      description: `${trend.count} reports of ${trend.category}`,
      location,
      locationCoords,
      priority: calculatePriority(trend.score),
      timestamp: trend.latest,
      status: 'reported',
      comments: 0
    };
  }

  async function fetchRealTrends() {
    try {
      const response = await fetch(
        'https://incidenttrends-algorithm.onrender.com/api/trends?top_n=20'
      );
      const data = await response.json();

      if (data.success) {
        setIncidents(data.trends.map(mapTrendToIncident));
      }
    } catch (error) {
      console.error('Failed to fetch trends:', error);
    } finally {
      setLoading(false);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRealTrends();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
              {loading ? <Text>Loading trends...</Text> : incidents.map(incident => <IncidentCard key={incident.id} incident={incident} showComments />)}
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