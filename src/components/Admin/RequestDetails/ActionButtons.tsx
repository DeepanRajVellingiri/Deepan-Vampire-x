import { useState } from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useRequests } from '../../../context/RequestContext';
import { clearCache } from '../../Permission/StoringDataCache';
import { RequestApproval } from '../RequestApproval';
import type { Request } from '../../Dashboard/types';

interface ActionButtonsProps {
  request: Request;
  selectedPermission: string | null;
  showApprovalForm: boolean;
  onShowApprovalForm: () => void;
  onCloseApprovalForm: () => void;
}

export function ActionButtons({
  request,
  selectedPermission,
  showApprovalForm,
  onShowApprovalForm,
  onCloseApprovalForm
}: ActionButtonsProps) {
  const [implementing, setImplementing] = useState(false);
  const { dispatch } = useRequests();

  // Check if all permissions are approved
  const allPermissionsApproved = request.permissions.every(
    permission => request.permissionApprovals[permission]?.status === 'approved'
  );

  const handleImplement = async () => {
    setImplementing(true);
    try {
      const now = new Date().toISOString();
      
      // Update all permission approvals to implemented
      const updatedPermissionApprovals = { ...request.permissionApprovals };
      request.permissions.forEach(permission => {
        if (updatedPermissionApprovals[permission]) {
          updatedPermissionApprovals[permission] = {
            ...updatedPermissionApprovals[permission],
            status: 'implemented',
            history: [
              ...updatedPermissionApprovals[permission].history,
              {
                stage: 'System',
                status: 'Implemented',
                date: now,
                comment: `Permission ${permission} has been implemented in the system.`
              }
            ]
          };
        }
      });

      const newHistory = [
        ...request.history,
        {
          stage: 'System',
          status: 'Implemented',
          date: now,
          comment: 'All permissions have been implemented in the system.'
        }
      ];

      dispatch({
        type: 'UPDATE_REQUEST',
        payload: {
          id: request.id,
          updates: {
            status: 'implemented',
            history: newHistory,
            permissionApprovals: updatedPermissionApprovals
          }
        }
      });
      clearCache();
    } catch (error) {
      console.error('Error implementing permissions:', error);
    } finally {
      setImplementing(false);
    }
  };

  const canApprove = selectedPermission && request.permissionApprovals[selectedPermission]?.status === 'pending';
  const isImplemented = request.status === 'implemented';

  return (
    <div>
      <div className="flex justify-end space-x-4">
        {canApprove && (
          <button
            onClick={onShowApprovalForm}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Review Selected Permission
          </button>
        )}
        {allPermissionsApproved && !isImplemented && (
          <button
            onClick={handleImplement}
            disabled={implementing}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Clock className="w-4 h-4 mr-2" />
            {implementing ? 'Implementing...' : 'Implement All Permissions'}
          </button>
        )}
      </div>

      {showApprovalForm && selectedPermission && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <RequestApproval
            request={request}
            permission={selectedPermission}
            onClose={onCloseApprovalForm}
          />
        </div>
      )}
    </div>
  );
}