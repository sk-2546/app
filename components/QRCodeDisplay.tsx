import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { QrCode, Eye, EyeOff } from 'lucide-react-native';

interface QRCodeDisplayProps {
  url: string;
}

export default function QRCodeDisplay({ url }: QRCodeDisplayProps) {
  const [showQR, setShowQR] = useState(false);

  // For now, we'll show a placeholder for the QR code
  // In a real implementation, you'd use a library like react-native-qrcode-svg
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={() => setShowQR(!showQR)}
        activeOpacity={0.7}
      >
        <View style={styles.headerContent}>
          <QrCode size={20} color="#3b82f6" />
          <Text style={styles.title}>QR Code</Text>
        </View>
        {showQR ? (
          <EyeOff size={20} color="#64748b" />
        ) : (
          <Eye size={20} color="#64748b" />
        )}
      </TouchableOpacity>
      
      {showQR && (
        <View style={styles.qrContainer}>
          <View style={styles.qrPlaceholder}>
            <QrCode size={120} color="#64748b" />
            <Text style={styles.qrText}>QR Code for: {url}</Text>
          </View>
          <Text style={styles.qrInstructions}>
            Scan with your device's camera to quickly connect
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 20,
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
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 8,
  },
  qrContainer: {
    padding: 20,
    borderTopColor: '#f1f5f9',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  qrPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
  },
  qrText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
  },
  qrInstructions: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 12,
  },
});