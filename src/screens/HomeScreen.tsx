import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AlertNotification from '../components/AlertNotification';
import PoliceAlertCard from '../components/PoliceAlertCard';
import { getNearbyHazards, getSampleHazards, minutesSince } from '../services/routeService';

export default function HomeScreen() {
  const [showAlert, setShowAlert] = useState(true);

  const hazards = getSampleHazards();
  const nearby = getNearbyHazards(-33.8678, 151.2093, hazards, 500);

  useEffect(() => {
    if (nearby.length > 0) {
      setShowAlert(true);
    }
  }, [nearby]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puffways</Text>
      <Text style={styles.subtitle}>Navigate the quiet way</Text>

      <ScrollView style={styles.list}>
        <Text style={styles.sectionTitle}>Recent local alerts</Text>

        {hazards.map((hazard) => (
          <View key={hazard.id} style={styles.row}>
            <Text style={styles.rowTitle}>{hazard.title}</Text>
            <Text style={styles.rowText}>
              {hazard.policeType ? `Type: ${hazard.policeType}` : 'Type: general alert'}
            </Text>
            <Text style={styles.rowText}>
              Last confirmed {Math.round(minutesSince(hazard.lastConfirmedAt))} mins ago
            </Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Police clearly identified</Text>

        {hazards
          .filter((hazard) => hazard.policeType)
          .map((hazard) => (
            <PoliceAlertCard
              key={hazard.id}
              policeType={hazard.policeType!}
              lastConfirmedAt={`${Math.round(minutesSince(hazard.lastConfirmedAt))} mins ago`}
            />
          ))}
      </ScrollView>

      {showAlert && (
        <AlertNotification
          title="Police alert"
          subtitle="Last confirmed 2 minutes ago near Queen Street. Consider the quiet route."
          onClose={() => setShowAlert(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020817',
    paddingTop: 64,
    paddingHorizontal: 16,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 34,
    fontWeight: '700',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 16,
    marginBottom: 18,
  },
  list: {
    flex: 1,
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  rowTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  rowText: {
    color: '#E2E8F0',
    fontSize: 14,
    marginTop: 4,
  },
});
