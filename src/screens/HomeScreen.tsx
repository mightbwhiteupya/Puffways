import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { RouteOption, hazardTypeColors } from '../types';
import { buildRouteOptions } from '../services/routeService';

const routeOptions = buildRouteOptions('Queen Street', 'Central Station');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puffways</Text>
      <Text style={styles.subtitle}>Navigate the quiet way</Text>

      <ScrollView contentContainerStyle={styles.routes}>
        {routeOptions.map((route) => (
          <Pressable key={route.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.routeName}>{route.label}</Text>
              <Text style={styles.score}>{route.score}</Text>
            </View>

            <Text style={styles.detail}>ETA: {route.eta}</Text>
            <Text style={styles.detail}>Distance: {route.distance}</Text>
            <Text style={styles.detail}>Traffic: {route.traffic}</Text>

            <View style={styles.badges}>
              {route.alerts.map((alert) => (
                <View
                  key={`${route.id}-${alert}`}
                  style={[
                    styles.badge,
                    { backgroundColor: hazardTypeColors[alert] ?? '#64748B' },
                  ]}
                >
                  <Text style={styles.badgeText}>{alert}</Text>
                </View>
              ))}
            </View>
          </Pressable>
        ))}
      </ScrollView>
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
    marginTop: 4,
    color: '#94A3B8',
    fontSize: 16,
  },
  routes: {
    marginTop: 24,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  routeName: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '600',
  },
  score: {
    color: '#4FD1C5',
    fontSize: 18,
    fontWeight: '700',
  },
  detail: {
    color: '#CBD5E1',
    fontSize: 14,
    marginBottom: 4,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 11,
    textTransform: 'capitalize',
  },
});
