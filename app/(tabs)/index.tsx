import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
  Linking,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 14) return 'Good noon';
  if (hour >= 14 && hour < 18) return 'Good afternoon';
  if (hour >= 18 && hour < 22) return 'Good evening';
  return 'Good night';
};

const emergencyContacts = [
  { service: 'Police', number: '999 / 112', notes: 'General police emergencies', icon: 'shield-account' },
  { service: 'Fire & Rescue', number: '999 / 112', notes: 'Fire emergencies and rescue', icon: 'fire-truck' },
  { service: 'Ambulance / Medical', number: '999 / 112', notes: 'Emergency medical response', icon: 'ambulance' },
  { service: 'Anti-Terrorism', number: '719', notes: 'Counter-terrorism reporting', icon: 'shield-alert' },
  { service: 'Traffic Police', number: '020 272 4066', notes: 'Road safety and accident response', icon: 'car-emergency' },
  { service: 'Women & Children', number: '1195', notes: 'Gender-based violence & child protection', icon: 'account-group' },
  { service: 'Domestic Violence', number: '1190', notes: 'Support for domestic abuse victims', icon: 'hand-heart' },
];

const incidentTypes = ['Theft', 'Assault', 'Burglary', 'Traffic Accident', 'Fraud'];

export default function HomeScreen() {
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [currentContactIndex, setCurrentContactIndex] = useState(0);
  const [attachedVideos, setAttachedVideos] = useState<string[]>([]);
  const [showPopover, setShowPopover] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  const greeting = getGreeting();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentContactIndex((prev) => {
        const next = (prev + 1) % emergencyContacts.length;
        scrollRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (params?.videoUri) {
      setAttachedVideos(prev => [...prev, params.videoUri as string]);
    }
  }, [params]);

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
          setAttachedVideos([]);
        },
      },
    ]);
  };

  const pickVideoFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your media library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAttachedVideos(prev => [...prev, result.assets[0].uri]);
      setShowPopover(false);
    }
  };

  const recordVideoFromCamera = async () => {
    router.push({
      pathname: "/camera" as any,
      params: { returnTo: "/" },
    });
    setShowPopover(false);
  };

  const handleScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentContactIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SafeReport</Text>
          <Text style={styles.headerSubtitle}>Help keep your community safe</Text>
        </View>

        <View style={styles.topBar}>
          <Text style={styles.greetingText}>{greeting},</Text>
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
              <Text style={styles.alertSubtitle}>Use this app for non-emergency reporting</Text>
            </View>
          </View>

          {/* Emergency Contacts Carousel */}
          <View style={styles.carouselContainer}>
            <Text style={styles.carouselTitle}>Emergency Contact Lines In Kenya</Text>
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScrollEnd}
              style={styles.carousel}
            >
              {emergencyContacts.map((contact, index) => (
                <View key={index} style={styles.contactCard}>
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
                  <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL(`tel:${contact.number.split(' / ')[0]}`)}>
                    <MaterialCommunityIcons name="phone" size={18} color={Colors.textLight} />
                    <Text style={styles.callButtonText}>Call Now</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

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
        </View>
      </ScrollView>

      {/* Popover above + button */}
      {showPopover && (
        <View style={styles.popoverContainer}>
          <TouchableOpacity style={styles.popoverItem} onPress={recordVideoFromCamera}>
            <MaterialCommunityIcons name="video" size={20} color={Colors.textHeading} />
            <Text style={styles.popoverText}>Record Video</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.popoverItem} onPress={pickVideoFromGallery}>
            <MaterialCommunityIcons name="folder" size={20} color={Colors.textHeading} />
            <Text style={styles.popoverText}>Choose From Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.popoverItem} onPress={() => setShowPopover(false)}>
            <MaterialCommunityIcons name="close" size={20} color={Colors.secondary} />
            <Text style={styles.popoverText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Report Button */}
      <View style={styles.reportButtonContainer}>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => setShowPopover(prev => !prev)}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="plus" size={20} color={Colors.textLight} />
          <Text style={styles.reportButtonText}>Report an Incident</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgLight },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, backgroundColor: Colors.bgLight },
  greetingText: { fontSize: 14, color: Colors.textMuted },
  notificationButton: { position: 'relative', padding: 8 },
  notificationBadge: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.secondary },
  header: { backgroundColor: Colors.headerBg, padding: 16, paddingBottom: 24 },
  headerTitle: { fontSize: 24, fontWeight: '600', color: Colors.textLight, marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: Colors.textLight, opacity: 0.9 },
  content: { padding: 16 },
  alertBanner: { backgroundColor: `${Colors.secondary}15`, borderWidth: 1, borderColor: `${Colors.secondary}50`, borderRadius: 8, padding: 12, flexDirection: 'row', marginBottom: 20 },
  alertTitle: { fontSize: 16, color: Colors.textHeading, marginBottom: 4 },
  alertSubtitle: { fontSize: 14, color: Colors.textHeading, opacity: 0.7 },
  reportButtonContainer: { position: 'absolute', bottom: 125, left: 0, right: 0, alignItems: 'center' },
  reportButton: { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 8, gap: 8 },
  reportButtonText: { fontSize: 16, fontWeight: '600', color: Colors.textLight },
  carouselContainer: { marginBottom: 40 },
  carouselTitle: { fontSize: 16, fontWeight: '600', color: Colors.textHeading, marginBottom: 24 },
  carousel: { height: 150 },
  contactCard: { backgroundColor: Colors.cardBg, borderRadius: 8, padding: 12, width: width },
  contactHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  contactInfo: { marginLeft: 12, flex: 1 },
  contactService: { fontSize: 16, fontWeight: '600', color: Colors.textHeading },
  contactNumber: { fontSize: 14, color: Colors.primary },
  contactNotes: { fontSize: 14, color: Colors.textMuted, marginBottom: 8 },
  callButton: { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, borderRadius: 6 },
  callButtonText: { color: Colors.textLight, fontSize: 14, fontWeight: '600' },
  indicatorContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  indicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.textMuted, marginHorizontal: 4 },
  activeIndicator: { backgroundColor: Colors.primary },

  // Popover styles
  popoverContainer: {
    position: "absolute",
    bottom: 200,
    alignSelf: "center",
    backgroundColor: Colors.bgWhite,
    paddingVertical: 10,
    borderRadius: 12,
    width: 220,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  popoverItem: { paddingVertical: 12, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", gap: 10 },
  popoverText: { fontSize: 14, color: Colors.textHeading },
});
