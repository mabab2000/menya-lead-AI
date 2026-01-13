import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AnalysisResult {
  id: string;
  timestamp: string;
  imageUri: string;
  isPlant: boolean;
  message: string;
  disease: string;
  severity: string;
  recommendations: string[];
  affectedParts: string[];
}

const STORAGE_KEY = '@menya_leaf_scans';

export const StorageService = {
  async saveScan(result: AnalysisResult): Promise<void> {
    try {
      const existingScans = await this.getAllScans();
      const updatedScans = [result, ...existingScans];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScans));
    } catch (error) {
      console.error('Error saving scan:', error);
      throw error;
    }
  },

  async getAllScans(): Promise<AnalysisResult[]> {
    try {
      const scansJson = await AsyncStorage.getItem(STORAGE_KEY);
      return scansJson ? JSON.parse(scansJson) : [];
    } catch (error) {
      console.error('Error loading scans:', error);
      return [];
    }
  },

  async getScanById(id: string): Promise<AnalysisResult | null> {
    try {
      const scans = await this.getAllScans();
      return scans.find(scan => scan.id === id) || null;
    } catch (error) {
      console.error('Error getting scan:', error);
      return null;
    }
  },

  async deleteScan(id: string): Promise<void> {
    try {
      const scans = await this.getAllScans();
      const updatedScans = scans.filter(scan => scan.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScans));
    } catch (error) {
      console.error('Error deleting scan:', error);
      throw error;
    }
  },

  async clearAllScans(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing scans:', error);
      throw error;
    }
  },
};
