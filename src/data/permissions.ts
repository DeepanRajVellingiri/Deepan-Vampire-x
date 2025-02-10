export const permissions = [
  {
    permission: 'User.Read',
    description: "Allows the app to read the signed-in user's profile.",
    type: 'Delegated',
    permissionUsageType: 'Delegated',
    glr: false,
    apiScan: false,
    approvers: ['Business Approver', 'Technical Approver', 'Approver-5']
  },
  {
    permission: 'User.ReadBasic.All',
    description: 'Allows the app to read a basic set of profile properties of other users in your organization.',
    type: 'Delegated',
    permissionUsageType: 'Delegated',
    glr: false,
    apiScan: false,
    approvers: ['Business Approver', 'Technical Approver', 'Approver-3']
  },
  {
    permission: 'Mail.Send',
    description: 'Allows the app to send mail as users.',
    type: 'Delegated',
    permissionUsageType: 'Delegated',
    glr: false,
    apiScan: true,
    approvers: ['Business Approver', 'Technical Approver', 'Approver-1', 'Approver-2', 'Approver-4']
  },
  {
    permission: 'User.ReadWrite',
    description: "Read and write user profile",
    permissionUsageType: "Grants the app permission to read and modify the signed-in user’s profile information.",
    glr: false,
    apiScan: true,
    approvers: ['Business Approver', 'Technical Approver', 'Approver-1', 'Approver-2', 'Approver-3']
  },
  {
    permission: 'Mail.Read',
    description: 'Read user mail',
    permissionUsageType: 'Enables the app to access and read the user’s email messages.',
    glr: true,
    apiScan: true,
    approvers: ['Business Approver', 'Technical Approver', 'Approver-5']
  },
  {
    permission: 'Mail.ReadWrite',
    description: 'Read and write access to user mail',
    permissionUsageType: 'Grants the app permission to read, create, update, and delete the user’s email messages.',
    glr: true,
    apiScan: true,
    approvers: ['Business Approver', 'Technical Approver', 'Approver-1', 'Approver-3', 'Approver-5']
  },
  {
    permission: 'Mail.ReadBasic',
    description: 'Read basic user mail information',
    permissionUsageType: "Allows the app to read basic properties of the user’s emails such as subject and sender, but not the full message content.",
    glr: true,
    apiScan: true,
    approvers: ['Business Approver', 'Technical Approver', 'Approver-5']
  },
  {
    permission: 'Mail.Read.Shared',
    description: 'Read shared mail',
    permissionUsageType: 'Enables the app to read email messages from mailboxes that are shared with the signed-in user.',
    glr: true,
    apiScan: true,
    approvers: ['Business Approver', 'Technical Approver', 'Approver-5']
  },
  {
    permission: 'Directory.Read.All',
    description: 'Read directory data',
    permissionUsageType: 'Grants the app access to read directory data, including users, groups, and other directory objects.',
    glr: true,
    apiScan: false,
    approvers: ['Business Approver', 'Technical Approver', 'Approver-5']
  },
  {
    permission: 'Directory.ReadWrite.All',
    description: 'Read and write directory data',
    permissionUsageType: 'Allows the app to read and modify directory data, including managing users, groups, and other objects.',
    glr: true,
    apiScan: true,
    approvers: ['Business Approver', 'Technical Approver', 'Approver-2', 'Approver-3', 'Approver-4']
  },
  {
    permission: 'Application.Read.All',
    description: 'Read all applications',
    permissionUsageType: 'Provides the app with the ability to read the details of all applications in the directory.',
    glr: false,
    apiScan: true,
    approvers: ['Business Approver', 'Technical Approver', 'Approver-1', 'Approver-2', 'Approver-3']
  },
  {
    permission: 'Group.Read.All',
    description: 'Read all groups',
    permissionUsageType: 'Allows the app to read all group properties and memberships in the directory.',
    glr: true,
    apiScan: false,
    approvers: ['Business Approver', 'Technical Approver', 'Approver-2', 'Approver-4', 'Approver-5']
  }
];

// Map of approver IDs to their details
export const approversMap: Record<string, Approver> = {
  'Business Approver': {
    id: 'business-approver',
    name: 'Dukenrey',
    role: 'Business Approver',
    order: 1
  },
  'Technical Approver': {
    id: 'technical-approver',
    name: 'Deepanraj',
    role: 'Technical Approver',
    order: 2
  },
  'Approver-1': {
    id: 'am-team',
    name: 'Tyson Tesaract',
    role: 'AM Team',
    order: 3
  },
  'Approver-2': {
    id: 'am-team',
    name: 'Tessa William',
    role: 'AM Team',
    order: 3
  },
  'Approver-3': {
    id: 'am-team',
    name: 'Michael Chen',
    role: 'AM Team',
    order: 3
  },
  'Approver-4': {
    id: 'am-team',
    name: 'Tony Stark',
    role: 'AM Team',
    order: 3
  },
  'Approver-5': {
    id: 'am-team',
    name: 'Steve Adams',
    role: 'AM Team',
    order: 3
  }
};