import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

export type AlertNotificationProps = {
  title: string;
  subtitle: string;
  onClose: () => void;
};

export default function AlertNotification({ title, subtitle, onClose }: AlertNotificationProps) {
  const flashingRef = useRef(new Animated.Value(0)).current;
  const sirenSound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(flashingRef, {
          toValue: 1,
          duration: 220,
          useNativeDriver: false,
        }),
        Animated.timing(flashingRef, {
          toValue: 0,
          duration: 220,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    const playSiren = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('./assets/siren.mp3'),
          { shouldPlay: true, isLooping: true }
        );
        sirenSound.current = sound;
        await sound.playAsync();
      } catch (error) {
        console.warn('Could not play siren sound:', error);
      }
    };

    playSiren();

    return () => {
      animation.stop();
      if (sirenSound.current) {
        sirenSound.current.stopAsync();
        sirenSound.current.unloadAsync();
      }
    };
  }, []);

  const redBlue = flashingRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ef4444', '#3b82f6'],
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Animated.View style={[styles.flashBar, { backgroundColor: redBlue }]} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(2, 8, 23, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  container: {
    width: '88%',
    backgroundColor: '#0F172A',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#334155',
    padding: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  flashBar: {
    width: '110%',
    height: 18,
    marginBottom: 14,
    borderRadius: 9,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitle: {
    color: '#E2E8F0',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
  },
  closeButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
