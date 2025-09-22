import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Folder, File, Share, ChevronRight, HardDrive } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFileManager } from '@/hooks/useFileManager';
import FileBrowser from '@/components/FileBrowser';

export default function FilesTab() {
  const {
    currentPath,
    files,
    sharedFolder,
    navigateToPath,
    selectSharedFolder,
    refreshFiles
  } = useFileManager();

  const handleFolderSelect = () => {
    Alert.alert(
      'Select Shared Folder',
      'Choose a folder to share with connected devices',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Select', onPress: selectSharedFolder },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>File Manager</Text>
          <Text style={styles.subtitle}>Choose files to share</Text>
        </View>

        <View style={styles.sharedFolderCard}>
          <View style={styles.sharedFolderHeader}>
            <Share size={20} color="#3b82f6" />
            <Text style={styles.sharedFolderTitle}>Shared Folder</Text>
          </View>
          <Text style={styles.sharedFolderPath}>
            {sharedFolder || 'No folder selected'}
          </Text>
          <TouchableOpacity
            style={styles.selectFolderButton}
            onPress={handleFolderSelect}
            activeOpacity={0.7}
          >
            <HardDrive size={18} color="#ffffff" />
            <Text style={styles.selectFolderText}>
              {sharedFolder ? 'Change Folder' : 'Select Folder'}
            </Text>
          </TouchableOpacity>
        </View>

        <FileBrowser
          files={files}
          currentPath={currentPath}
          onNavigate={navigateToPath}
          onRefresh={refreshFiles}
        />

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>File Sharing</Text>
          <Text style={styles.infoText}>
            Files in the selected folder will be available for download when the server is running. 
            Large files will be served efficiently with resume support.
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
  sharedFolderCard: {
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
  sharedFolderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sharedFolderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 8,
  },
  sharedFolderPath: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  selectFolderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  selectFolderText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoSection: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});