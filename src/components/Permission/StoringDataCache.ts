export interface CachedData {
  selectedPermissions: string[];
  formData: {
    [key: string]: {
      isApplication: boolean;
      isDelegated: boolean;
      justification: string;
      notice?: string;
    };
  };
  timestamp: number;
}

const CACHE_KEY = 'graph_permissions_data';
const CACHE_EXPIRY = 100000; // 30 minutes in milliseconds

export function saveToCache(data: Partial<CachedData>): void {
  try {
    // Ensure we have all required fields with defaults
    const safeData: CachedData = {
      selectedPermissions: data.selectedPermissions || [],
      formData: data.formData || {},
      timestamp: Date.now()
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(safeData));
  } catch (error) {
    console.error('Failed to save to cache:', error);
  }
}

export function loadFromCache(): CachedData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const data = JSON.parse(cached) as CachedData;
    const now = Date.now();
    
    if (now - data.timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    
    return {
      selectedPermissions: data.selectedPermissions || [],
      formData: data.formData || {},
      timestamp: data.timestamp
    };
  } catch (error) {
    console.error('Failed to load from cache:', error);
    return null;
  }
}

export function clearCache(): void {
  localStorage.removeItem(CACHE_KEY);
}

// Clear cache on page reload
window.addEventListener('load', () => {
  clearCache();
});

export function downloadFile(attachment: { name: string; type: string; size: number }) {
  // Since we can't actually download files in this demo, show a notification
  alert(`Downloading file: ${attachment.name} (${Math.round(attachment.size / 1024)} KB)`);
}