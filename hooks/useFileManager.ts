import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export interface FileItem {
  name: string;
  type: 'file' | 'directory';
  size?: number;
  path: string;
}

export const useFileManager = () => {
  const [currentPath, setCurrentPath] = useState('/storage/emulated/0/Download');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [sharedFolder, setSharedFolder] = useState<string>('/storage/emulated/0/Download');

  const generateMockFiles = (): FileItem[] => {
    return [
      {
        name: 'Documents',
        type: 'directory',
        path: '/storage/emulated/0/Download/Documents',
      },
      {
        name: 'Images',
        type: 'directory',
        path: '/storage/emulated/0/Download/Images',
      },
      {
        name: 'sample.pdf',
        type: 'file',
        size: 2457600, // 2.4 MB
        path: '/storage/emulated/0/Download/sample.pdf',
      },
      {
        name: 'presentation.pptx',
        type: 'file',
        size: 15728640, // 15 MB
        path: '/storage/emulated/0/Download/presentation.pptx',
      },
      {
        name: 'video.mp4',
        type: 'file',
        size: 104857600, // 100 MB
        path: '/storage/emulated/0/Download/video.mp4',
      },
      {
        name: 'music.mp3',
        type: 'file',
        size: 5242880, // 5 MB
        path: '/storage/emulated/0/Download/music.mp3',
      },
    ];
  };

  const refreshFiles = () => {
    // In a real implementation, this would scan the actual file system
    setFiles(generateMockFiles());
  };

  const navigateToPath = (path: string) => {
    setCurrentPath(path);
    // In a real implementation, this would load files from the new path
    refreshFiles();
  };

  const selectSharedFolder = async () => {
    // In a real implementation, this would open the system file picker
    // For now, we'll simulate selecting a folder
    const mockPath = '/storage/emulated/0/SharedFiles';
    setSharedFolder(mockPath);
    setCurrentPath(mockPath);
    refreshFiles();
  };

  useEffect(() => {
    refreshFiles();
  }, []);

  return {
    currentPath,
    files,
    sharedFolder,
    navigateToPath,
    selectSharedFolder,
    refreshFiles,
  };
};