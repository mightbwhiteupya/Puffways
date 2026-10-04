import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AlertNotification from '../components/AlertNotification';

export default function HomeScreen() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puffways</Text>
      <Text style={styles.subtitle}>Navigate the quiet way</Text>

      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.cardTitle}>Recent local alerts</Text>
        <Text style={styles.alertRow}>Police radar • Last confirmed 2 mins ago</Text>
        <Text style={styles.alertRow}>Camera • Last confirmed 9 mins ago</Text>
        <Text style={styles.alertRow}>Heavy traffic • Last confirmed 18 mins ago</Text>
      </ScrollView>

      {showAlert && (
        <AlertNotification
          title="Police alert"
          subtitle="Last confirmed 2 minutes ago near Queen Street. Consider a quieter backup route."
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
    marginTop: 6,
    color: '#94A3B8',
    fontSize: 16,
  },
  list: {
    marginTop: 26,
    paddingBottom: 30,
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
  },
  alertRow: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 14,
    color: '#E2E8F0',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
});
