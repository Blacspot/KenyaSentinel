import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import IncidentCard from '@/components/IncidentCard';
import { mockIncidents } from '@/data/mockData';

export default function HomeScreen() {
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = () => {
    if (!description || !selectedType) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert('Success', 'Your report has been submitted successfully', [
      {
        text: 'OK',
        onPress: () => {
          setDescription('');
          setSelectedType('');
          setIsDialogOpen(false);
        },
      },
    ]);
  };

  const recentIncidents = mockIncidents.slice(0, 3);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SafeReport</Text>
          <Text style={styles.headerSubtitle}>Help keep your community safe</Text>
        </View>

        <View style={styles.content}>
          {/* Alert Banner */}
          <View style={styles.alertBanner}>
            <MaterialCommunityIcons
              name="alert"
              size={20}
              color={Colors.secondary}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>Emergency? Call 911</Text>
              <Text style={styles.alertSubtitle}>
                Use this app for non-emergency reporting
              </Text>
            </View>
          </View>

          {/* Report Button */}
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => setIsDialogOpen(true)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="plus" size={20} color={Colors.textLight} />
            <Text style={styles.reportButtonText}>Report an Incident</Text>
          </TouchableOpacity>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: Colors.primary }]}>142</Text>
              <Text style={styles.statLabel}>Reports Today</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: Colors.accent }]}>89</Text>
              <Text style={styles.statLabel}>Resolved</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: Colors.secondary }]}>53</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>

          {/* Recent Reports */}
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent in Your Area</Text>
              <TouchableOpacity>
                <Text style={{ color: Colors.accent, fontSize: 14 }}>View All</Text>
              </TouchableOpacity>
            </View>
            {recentIncidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal for Report Form */}
      <Modal
        visible={isDialogOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsDialogOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Report an Incident</Text>
              <TouchableOpacity onPress={() => setIsDialogOpen(false)}>
                <MaterialCommunityIcons name="close" size={24} color={Colors.textHeading} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Describe what happened..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />

              <TouchableOpacity
                style={[styles.submitButton, (!description || !selectedType) && { opacity: 0.5 }]}
                onPress={handleSubmit}
                disabled={!description || !selectedType}
              >
                <Text style={styles.submitButtonText}>Submit Report</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  alertBanner: {
    backgroundColor: `${Colors.secondary}15`,
    borderWidth: 1,
    borderColor: `${Colors.secondary}50`,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 20,
  },
  alertTitle: {
    fontSize: 16,
    color: Colors.textHeading,
    marginBottom: 4,
  },
  alertSubtitle: {
    fontSize: 14,
    color: Colors.textHeading,
    opacity: 0.7,
  },
  reportButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },
  reportButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textLight,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.cardBg,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textHeading,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.bgWhite,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textHeading,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textHeading,
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: Colors.inputBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    minHeight: 100,
    fontSize: 16,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
});