import React, { Fragment, useState } from 'react';
import { ExternalLink, CheckCircle2, XCircle, Clock, Lock } from 'lucide-react';
import { RequestApproval } from '../RequestApproval';
import { downloadFile } from '../../Permission/StoringDataCache';
import { getApproversForRequest, getApproverStatus, getApproverByStage } from '../../../utils/ApproverLogic';
import { approvalStatusCache } from '../../../utils/ApprovalStatusCache';
import type { Request } from '../../Dashboard/types';

interface SelectedPermissionsProps {
  request: Request;
  onSelectPermission?: (permission: string) => void;
  selectedPermission?: string;
}

export function SelectedPermissions({ request, onSelectPermission, selectedPermission }: SelectedPermissionsProps) {
  const [showApprovalForm, setShowApprovalForm] = useState<string | null>(null);

  const isPermissionLocked = (permission: string) => {
    return approvalStatusCache.isApproved(request.id, permission);
  };

  const handleAction = (permission: string) => {
    // Don't allow actions on locked permissions
    if (isPermissionLocked(permission)) return;
    setShowApprovalForm(permission);
  };

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-2">Selected Permissions</h4>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permission
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                App/Del
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status & Current Stage
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requirements
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Review
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {request.permissions.map((permission) => {
              const approvalStatus = request.permissionApprovals[permission];
              const additionalReq = request.additionalRequirements?.find(
                req => req.permission === permission
              );
              const approvers = getApproversForRequest([permission]);
              const canApprove = approvalStatus?.status === 'pending' && !isPermissionLocked(permission);
              const currentApprover = getApproverByStage(approvalStatus?.currentStage);
              const isLocked = isPermissionLocked(permission);
              
              return (
                <Fragment key={permission}>
                  <tr 
                    onClick={() => onSelectPermission?.(permission)}
                    className={`${onSelectPermission ? 'cursor-pointer hover:bg-gray-50' : ''} ${
                      selectedPermission === permission ? 'bg-blue-50' : ''
                    } ${isLocked ? 'bg-gray-50' : ''}`}
                  >
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        <span>{permission}</span>
                        {isLocked && <Lock className="ml-2 h-4 w-4 text-gray-400" />}
                        <a
                          href={`https://learn.microsoft.com/en-us/graph/permissions-reference`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 text-blue-600 hover:text-blue-800"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                      {request.permissionTypes?.[permission]?.isApplication ? 'A' : '-'}/
                      {request.permissionTypes?.[permission]?.isDelegated ? 'D' : '-'}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            approvalStatus?.status === 'approved' ? 'bg-green-100 text-green-800' :
                            approvalStatus?.status === 'denied' ? 'bg-red-100 text-red-800' :
                            approvalStatus?.status === 'implemented' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {approvalStatus?.status || 'pending'}
                          </span>
                        </div>
                        {currentApprover && !isLocked && (
                          <div className="flex items-center text-xs">
                            <span className={`font-medium ${approvalStatus?.status === 'pending' ? 'text-blue-600' : 'text-gray-500'}`}>
                              {currentApprover.role}:
                            </span>
                            <span className="ml-1 text-gray-600">
                              {currentApprover.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {additionalReq && (
                        <div className="flex flex-wrap gap-1">
                          {additionalReq.needs.map((need) => (
                            <span
                              key={need}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {need}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {approvers.map((approver) => {
                            const status = getApproverStatus(
                              approver,
                              approvalStatus?.currentStage,
                              approvalStatus?.status,
                              approvalStatus?.history || []
                            );
                            
                            return (
                              <div
                                key={approver.uniqueId}
                                className={`w-2 h-2 rounded-full ${
                                  status === 'approved' ? 'bg-green-500' :
                                  status === 'denied' ? 'bg-red-500' :
                                  status === 'current' ? 'bg-blue-500' :
                                  'bg-gray-300'
                                }`}
                                title={`${approver.name} (${approver.role}): ${status}`}
                              />
                            );
                          })}
                        </div>
                        {canApprove && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(permission);
                            }}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 hover:bg-blue-200"
                          >
                            Review
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {showApprovalForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full m-4">
            <div className="p-6">
              <RequestApproval
                request={request}
                permission={showApprovalForm}
                onClose={() => setShowApprovalForm(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}