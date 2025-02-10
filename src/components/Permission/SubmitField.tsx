import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import type { SelectedPermission, AdditionalRequirements } from './PermissionType';
import { validatePermissions } from './InputFieldValidation';
import { useRequests } from '../../context/RequestContext';
import { useNavigate, useLocation } from 'react-router-dom';

function generateRequestId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = Math.floor(Math.random() * 6) + 5;
  let result = 'REQ-';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

interface SubmitFieldProps {
  selectedPermissions: SelectedPermission[];
  additionalRequirements: AdditionalRequirements[];
}

export function SubmitField({
  selectedPermissions,
  additionalRequirements,
}: SubmitFieldProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [, setIsSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [requestId, setRequestId] = useState<string>('');
  const { dispatch, state: { requests } } = useRequests();
  const navigate = useNavigate();
  const location = useLocation();

  const getNextVersion = (existingRequest: any): number => {
    return (existingRequest.version || 0) + 1;
  };

  const handleSubmit = () => {
    const validationErrors = validatePermissions(selectedPermissions, additionalRequirements);
    
    if (validationErrors.length === 0) {
      const state = location.state as { requestId?: string };
      const existingRequest = state?.requestId ? requests.find(r => r.id === state.requestId) : null;
      const currentRequestId = existingRequest?.id || generateRequestId();
      setRequestId(currentRequestId);

      // Initialize permissionApprovals for each permission
      const permissionApprovals = selectedPermissions.reduce((acc, permission) => {
        const existingApproval = existingRequest?.permissionApprovals[permission.name];
        
        // Keep existing status for approved/implemented permissions
        if (existingApproval?.status === 'approved' || existingApproval?.status === 'implemented') {
          return {
            ...acc,
            [permission.name]: existingApproval
          };
        }

        // Keep existing status for pending permissions
        if (existingApproval?.status === 'pending') {
          return {
            ...acc,
            [permission.name]: existingApproval
          };
        }

        // For denied permissions being resubmitted, preserve history but reset to pending
        if (existingRequest && existingApproval?.status === 'denied') {
          return {
            ...acc,
            [permission.name]: {
              permission: permission.name,
              currentStage: 'business-approver',
              status: 'pending',
              history: [
                ...existingApproval.history,
                {
                  stage: 'System',
                  status: 'Resubmitted',
                  date: new Date().toISOString(),
                  comment: 'Permission resubmitted for approval after denial'
                }
              ]
            }
          };
        }

        // For new permissions
        return {
          ...acc,
          [permission.name]: {
            permission: permission.name,
            currentStage: 'business-approver',
            status: 'pending',
            history: [{
              stage: 'Business Approver',
              status: 'Pending',
              date: new Date().toISOString(),
              comment: existingRequest ? 'New permission added in revision' : 'Initial submission'
            }]
          }
        };
      }, {});

      const nextVersion = existingRequest ? getNextVersion(existingRequest) : undefined;
      const newRequest = {
        id: currentRequestId,
        status: 'pending' as const,
        currentStage: 'business-approver',
        submittedDate: existingRequest ? existingRequest.submittedDate : new Date().toISOString(),
        version: nextVersion,
        permissions: selectedPermissions.map(p => p.name),
        permissionTypes: selectedPermissions.reduce((acc, p) => ({
          ...acc,
          [p.name]: {
            isApplication: p.isApplication,
            isDelegated: p.isDelegated,
            justification: p.justification
          }
        }), {}),
        permissionApprovals,
        additionalRequirements: additionalRequirements.map(req => ({
          permission: req.permission,
          needs: req.needs,
          attachment: req.attachment ? {
            name: req.attachment.name,
            type: req.attachment.type,
            size: req.attachment.size
          } : undefined,
          link: req.link,
          sites: req.sites
        })),
        history: [
          ...(existingRequest?.history || []),
          {
            stage: 'System',
            status: existingRequest ? 'Revision' : 'Submitted',
            date: new Date().toISOString(),
            comment: existingRequest 
              ? `Request revision v${nextVersion}: ${getRevisionSummary(existingRequest, selectedPermissions)}`
              : 'Initial submission'
          }
        ]
      };

      if (existingRequest) {
        newRequest.history.push({
          stage: `v${nextVersion}`,
          status: 'Resubmitted',
          date: new Date().toISOString(),
          comment: 'Permission resubmitted for approval after denial'
        });
        dispatch({ type: 'UPDATE_REQUEST', payload: { id: currentRequestId, updates: newRequest } });
      } else {
        dispatch({ type: 'ADD_REQUEST', payload: newRequest });
      }

      setIsSubmitted(true);
      setErrors([]);
      setShowPopup(true);
    } else {
      setErrors(validationErrors.map(error => error.message));
      setIsSubmitted(false);
    }
  };

  const getRevisionSummary = (
    existingRequest: any, 
    currentPermissions: SelectedPermission[]
  ): string => {
    const currentPermissionNames = currentPermissions.map(p => p.name);
    const existingPermissionNames = existingRequest.permissions;
    
    const added = currentPermissionNames.filter(p => !existingPermissionNames.includes(p));
    const removed = existingPermissionNames.filter((p: string) => !currentPermissionNames.includes(p));
    const modified = currentPermissionNames.filter(p => 
      existingPermissionNames.includes(p) && 
      existingRequest.permissionApprovals[p]?.status === 'denied'
    );

    const changes = [];
    if (added.length) changes.push(`Added: ${added.join(', ')}`);
    if (removed.length) changes.push(`Removed: ${removed.join(', ')}`);
    if (modified.length) changes.push(`Resubmitted: ${modified.join(', ')}`);
    
    return changes.join('; ');
  };

  const handleDashboardRedirect = () => {
    navigate('/dashboard');
  };

  const getRequestDisplayId = () => {
    if (!requestId) return '';
    if (!location.state?.requestId) return requestId; // New request - no version
    
    const existingRequest = requests.find(r => r.id === location.state.requestId);
    if (!existingRequest) return requestId;
    
    const nextVersion = getNextVersion(existingRequest);
    return `${requestId}-v${nextVersion - 1}`; // Resubmission - show version
  };

  return (
    <div className="mt-8">
      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 rounded-md">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Please correct the following errors:
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc pl-5 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {location.state?.requestId ? 'Resubmit Request' : 'Submit Request'}
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">
                {location.state?.requestId ? 'Request resubmitted successfully!' : 'Request submitted successfully!'}
              </h3>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                Your request has been {location.state?.requestId ? 'resubmitted' : 'submitted'} with the following ID:
              </p>
              <p className="text-lg font-mono font-medium text-blue-600 bg-blue-50 p-2 rounded">
                {getRequestDisplayId()}
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleDashboardRedirect}
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Visit Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}