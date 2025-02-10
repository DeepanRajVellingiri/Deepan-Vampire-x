import type { Request } from '../components/Dashboard/types';

export interface RevisionState {
  originalRequest: Request;
  modifiedPermissions: Set<string>;
  removedPermissions: Set<string>;
  addedPermissions: Set<string>;
}

export function getPermissionStatus(request: Request, permission: string) {
  const approvalStatus = request.permissionApprovals[permission];
  return {
    status: approvalStatus?.status || 'pending',
    isLocked: approvalStatus?.status === 'approved' || approvalStatus?.status === 'pending',
    isDenied: approvalStatus?.status === 'denied',
    currentStage: approvalStatus?.currentStage
  };
}

export function trackRevisionChanges(
  originalRequest: Request,
  modifiedPermissions: string[],
  currentPermissions: string[]
): RevisionState {
  const state: RevisionState = {
    originalRequest,
    modifiedPermissions: new Set(),
    removedPermissions: new Set(),
    addedPermissions: new Set()
  };

  // Track modified permissions
  modifiedPermissions.forEach(permission => {
    if (originalRequest.permissions.includes(permission)) {
      state.modifiedPermissions.add(permission);
    }
  });

  // Track removed permissions
  originalRequest.permissions.forEach(permission => {
    if (!currentPermissions.includes(permission)) {
      state.removedPermissions.add(permission);
    }
  });

  // Track added permissions
  currentPermissions.forEach(permission => {
    if (!originalRequest.permissions.includes(permission)) {
      state.addedPermissions.add(permission);
    }
  });

  return state;
}

export function generateRevisionHistory(
  revisionState: RevisionState,
  comment?: string
): Request['history'][0] {
  const changes: string[] = [];

  if (revisionState.modifiedPermissions.size > 0) {
    changes.push(`Modified permissions: ${Array.from(revisionState.modifiedPermissions).join(', ')}`);
  }

  if (revisionState.removedPermissions.size > 0) {
    changes.push(`Removed permissions: ${Array.from(revisionState.removedPermissions).join(', ')}`);
  }

  if (revisionState.addedPermissions.size > 0) {
    changes.push(`Added permissions: ${Array.from(revisionState.addedPermissions).join(', ')}`);
  }

  return {
    stage: 'System',
    status: 'Revision',
    date: new Date().toISOString(),
    comment: comment || `Request resubmitted for approval. Changes: ${changes.join('; ')}`
  };
}

export function prepareRevisionRequest(
  originalRequest: Request,
  revisionState: RevisionState,
  newPermissionData: Record<string, any>
): Partial<Request> {
  // Start with existing approvals
  const permissionApprovals = { ...originalRequest.permissionApprovals };

  // Reset approval status for modified and new permissions
  [...revisionState.modifiedPermissions, ...revisionState.addedPermissions].forEach(permission => {
    permissionApprovals[permission] = {
      permission,
      currentStage: 'business-approver',
      status: 'pending',
      history: [{
        stage: 'Business Approver',
        status: 'Pending',
        date: new Date().toISOString(),
        comment: 'Permission resubmitted for approval'
      }]
    };
  });

  // Remove approvals for removed permissions
  revisionState.removedPermissions.forEach(permission => {
    delete permissionApprovals[permission];
  });

  // Generate new history entry
  const newHistory = [
    ...originalRequest.history,
    generateRevisionHistory(revisionState)
  ];

  return {
    permissionApprovals,
    history: newHistory,
    permissionTypes: {
      ...originalRequest.permissionTypes,
      ...newPermissionData
    }
  };
}