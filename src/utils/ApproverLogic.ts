import { permissions } from '../data/permissions';

export interface Approver {
  id: string;
  name: string;
  role: string;
  order: number;
  uniqueId: string;
}

export interface RevisionHistory {
  stage: string;
  status: string;
  revision: number;
  comment?: string;
}

// Map of approver IDs to their details
export const approversMap: Record<string, Approver> = {
  'Business Approver': {
    id: 'business-approver',
    name: 'Dukenrey',
    role: 'Business Approver',
    order: 1,
    uniqueId: 'business-approver'
  },
  'Technical Approver': {
    id: 'technical-approver',
    name: 'Deepanraj',
    role: 'Technical Approver',
    order: 2,
    uniqueId: 'technical-approver'
  },
  'Approver-1': {
    id: 'am-team-1',
    name: 'Tyson Tesaract',
    role: 'MCP Team',
    order: 3,
    uniqueId: 'am-team-1'
  },
  'Approver-2': {
    id: 'am-team-2',
    name: 'Tessa William',
    role: 'AM Team',
    order: 4,
    uniqueId: 'am-team-2'
  },
  'Approver-3': {
    id: 'am-team-3',
    name: 'Michael Chen',
    role: 'MCP Team',
    order: 5,
    uniqueId: 'am-team-3'
  },
  'Approver-4': {
    id: 'am-team-4',
    name: 'Tony Stark',
    role: 'AM Team',
    order: 6,
    uniqueId: 'am-team-4'
  },
  'Approver-5': {
    id: 'am-team-5',
    name: 'Steve Adams',
    role: 'AM Team',
    order: 7,
    uniqueId: 'am-team-5'
  }
};

// Function to get approver by stage ID
export function getApproverByStage(stage: string): Approver | undefined {
  return Object.values(approversMap).find(
    approver => approver.uniqueId === stage || approver.id === stage
  );
}

// Function to get required approvers for a permission request
export function getApproversForRequest(permissionNames: string[]): Approver[] {
  const requiredApprovers = new Map<string, Approver>();

  // Always include Business and Technical Approvers
  requiredApprovers.set('business-approver', approversMap['Business Approver']);
  requiredApprovers.set('technical-approver', approversMap['Technical Approver']);

  permissionNames.forEach(permissionName => {
    const permission = permissions.find(p => p.permission === permissionName);
    if (permission) {
      permission.approvers.forEach(approverId => {
        const approver = approversMap[approverId];
        if (approver && !requiredApprovers.has(approver.uniqueId)) {
          requiredApprovers.set(approver.uniqueId, approver);
        }
      });
    }
  });

  return Array.from(requiredApprovers.values()).sort((a, b) => a.order - b.order);
}

// Function to get next approver stage
export function getNextStage(
  currentApprover: Approver,
  approvers: Approver[]
): Approver | null {
  if (!currentApprover || !approvers.length) return null;

  const currentIndex = approvers.findIndex(a =>
    a.uniqueId === currentApprover.uniqueId || a.id === currentApprover.uniqueId
  );

  if (currentIndex === -1 || currentIndex === approvers.length - 1) return null;

  return approvers[currentIndex + 1];
}

// Function to track revision versions (Revise-vX)
export function getRevisionVersion(history: RevisionHistory[]): string {
  const latestRevision = history
    .filter(h => h.stage.includes("Revise-v"))
    .sort((a, b) => b.revision - a.revision)[0];

  return latestRevision ? `Revise-v${latestRevision.revision}` : "Revise-v1";
}

// Function to update revision version when a request is revised
export function updateRevision(history: RevisionHistory[], stage: string): void {
  const latestRevision = history
    .filter(h => h.stage.includes("Revise-v"))
    .sort((a, b) => b.revision - a.revision)[0];

  const newRevision = latestRevision ? latestRevision.revision + 1 : 1;
  history.push({
    stage: `Revise-v${newRevision}`,
    status: "pending",
    revision: newRevision
  });
}

// Function to get the status of an approver in the workflow
export function getApproverStatus(
  approver: Approver,
  currentStage: string,
  requestStatus: string,
  history: RevisionHistory[]
): 'pending' | 'approved' | 'denied' | 'current' {
  const historyEntry = history.find(h =>
    h.stage.toLowerCase() === approver.role.toLowerCase()
  );

  if (requestStatus === 'approved' || requestStatus === 'implemented') {
    return 'approved';
  }

  if (requestStatus === 'denied') {
    const denialEntry = history.find(h =>
      h.status.toLowerCase() === 'denied' && !h.comment?.includes('Automatically denied')
    );

    if (denialEntry) {
      const denialStage = denialEntry.stage;
      const denialApprover = Object.values(approversMap).find(a =>
        a.role.toLowerCase() === denialStage.toLowerCase()
      );

      if (denialApprover) {
        if (approver.order < denialApprover.order) return 'approved';
        if (approver.role === denialStage) return 'denied';
        if (approver.order > denialApprover.order) return 'pending';
      }
    }
  }

  if (historyEntry) {
    const status = historyEntry.status.toLowerCase();
    if (status === 'approved') return 'approved';
    if (status === 'denied') return 'denied';
  }

  if (approver.uniqueId === currentStage || approver.id === currentStage) {
    return 'current';
  }

  if (requestStatus === 'pending') {
    const currentApprover = getApproverByStage(currentStage);
    if (currentApprover && approver.order < currentApprover.order) {
      return 'approved';
    }
  }

  return 'pending';
}
