// Types for permission data
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
}

export interface AdditionalRequirements {
  permission: string;
  needs: ('GLR' | 'API Scan' | 'ASA')[];
  attachment?: File;
  link?: string;
  sites?: string[];
}

// Permission data
export const permissions: Permission[] = [
  {
    type: 'Delegated',
    name: 'User.Read',
    description: 'Sign in and read user profile',
    glr: false,
    apiScan: false,
    asa: false
  },
  {
    type: 'Delegated',
    name: 'User.ReadWrite',
    description: 'Read and write user profile',
    glr: false,
    apiScan: true,
    asa: false
  },
  {
    type: 'Delegated',
    name: 'Mail.Read',
    description: 'Read user mail',
    glr: true,
    apiScan: true,
    asa: false
  },
  {
    type: 'Delegated',
    name: 'Mail.Send',
    description: 'Send mail as a user',
    glr: false,
    apiScan: true,
    asa: false
  },
  {
    type: 'Application',
    name: 'Application.Read.All',
    description: 'Read all applications',
    glr: false,
    apiScan: true,
    asa: false
  },
  {
    type: 'Application',
    name: 'Directory.Read.All',
    description: 'Read directory data',
    glr: true,
    apiScan: false,
    asa: true
  },
  {
    type: 'Application',
    name: 'Group.Read.All',
    description: 'Read all groups',
    glr: true,
    apiScan: false,
    asa: true
  }
];