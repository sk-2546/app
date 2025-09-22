import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Play, Square, Wifi, Globe, Users, Download } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import ServerStatus from '@/components/ServerStatus';
import ConnectionInfo from '@/components/ConnectionInfo';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { useServerManager } from '@/hooks/useServerManager';

export default function ServerTab() {
  const {
    isServerRunning,
    serverUrl,
    connectedClients,
    totalDownloads,
    startServer,
    stopServer,
    serverStats
  } = useServerManager();

  const handleServerToggle = async () => {
    if (isServerRunning) {
      await stopServer();
    } else {
      const success = await startServer();
      if (!success) {
        Alert.alert('Error', 'Failed to start server. Please check your network connection.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>File Server</Text>
          <Text style={styles.subtitle}>Share files across your network</Text>
        </View>

        <ServerStatus 
          isRunning={isServerRunning}
          url={serverUrl}
          clients={connectedClients}
          downloads={totalDownloads}
        />

        <View style={styles.controlSection}>
          <TouchableOpacity
            style={[
              styles.serverButton,
              isServerRunning ? styles.stopButton : styles.startButton
            ]}
            onPress={handleServerToggle}
            activeOpacity={0.8}
          >
            {isServerRunning ? (
              <Square size={24} color="#ffffff" strokeWidth={2} />
            ) : (
              <Play size={24} color="#ffffff" strokeWidth={2} />
            )}
            <Text style={styles.buttonText}>
              {isServerRunning ? 'Stop Server' : 'Start Server'}
            </Text>
          </TouchableOpacity>
        </View>

        {isServerRunning && (
          <>
            <ConnectionInfo serverUrl={serverUrl} />
            <QRCodeDisplay url={serverUrl} />
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Users size={20} color="#3b82f6" />
                <Text style={styles.statNumber}>{connectedClients}</Text>
                <Text style={styles.statLabel}>Connected</Text>
              </View>
              <View style={styles.statCard}>
                <Download size={20} color="#10b981" />
                <Text style={styles.statNumber}>{totalDownloads}</Text>
                <Text style={styles.statLabel}>Downloads</Text>
              </View>
              <View style={styles.statCard}>
                <Globe size={20} color="#f59e0b" />
                <Text style={styles.statNumber}>{serverStats.uptime}</Text>
                <Text style={styles.statLabel}>Uptime</Text>
              </View>
            </View>
          </>
        )}

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>How to Connect</Text>
          <Text style={styles.helpText}>
            1. Start the server above{'\n'}
            2. Connect your device to the same Wi-Fi network{'\n'}
            3. Open the displayed URL in any web browser{'\n'}
            4. Browse and download files directly
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  controlSection: {
    marginVertical: 20,
  },
  serverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  startButton: {
    backgroundColor: '#10b981',
  },
  stopButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginTop: 4,
  },
  helpSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginTop: 30,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  helpText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});