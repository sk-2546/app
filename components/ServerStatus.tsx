import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Circle, Wifi } from 'lucide-react-native';

interface ServerStatusProps {
  isRunning: boolean;
  url?: string;
  clients: number;
  downloads: number;
}

export default function ServerStatus({ isRunning, url, clients, downloads }: ServerStatusProps) {
  return (
    <View style={[styles.container, isRunning ? styles.runningContainer : styles.stoppedContainer]}>
      <View style={styles.header}>
        <View style={styles.statusIndicator}>
          <Circle 
            size={12} 
            color={isRunning ? '#10b981' : '#ef4444'} 
            fill={isRunning ? '#10b981' : '#ef4444'} 
          />
          <Text style={[styles.statusText, isRunning ? styles.runningText : styles.stoppedText]}>
            {isRunning ? 'Server Running' : 'Server Stopped'}
          </Text>
        </View>
        <Wifi size={20} color={isRunning ? '#10b981' : '#9ca3af'} />
      </View>
      
      {isRunning && url && (
        <View style={styles.urlContainer}>
          <Text style={styles.urlLabel}>Server Address:</Text>
          <Text style={styles.urlText}>{url}</Text>
        </View>
      )}
      
      {!isRunning && (
        <Text style={styles.inactiveText}>
          Start the server to begin sharing files
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  runningContainer: {
    borderColor: '#10b981',
    borderWidth: 1,
  },
  stoppedContainer: {
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  runningText: {
    color: '#10b981',
  },
  stoppedText: {
    color: '#ef4444',
  },
  urlContainer: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  urlLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 4,
  },
  urlText: {
    fontSize: 16,
    color: '#1e293b',
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  inactiveText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});