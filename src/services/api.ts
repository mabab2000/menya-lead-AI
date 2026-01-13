const API_URL = 'https://menya-leaf-ai-api.onrender.com';

export interface ApiAnalysisResponse {
  is_plant: boolean;
  message: string;
  disease: string;
  severity: string;
  recommendations: string[];
  affected_parts: string[];
}

export const ApiService = {
  async analyzeImage(imageUri: string): Promise<ApiAnalysisResponse> {
    try {
      // Create form data
      const formData = new FormData();
      
      // Extract filename from URI
      const filename = imageUri.split('/').pop() || 'image.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      // Append the image file
      formData.append('file', {
        uri: imageUri,
        name: filename,
        type: type,
      } as any);

      // Make the API request
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data: ApiAnalysisResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw error;
    }
  },
};
