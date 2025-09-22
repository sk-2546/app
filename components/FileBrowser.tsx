import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Folder, File, ChevronRight, RefreshCw } from 'lucide-react-native';

interface FileItem {
  name: string;
  type: 'file' | 'directory';
  size?: number;
  path: string;
}

interface FileBrowserProps {
  files: FileItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
  onRefresh: () => void;
}

export default function FileBrowser({ files, currentPath, onNavigate, onRefresh }: FileBrowserProps) {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const renderFileItem = ({ item }: { item: FileItem }) => (
    <TouchableOpacity
      style={styles.fileItem}
      onPress={() => item.type === 'directory' && onNavigate(item.path)}
      activeOpacity={0.7}
    >
      <View style={styles.fileIcon}>
        {item.type === 'directory' ? (
          <Folder size={20} color="#3b82f6" />
        ) : (
          <File size={20} color="#64748b" />
        )}
      </View>
      <View style={styles.fileInfo}>
        <Text style={styles.fileName}>{item.name}</Text>
        {item.size && (
          <Text style={styles.fileSize}>{formatFileSize(item.size)}</Text>
        )}
      </View>
      {item.type === 'directory' && (
        <ChevronRight size={16} color="#9ca3af" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pathText}>{currentPath || '/storage/emulated/0'}</Text>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <RefreshCw size={18} color="#3b82f6" />
        </TouchableOpacity>
      </View>
      
      {files.length === 0 ? (
        <View style={styles.emptyState}>
          <Folder size={48} color="#d1d5db" />
          <Text style={styles.emptyText}>No files found</Text>
          <Text style={styles.emptySubtext}>Select a folder to share files</Text>
        </View>
      ) : (
        <FlatList
          data={files}
          renderItem={renderFileItem}
          keyExtractor={(item) => item.path}
          style={styles.fileList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#f1f5f9',
    borderBottomWidth: 1,
  },
  pathText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'monospace',
    flex: 1,
  },
  refreshButton: {
    padding: 4,
    marginLeft: 8,
  },
  fileList: {
    maxHeight: 300,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#f8fafc',
    borderBottomWidth: 1,
  },
  fileIcon: {
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  fileSize: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '500',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
});