import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Copy, ExternalLink } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';

interface ConnectionInfoProps {
  serverUrl: string;
}

export default function ConnectionInfo({ serverUrl }: ConnectionInfoProps) {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(serverUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connection Instructions</Text>
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>1</Text>
        <Text style={styles.stepText}>Connect your device to the same Wi-Fi network</Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>2</Text>
        <Text style={styles.stepText}>Open a web browser and visit:</Text>
      </View>
      
      <View style={styles.urlBox}>
        <Text style={styles.urlText}>{serverUrl}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <Copy size={16} color="#3b82f6" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.stepContainer}>
        <Text style={styles.stepNumber}>3</Text>
        <Text style={styles.stepText}>Browse and download files directly</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
    lineHeight: 20,
  },
  urlBox: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 36,
    marginBottom: 12,
  },
  urlText: {
    fontSize: 14,
    color: '#1e293b',
    fontFamily: 'monospace',
    flex: 1,
  },
  copyButton: {
    padding: 4,
    marginLeft: 8,
  },
});