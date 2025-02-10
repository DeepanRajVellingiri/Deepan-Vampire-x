import { useState } from 'react';
import { SelectedPermissions } from './SelectedPermissions';
import { ActionButtons } from './ActionButtons';
import type { Request } from '../../Dashboard/types';

interface RequestDetailsProps {
  request: Request;
  isSelected: boolean;
  onToggleDetails: () => void;
}

export function RequestDetails({ request, isSelected, onToggleDetails }: RequestDetailsProps) {
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<string | null>(null);

  return (
    <div className="mt-6 space-y-6">
      <SelectedPermissions 
        request={request}
        onSelectPermission={(permission) => setSelectedPermission(
          selectedPermission === permission ? null : permission
        )}
        selectedPermission={selectedPermission || undefined}
      />

      <ActionButtons
        request={request}
        selectedPermission={selectedPermission}
        showApprovalForm={showApprovalForm}
        onShowApprovalForm={() => setShowApprovalForm(true)}
        onCloseApprovalForm={() => {
          setShowApprovalForm(false);
          setSelectedPermission(null);
        }}
      />
    </div>
  );
}