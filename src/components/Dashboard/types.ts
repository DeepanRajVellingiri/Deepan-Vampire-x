export interface PermissionApprovalStatus {
  permission: string;
  currentStage: string;
  status: 'pending' | 'approved' | 'denied' | 'implemented';
  history: {
    stage: string;
    status: string;
    date: string;
    comment?: string;
  }[];
}

export interface Request {
  id: string;
  status: 'pending' | 'approved' | 'denied' | 'implemented';
  currentStage: string;
  submittedDate: string;
  permissions: string[];
  permissionTypes?: {
    [key: string]: {
      isApplication: boolean;
      isDelegated: boolean;
      justification: string;
    };
  };
  permissionApprovals: {
    [key: string]: PermissionApprovalStatus;
  };
  additionalRequirements?: {
    permission: string;
    needs: ('GLR' | 'API Scan' | 'ASA')[];
    attachment?: {
      name: string;
      type: string;
      size: number;
    };
    link?: string;
    sites?: string[];
  }[];
  history: {
    stage: string;
    status: string;
    date: string;
    comment?: string;
  }[];
}

export interface FilterState {
  startDate: string;
  endDate: string;
  searchQuery: string;
  status: string;
}