import { useState } from 'react';
import { useRequests } from '../../context/RequestContext';
import { getApproversForRequest, getApproverByStage, getNextStage } from '../../utils/ApproverLogic';
import type { Request } from '../Dashboard/types';

interface RequestApprovalProps {
  request: Request;
  permission: string;
  onClose: () => void;
}

export function RequestApproval({ request, permission, onClose }: RequestApprovalProps) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dispatch } = useRequests();

  const approvers = getApproversForRequest([permission]);
  const approvalStatus = request.permissionApprovals[permission];
  const currentApprover = getApproverByStage(approvalStatus.currentStage);

  // Guard against invalid state
  if (!currentApprover || approvers.length === 0) {
    return (
      <div className="bg-red-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-red-800 mb-2">
          Error: Invalid Approval Stage
        </h3>
        <p className="text-sm text-red-600 mb-4">
          Current stage: {approvalStatus.currentStage}<br />
          Available approvers: {approvers.map(a => a.role).join(', ')}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Close
        </button>
      </div>
    );
  }

  const nextApprover = getNextStage(currentApprover, approvers, approvalStatus.history);
  const isLastStage = !nextApprover;

  const handleApproval = async (approved: boolean) => {
    setIsSubmitting(true);
    
    try {
      const now = new Date().toISOString();
      
      const newHistory = [
        ...approvalStatus.history,
        {
          stage: currentApprover.role,
          status: approved ? 'Approved' : 'Denied',
          date: now,
          comment: comment.trim() || undefined
        }
      ];

      let updatedApprovalStatus;

      if (approved) {
        if (isLastStage) {
          // Last approver - mark as approved
          updatedApprovalStatus = {
            ...approvalStatus,
            status: 'approved',
            currentStage: currentApprover.uniqueId,
            history: newHistory
          };
        } else {
          // Move to next approver
          updatedApprovalStatus = {
            ...approvalStatus,
            status: 'pending',
            currentStage: nextApprover.uniqueId,
            history: newHistory
          };
        }
      } else {
        // Request denied - mark only this permission as denied
        updatedApprovalStatus = {
          ...approvalStatus,
          status: 'denied',
          currentStage: currentApprover.uniqueId,
          history: newHistory
        };
      }

      // Update the permission approval status
      const updatedPermissionApprovals = {
        ...request.permissionApprovals,
        [permission]: updatedApprovalStatus
      };

      // Check if all permissions are now in a final state (approved or denied)
      const allPermissionsProcessed = Object.values(updatedPermissionApprovals).every(
        status => status.status === 'approved' || status.status === 'denied'
      );

      // If all permissions are processed, update the overall request status
      const allPermissionsApproved = Object.values(updatedPermissionApprovals).every(
        status => status.status === 'approved'
      );

      const updates = {
        permissionApprovals: updatedPermissionApprovals,
        ...(allPermissionsProcessed && {
          status: allPermissionsApproved ? 'approved' : 'denied'
        })
      };

      dispatch({
        type: 'UPDATE_REQUEST',
        payload: {
          id: request.id,
          updates
        }
      });

      onClose();
    } catch (error) {
      console.error('Error updating request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Review Permission: {permission}
      </h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {isLastStage 
            ? "You are the final approver for this permission. Approving will mark it as ready for implementation."
            : `After your approval, the request will be forwarded to ${nextApprover.name} (${nextApprover.role}).`
          }
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Review Comments
          </label>
          <div className="mt-1">
            <textarea
              id="comment"
              rows={4}
              className="shadow-sm block w-full focus:ring-purple-500 focus:border-purple-500 sm:text-sm border border-gray-300 rounded-md"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your review comments here..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleApproval(false)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            disabled={isSubmitting}
          >
            Deny Permission
          </button>
          <button
            type="button"
            onClick={() => handleApproval(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            disabled={isSubmitting}
          >
            {isLastStage ? 'Final Approval' : 'Approve & Forward'}
          </button>
        </div>
      </div>
    </div>
  );
}