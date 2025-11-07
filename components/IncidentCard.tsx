import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Incident } from '@/data/mockData';

interface IncidentCardProps {
  incident: Incident;
  showComments?: boolean;
  onPress?: () => void;
}

export default function IncidentCard({ incident, showComments = false, onPress }: IncidentCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return Colors.priorityCritical;
      case 'high':
        return Colors.priorityHigh;
      case 'medium':
        return Colors.priorityMedium;
      case 'low':
        return Colors.priorityLow;
      default:
        return Colors.priorityLow;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return Colors.success;
      case 'investigating':
        return Colors.warning;
      case 'reported':
        return Colors.info;
      default:
        return Colors.textMuted;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <Text style={styles.type}>{incident.type}</Text>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(incident.priority) }]}>
            <Text style={styles.priorityText}>{incident.priority.toUpperCase()}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(incident.status) }]}>
          <Text style={styles.statusText}>{incident.status}</Text>
        </View>
      </View>

      <Text style={styles.description}>{incident.description}</Text>

      <View style={styles.footer}>
        <View style={styles.locationContainer}>
          <MaterialCommunityIcons name="map-marker" size={16} color={Colors.textMuted} />
          <Text style={styles.location}>{incident.location}</Text>
        </View>
        <Text style={styles.timestamp}>
          {new Date(incident.timestamp).toLocaleDateString('en-KE', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>

      {showComments && incident.comments && incident.comments > 0 && (
        <View style={styles.commentsContainer}>
          <MaterialCommunityIcons name="comment" size={16} color={Colors.textMuted} />
          <Text style={styles.commentsText}>{incident.comments} comments</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgWhite,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textHeading,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textLight,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textLight,
  },
  description: {
    fontSize: 14,
    color: Colors.textHeading,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  location: {
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  commentsText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginLeft: 4,
  },
});