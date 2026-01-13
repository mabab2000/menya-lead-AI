export type RootStackParamList = {
  MainTabs: undefined;
  PlantScan: undefined;
  Results: {
    plantName: string;
    disease: string;
    severity: string;
    imageUri?: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Library: undefined;
  Scan: undefined;
  Community: undefined;
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
  plantName: string;
  disease: string;
  date: string;
  imageUri?: string;
}
