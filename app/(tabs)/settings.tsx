import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { Server, Shield, Wifi, Smartphone, Info } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SettingsItem from '@/components/SettingsItem';

export default function SettingsTab() {
  const [autoStart, setAutoStart] = useState(false);
  const [requireAuth, setRequireAuth] = useState(false);
  const [allowUploads, setAllowUploads] = useState(false);
  const [port, setPort] = useState('8080');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Configure your file server</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Server Configuration</Text>
          
          <SettingsItem
            icon={<Server size={20} color="#3b82f6" />}
            title="Auto Start Server"
            subtitle="Start server automatically when app opens"
            rightElement={
              <Switch
                value={autoStart}
                onValueChange={setAutoStart}
                trackColor={{ false: '#f1f5f9', true: '#3b82f6' }}
                thumbColor="#ffffff"
              />
            }
          />

          <SettingsItem
            icon={<Wifi size={20} color="#10b981" />}
            title="Server Port"
            subtitle="Change the port number (default: 8080)"
            rightElement={<Text style={styles.portText}>{port}</Text>}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          
          <SettingsItem
            icon={<Shield size={20} color="#f59e0b" />}
            title="Require Authentication"
            subtitle="Password protect file access"
            rightElement={
              <Switch
                value={requireAuth}
                onValueChange={setRequireAuth}
                trackColor={{ false: '#f1f5f9', true: '#3b82f6' }}
                thumbColor="#ffffff"
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          
          <SettingsItem
            icon={<Smartphone size={20} color="#8b5cf6" />}
            title="Allow Uploads"
            subtitle="Let connected devices upload files"
            rightElement={
              <Switch
                value={allowUploads}
                onValueChange={setAllowUploads}
                trackColor={{ false: '#f1f5f9', true: '#3b82f6' }}
                thumbColor="#ffffff"
              />
            }
          />
        </View>

        <View style={styles.aboutSection}>
          <View style={styles.aboutHeader}>
            <Info size={20} color="#64748b" />
            <Text style={styles.aboutTitle}>About</Text>
          </View>
          <Text style={styles.aboutText}>
            Shubham File Server v1.0.0{'\n'}
            Built with React Native and Expo{'\n\n'}
            This app creates a local HTTP server on your device, allowing other devices on the same network to access and download your files through a web browser.
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  portText: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'monospace',
  },
  aboutSection: {
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
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});