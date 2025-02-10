import type { Request } from '../components/Dashboard/types';

interface ApprovalCache {
  [requestId: string]: {
    [permission: string]: {
      status: string;
      currentStage: string;
      lastUpdated: number;
      history: Array<{
        stage: string;
        status: string;
        date: string;
        comment?: string;
      }>;
    };
  };
}

const CACHE_KEY = 'approval_status_cache';
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

class ApprovalStatusCache {
  private cache: ApprovalCache = {};

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Clean expired entries
        Object.keys(parsed).forEach(requestId => {
          Object.keys(parsed[requestId]).forEach(permission => {
            if (Date.now() - parsed[requestId][permission].lastUpdated > CACHE_EXPIRY) {
              delete parsed[requestId][permission];
            }
          });
          if (Object.keys(parsed[requestId]).length === 0) {
            delete parsed[requestId];
          }
        });
        this.cache = parsed;
      }
    } catch (error) {
      console.error('Error loading approval status cache:', error);
      this.cache = {};
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(this.cache));
    } catch (error) {
      console.error('Error saving approval status cache:', error);
    }
  }

  updateStatus(request: Request) {
    if (!this.cache[request.id]) {
      this.cache[request.id] = {};
    }

    Object.entries(request.permissionApprovals).forEach(([permission, status]) => {
      this.cache[request.id][permission] = {
        status: status.status,
        currentStage: status.currentStage,
        lastUpdated: Date.now(),
        history: status.history
      };
    });

    this.saveToStorage();
  }

  getStatus(requestId: string, permission: string) {
    return this.cache[requestId]?.[permission];
  }

  getAllStatuses(requestId: string) {
    return this.cache[requestId] || {};
  }

  clearCache(requestId?: string) {
    if (requestId) {
      delete this.cache[requestId];
    } else {
      this.cache = {};
    }
    this.saveToStorage();
  }

  isApproved(requestId: string, permission: string): boolean {
    const status = this.getStatus(requestId, permission);
    return status?.status === 'approved' || status?.status === 'implemented';
  }

  isPending(requestId: string, permission: string): boolean {
    const status = this.getStatus(requestId, permission);
    return status?.status === 'pending';
  }

  isDenied(requestId: string, permission: string): boolean {
    const status = this.getStatus(requestId, permission);
    return status?.status === 'denied';
  }

  getCurrentStage(requestId: string, permission: string): string | null {
    return this.getStatus(requestId, permission)?.currentStage || null;
  }

  getHistory(requestId: string, permission: string) {
    return this.getStatus(requestId, permission)?.history || [];
  }
}

export const approvalStatusCache = new ApprovalStatusCache();