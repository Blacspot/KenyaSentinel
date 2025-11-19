import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import IncidentCard from '@/components/IncidentCard';
import { mockIncidents } from '@/data/mockData';

const { width } = Dimensions.get('window');

const emergencyContacts = [
  { service: 'Police', number: '999 / 112', notes: 'General police emergencies', icon: 'shield-account' },
  { service: 'Fire & Rescue', number: '999 / 112', notes: 'Fire emergencies and rescue', icon: 'fire-truck' },
  { service: 'Ambulance / Medical', number: '999 / 112', notes: 'Emergency medical response', icon: 'ambulance' },
  { service: 'Anti-Terrorism', number: '719', notes: 'Counter-terrorism reporting', icon: 'shield-alert' },
  { service: 'Traffic Police', number: '020 272 4066', notes: 'Road safety and accident response', icon: 'car-emergency' },
  { service: 'Women & Children', number: '1195', notes: 'Gender-based violence & child protection', icon: 'account-group' },
  { service: 'Domestic Violence', number: '1190', notes: 'Support for domestic abuse victims', icon: 'hand-heart' },
]

const incidentTypes = ['Theft', 'Assault', 'Burglary', 'Traffic Accident', 'Fraud'];

export default function HomeScreen() {
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentContactIndex, setCurrentContactIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const greeting = 'Good afternoon';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentContactIndex((prev) => (prev + 1) % emergencyContacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greetingText}>{greeting},</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
              <MaterialCommunityIcons name="bell-outline" size={24} color={Colors.textHeading} />
              <View style={styles.notificationBadge} />
          </TouchableOpacity>
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
              <Text style={styles.alertTitle}>Emergency? Call 999</Text>
              <Text style={styles.alertSubtitle}>
                Use this app for non-emergency reporting
              </Text>
            </View>
          </View>

          <View style={styles.carouselContainer}>
            <Text style={styles.carouselTitle}>Emergency Contact Lines In Kenya</Text>
            <View style={styles.carousel}>
              {emergencyContacts.map((contact, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.contactCard,
                    {
                      display: index === currentContactIndex ? 'flex' : 'none',
                    },
                  ]}
                >
                  <View style={styles.contactHeader}>
                    <MaterialCommunityIcons
                      name={contact.icon as any}
                      size={32}
                      color={Colors.primary}
                    />
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactService}>{contact.service}</Text>
                      <Text style={styles.contactNumber}>{contact.number}</Text>
                    </View>
                  </View>
                  <Text style={styles.contactNotes}>{contact.notes}</Text>
                  <TouchableOpacity style={styles.callButton}>
                    <MaterialCommunityIcons name="phone" size={18} color={Colors.textLight} />
                    <Text style={styles.callButtonText}>Call Now</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            {/* Carousel Indicators */}
            <View style={styles.indicatorContainer}>
              {emergencyContacts.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    index === currentContactIndex && styles.activeIndicator,
                  ]}
                />
              ))}
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

              <Text style={styles.label}>Incident Type</Text>
              <View style={styles.typeContainer}>
                {incidentTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.typeButton, selectedType === type && styles.selectedTypeButton]}
                    onPress={() => setSelectedType(type)}
                  >
                    <Text style={[styles.typeButtonText, selectedType === type && styles.selectedTypeButtonText]}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>

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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: Colors.bgLight,
  },
  greetingText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
   notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
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
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  typeButton: {
    backgroundColor: Colors.inputBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
  },
  selectedTypeButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeButtonText: {
    fontSize: 14,
    color: Colors.textHeading,
  },
  selectedTypeButtonText: {
    color: Colors.textLight,
  },
  carouselContainer: {
    marginBottom: 40,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textHeading,
    marginBottom: 12,
  },
  carousel: {
    height: 120,
  },
  contactCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 8,
    padding: 12,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactInfo: {
    marginLeft: 12,
    flex: 1,
  },
  contactService: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textHeading,
  },
  contactNumber: {
    fontSize: 14,
    color: Colors.primary,
  },
  contactNotes: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  callButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 6,
  },
  callButtonText: {
    color: Colors.textLight,
    fontSize: 14,
    fontWeight: '600',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textMuted,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: Colors.primary,
  },
});