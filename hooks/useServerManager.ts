import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { getNetworkStateAsync } from 'expo-network';

export interface ServerStats {
  uptime: string;
  bytesTransferred: number;
  requestCount: number;
}

export const useServerManager = () => {
  const [isServerRunning, setIsServerRunning] = useState(false);
  const [serverUrl, setServerUrl] = useState<string>('');
  const [connectedClients, setConnectedClients] = useState(0);
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [serverStats, setServerStats] = useState<ServerStats>({
    uptime: '0m',
    bytesTransferred: 0,
    requestCount: 0,
  });

  const getLocalIP = async (): Promise<string> => {
    // In a real implementation, you would detect the actual local IP
    // For web preview, we'll use localhost
    if (Platform.OS === 'web') {
      return 'localhost';
    }
    
    // For mobile devices, you would use native modules to detect IP
    // This is a mock implementation
    return '192.168.1.100';
  };

  const startServer = async (): Promise<boolean> => {
    try {
      const ip = await getLocalIP();
      const port = '8080';
      const url = `http://${ip}:${port}`;
      
      // In a real implementation, this would start the actual HTTP server
      // For now, we simulate starting the server
      setServerUrl(url);
      setIsServerRunning(true);
      
      // Simulate some connected clients and downloads
      setTimeout(() => setConnectedClients(1), 2000);
      setTimeout(() => setTotalDownloads(3), 5000);
      
      return true;
    } catch (error) {
      console.error('Failed to start server:', error);
      return false;
    }
  };

  const stopServer = async (): Promise<void> => {
    // In a real implementation, this would stop the HTTP server
    setIsServerRunning(false);
    setServerUrl('');
    setConnectedClients(0);
    setServerStats({
      uptime: '0m',
      bytesTransferred: 0,
      requestCount: 0,
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isServerRunning) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const uptime = Math.floor((Date.now() - startTime) / 60000);
        setServerStats(prev => ({
          ...prev,
          uptime: `${uptime}m`,
        }));
      }, 60000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isServerRunning]);

  return {
    isServerRunning,
    serverUrl,
    connectedClients,
    totalDownloads,
    serverStats,
    startServer,
    stopServer,
  };
};