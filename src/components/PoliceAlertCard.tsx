import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PoliceType, policeTypeLabels } from '../types';

type Props = {
  policeType: PoliceType;
  lastConfirmedAt: string;
};

export default function PoliceAlertCard({ policeType, lastConfirmedAt }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{policeTypeLabels[policeType]}</Text>
      <Text style={styles.subtitle}>Last confirmed: {lastConfirmedAt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: '#E2E8F0',
    fontSize: 14,
    marginTop: 6,
  },
});
