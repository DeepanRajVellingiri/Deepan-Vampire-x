import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequests } from '../../context/RequestContext';
import type { SelectedPermission, AdditionalRequirements } from './PermissionType';

interface ReviseLogicProps {
  onPermissionsLoad: (permissions: SelectedPermission[]) => void;
  onRequirementsLoad: (requirements: AdditionalRequirements[]) => void;
}

export function ReviseLogic({ onPermissionsLoad, onRequirementsLoad }: ReviseLogicProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { state: { requests } } = useRequests();

  useEffect(() => {
    const state = location.state as { revisePermission?: string, requestId?: string };
    if (!state?.revisePermission && !state?.requestId) {
      return;
    }

    const request = requests.find(r => 
      r.permissions.includes(state.revisePermission!) || 
      r.id === state.requestId
    );

    if (!request) {
      return;
    }

    // Convert request data back to the format expected by the form
    const selectedPermissions: SelectedPermission[] = request.permissions.map(permName => {
      const permTypes = request.permissionTypes?.[permName];
      return {
        name: permName,
        type: 'Delegated', // This would need to come from your permissions data
        description: '', // This would need to come from your permissions data
        glr: false,
        apiScan: false,
        asa: false,
        isApplication: permTypes?.isApplication || false,
        isDelegated: permTypes?.isDelegated || false,
        justification: permTypes?.justification || ''
      };
    });

    const additionalReqs: AdditionalRequirements[] = request.additionalRequirements || [];

    // Load the permissions and requirements into the form
    onPermissionsLoad(selectedPermissions);
    onRequirementsLoad(additionalReqs);
  }, [location, requests, onPermissionsLoad, onRequirementsLoad]);

  return null;
}