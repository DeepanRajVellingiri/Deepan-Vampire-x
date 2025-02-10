export interface Permission {
  type: 'Delegated' | 'Application';
  name: string;
  description: string;
  glr: boolean;
  apiScan: boolean;
  asa: boolean;
}

export interface SelectedPermission extends Permission {
  isApplication: boolean;
  isDelegated: boolean;
  justification: string;
  notice?: string;
  attachments?: File[];
  links?: string[];
  sites?: string[];
}

export interface AdditionalRequirements {
  permission: string;
  needs: ('GLR' | 'API Scan' | 'ASA')[];
  attachment?: File;
  link?: string;
  sites?: string[];
}