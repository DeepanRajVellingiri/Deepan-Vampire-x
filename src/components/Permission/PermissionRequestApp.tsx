import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { PermissionSelect } from './PermissionSelect';
import { PermissionTable } from './PermissionTable';
import { PermissionAdditionalReq } from './PermissionAdditionalReq';
import { SubmitField } from './SubmitField';
import { ReviseLogic } from './ReviseLogic';
import { RequestSearch } from './RequestSearch';
import { useRequests } from '../../context/RequestContext';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Permission, SelectedPermission, AdditionalRequirements } from './PermissionType';
import { loadFromCache, saveToCache } from './StoringDataCache';

export function PermissionRequestApp() {
  const [selectedPermissions, setSelectedPermissions] = useState<SelectedPermission[]>([]);
  const [additionalRequirements, setAdditionalRequirements] = useState<AdditionalRequirements[]>([]);
  const { state: { requests } } = useRequests();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { requestId?: string };
  const existingRequest = state?.requestId ? requests.find(r => r.id === state.requestId) : null;

  useEffect(() => {
    const cached = loadFromCache();
    if (cached && !existingRequest) {
      const restoredPermissions = cached.selectedPermissions.map(name => {
        const permission = cached.formData[name];
        return {
          ...permission,
          isApplication: permission.isApplication || false,
          isDelegated: permission.isDelegated || false,
          justification: permission.justification || '',
        };
      });
      setSelectedPermissions(restoredPermissions);
    }
  }, [existingRequest]);

  useEffect(() => {
    if (selectedPermissions.length > 0 && !existingRequest) {
      const cacheData = {
        selectedPermissions: selectedPermissions.map(p => p.name),
        formData: selectedPermissions.reduce((acc, p) => ({
          ...acc,
          [p.name]: p
        }), {}),
        timestamp: Date.now()
      };
      saveToCache(cacheData);
    }
  }, [selectedPermissions, existingRequest]);

  const handleRequestSelect = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      navigate('/', { state: { requestId } });
    }
  };

  const handlePermissionSelect = (permission: Permission) => {
    const isSelected = selectedPermissions.some((p) => p.name === permission.name);
    
    if (isSelected) {
      // If this is a revision, don't allow removing approved permissions
      if (existingRequest?.permissionApprovals[permission.name]?.status === 'approved') {
        return;
      }
      setSelectedPermissions(selectedPermissions.filter((p) => p.name !== permission.name));
      setAdditionalRequirements(additionalRequirements.filter((r) => r.permission !== permission.name));
    } else {
      const newPermission: SelectedPermission = {
        ...permission,
        isApplication: false,
        isDelegated: false,
        justification: '',
      };
      
      setSelectedPermissions([...selectedPermissions, newPermission]);
      
      if (permission.glr || permission.apiScan || permission.asa) {
        const needs: ('GLR' | 'API Scan' | 'ASA')[] = [];
        if (permission.glr) needs.push('GLR');
        if (permission.apiScan) needs.push('API Scan');
        if (permission.asa) needs.push('ASA');
        
        setAdditionalRequirements([
          ...additionalRequirements,
          {
            permission: permission.name,
            needs,
          },
        ]);
      }
    }
  };

  const handlePermissionChange = (
    permissionName: string,
    field: keyof SelectedPermission,
    value: any
  ) => {
    // If this is a revision, don't allow modifying approved permissions
    if (existingRequest?.permissionApprovals[permissionName]?.status === 'approved') {
      return;
    }

    setSelectedPermissions(
      selectedPermissions.map((p) =>
        p.name === permissionName ? { ...p, [field]: value } : p
      )
    );
  };

  const handleRequirementChange = (
    permission: string,
    field: keyof AdditionalRequirements,
    value: any
  ) => {
    // If this is a revision, don't allow modifying approved permissions
    if (existingRequest?.permissionApprovals[permission]?.status === 'approved') {
      return;
    }

    setAdditionalRequirements(
      additionalRequirements.map((r) =>
        r.permission === permission ? { ...r, [field]: value } : r
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ReviseLogic 
        onPermissionsLoad={setSelectedPermissions}
        onRequirementsLoad={setAdditionalRequirements}
      />

      <div className="bg-blue-600 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {existingRequest ? 'Revise Graph Permissions' : 'Request Graph Permissions'}
            </h1>
            <p className="text-blue-100">
              {existingRequest 
                ? 'Update and resubmit denied permissions while keeping approved ones.'
                : 'Select and configure the permissions you need for your application.'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <RequestSearch onSelectRequest={handleRequestSelect} />

        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Select Permissions
        </h2>
        <PermissionSelect
          selectedPermissions={selectedPermissions}
          onSelect={handlePermissionSelect}
          existingApprovals={existingRequest?.permissionApprovals}
        />

        {selectedPermissions.length > 0 && (
          <>
            <PermissionTable
              permissions={selectedPermissions}
              onPermissionChange={handlePermissionChange}
              existingApprovals={existingRequest?.permissionApprovals}
            />
            {additionalRequirements.length > 0 && (
              <PermissionAdditionalReq
                requirements={additionalRequirements}
                onRequirementChange={handleRequirementChange}
                existingApprovals={existingRequest?.permissionApprovals}
              />
            )}
            <SubmitField
              selectedPermissions={selectedPermissions}
              additionalRequirements={additionalRequirements}
            />
          </>
        )}
      </div>
    </div>
  );
}