export type RootStackParamList = {
  MainTabs: undefined;
  PlantScan: undefined;
  Results: {
    disease: string;
    severity: string;
    imageUri: string;
    recommendations: string[];
    affectedParts: string[];
    isPlant: boolean;
    message: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Library: undefined;
  Scan: undefined;
  Profile: undefined;
};

export interface PlantDisease {
  id: string;
  name: string;
  severity: 'Low' | 'Medium' | 'High';
  symptoms: string[];
  treatment: string;
}

export interface PlantData {
  id: string;
  name: string;
  category: string;
  image: any;
  description?: string;
}

export interface ScanHistory {
  id: string;
  disease: string;
  severity: string;
  date: string;
  imageUri: string;
  recommendations: string[];
  affectedParts: string[];
  isPlant: boolean;
}
