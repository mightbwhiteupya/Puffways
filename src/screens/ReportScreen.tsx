import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const hazardOptions = ['Police', 'Camera', 'Accident', 'Roadworks', 'Hazard', 'Traffic'];

export default function ReportScreen() {
  const [selected, setSelected] = useState<string>('Police');
  const [note, setNote] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report a local issue</Text>

      <ScrollView contentContainerStyle={styles.list}>
        {hazardOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, selected === option && styles.optionSelected]}
            onPress={() => setSelected(option)}
          >
            <Text style={[styles.optionText, selected === option && styles.optionTextSelected]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Add location notes"
        placeholderTextColor="#94A3B8"
        multiline
      />

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Submit report</Text>
      </TouchableOpacity>
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
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 18,
  },
  list: {
    gap: 10,
    paddingBottom: 12,
  },
  option: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 14,
  },
  optionSelected: {
    borderColor: '#4FD1C5',
    backgroundColor: '#0F172A',
  },
  optionText: {
    color: '#E2E8F0',
    fontSize: 16,
  },
  optionTextSelected: {
    color: '#4FD1C5',
    fontWeight: '700',
  },
  input: {
    marginTop: 18,
    minHeight: 120,
    backgroundColor: '#111827',
    color: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 18,
    backgroundColor: '#4FD1C5',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: {
    color: '#06202A',
    fontSize: 16,
    fontWeight: '700',
  },
});
