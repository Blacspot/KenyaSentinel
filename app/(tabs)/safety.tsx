import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

interface EmergencyItem {
  id: string;
  title: string;
  steps: string[];
}

const EMERGENCIES: EmergencyItem[] = [
  {
    id: "fire",
    title: "Fire Outbreak",
    steps: [
      "Stay calm and shout to alert others.",
      "Do not waste time collecting belongings.",
      "If there is smoke, stay low and crawl to fresh air.",
      "Use the nearest safe exit (never use elevators).",
      "Feel doors before opening—if hot, do NOT open.",
      "Move to a safe distance and call 999.",
      "If clothes catch fire: STOP → DROP → ROLL.",
    ],
  },
  {
    id: "gbv",
    title: "Gender-Based Violence (GBV) / Domestic Violence",
    steps: [
      "Prioritise your safety — move away from the violent person if possible.",
      "Find a safe place (neighbour, friend, public location).",
      "Call 999 or the GBV hotline 1195 for immediate help.",
      "Document evidence (photos, messages, injuries) when safe to do so.",
      "Seek medical care and ask for a medical report.",
      "Report to the police when you can do so safely.",
      "Make a safety plan: emergency contacts, packed essentials, exit route.",
    ],
  },
  {
    id: "sexual_assault",
    title: "Sexual Assault / Rape",
    steps: [
      "Move to a safe location immediately.",
      "Do NOT bathe, change clothes, or clean yourself — evidence must be preserved.",
      "Call a trusted person for support and contact 999 or 1195.",
      "Go to the nearest hospital or GBV centre for medical care and PEP.",
      "Keep clothing and any evidence in a paper bag if possible.",
      "You are not to blame. Seek counselling and legal support when ready.",
    ],
  },
  {
    id: "robbery",
    title: "Robbery / Mugging",
    steps: [
      "Do NOT resist — give the attacker what they want.",
      "Avoid sudden movements; stay calm and comply.",
      "After they leave, move to a safe area and call 999.",
      "Note any details you can safely remember (appearance, direction, vehicle).",
      "Report to the police when you are safe.",
    ],
  },
  {
    id: "road_accident",
    title: "Road Accident",
    steps: [
      "Ensure your safety first — move away from traffic if safe.",
      "Call emergency services: 999 or 1199 (St John Ambulance).",
      "Don't move seriously injured people unless there is an immediate danger.",
      "Provide first aid only if you are trained.",
      "Photograph the scene and exchange details if possible.",
    ],
  },
  {
    id: "medical",
    title: "Medical Emergency",
    steps: [
      "Call 999 or 1199 immediately.",
      "Check responsiveness and breathing.",
      "If unconscious but breathing, place in the recovery position.",
      "If not breathing and trained, start CPR.",
      "Stop heavy bleeding with firm pressure using a clean cloth.",
    ],
  },
  {
    id: "flood",
    title: "Floods / Flash Floods",
    steps: [
      "Move to higher ground immediately.",
      "Avoid walking or driving through moving water.",
      "Turn off electricity if safe to do so.",
      "Keep emergency essentials ready (water, torch, phone, meds).",
      "Follow official evacuation instructions.",
    ],
  },
  {
    id: "kidnapping",
    title: "Kidnapping / Abduction Threat",
    steps: [
      "Make noise and flee toward crowded, lit areas if you can.",
      "Call 999 immediately if you escape or can reach a phone.",
      "If taken, stay calm, observe details quietly, and look for safe escape chances.",
      "Once safe, report to the police and seek medical care.",
    ],
  },
  {
    id: "terror",
    title: "Terror Threat / Suspicious Activity",
    steps: [
      "Do NOT touch suspicious objects; move away quickly.",
      "Call 999 and report what you saw.",
      "If an attack happens: RUN → HIDE → TELL (call when safe).",
    ],
  },
  {
    id: "electrical",
    title: "Electrical Shock / Electrocution",
    steps: [
      "Do NOT touch a person in contact with electricity — switch off the source first.",
      "If safe, separate them from the source using a dry non-conductive object.",
      "Call 999 and provide first aid if trained.",
    ],
  },
  {
    id: "snake",
    title: "Snake Bite / Animal Attack",
    steps: [
      "Move away slowly and keep the bitten area still and lower than the heart.",
      "Do NOT cut or suck the wound.",
      "Get to a hospital quickly and note the animal's appearance if possible.",
    ],
  },
  {
    id: "earthquake",
    title: "Earthquake / Building Collapse",
    steps: [
      "Drop, cover, and hold on when shaking starts.",
      "Stay away from glass and heavy objects.",
      "When safe, evacuate and avoid damaged structures.",
    ],
  },
];

export default function SafetyScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Emergency Awareness</Text>
          <Text style={styles.headerSubtitle}>
            Clear steps you can follow during any emergency
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Emergency Scenarios</Text>
          
          {EMERGENCIES.map((emergency) => (
            <TouchableOpacity
              key={emergency.id}
              style={styles.emergencyCard}
              onPress={() => toggleExpand(emergency.id)}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.emergencyTitle}>{emergency.title}</Text>
                <Text style={styles.expandIcon}>
                  {expandedId === emergency.id ? '−' : '+'}
                </Text>
              </View>
              
              {expandedId === emergency.id && (
                <View style={styles.stepsContainer}>
                  {emergency.steps.map((step, index) => (
                    <View key={index} style={styles.stepRow}>
                      <Text style={styles.stepNumber}>{index + 1}.</Text>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}

          {/* Emergency Contacts Section */}
          <View style={styles.contactsCard}>
            <Text style={styles.contactsTitle}>Emergency Contacts</Text>
            <Text style={styles.contactText}>
              Emergency Services: 999{'\n'}
              Ambulance (St John): 1199{'\n'}
              GBV Hotline: 1195
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
  emergencyCard: {
    backgroundColor: Colors.bgWhite,
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textHeading,
    flex: 1,
  },
  expandIcon: {
    fontSize: 24,
    fontWeight: '300',
    color: Colors.textHeading,
    marginLeft: 8,
  },
  stepsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 12,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textHeading,
    marginRight: 8,
    minWidth: 20,
  },
  stepText: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 20,
    flex: 1,
  },
  contactsCard: {
    backgroundColor: '#054003',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  contactsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 22,
  },
});