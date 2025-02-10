import { useState, Fragment } from 'react';
import { ExternalLink, Clock, CheckCircle2, XCircle, FileText } from 'lucide-react';
import type { Request } from './types';
import { formatDate } from './utils';
import { getApproversForRequest, getApproverStatus, getApproverByStage } from '../../utils/ApproverLogic';
import { downloadFile } from '../Permission/StoringDataCache';

interface PermissionDetailsProps {
  request: Request;
}

export function PermissionDetails({ request }: PermissionDetailsProps) {
  const [selectedPermission, setSelectedPermission] = useState<string | null>(null);

  const renderApprovalProgress = (permission: string) => {
    const approvers = getApproversForRequest([permission]);
    const approvalStatus = request.permissionApprovals[permission];
    const currentApprover = getApproverByStage(approvalStatus?.currentStage);

    return (
      <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-900">Approval Progress for {permission}</h4>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            approvalStatus?.status === 'approved' ? 'bg-green-100 text-green-800' :
            approvalStatus?.status === 'denied' ? 'bg-red-100 text-red-800' :
            approvalStatus?.status === 'implemented' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {approvalStatus?.status || 'pending'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          {approvers.map((approver, index) => {
            const status = getApproverStatus(
              approver,
              approvalStatus?.currentStage,
              approvalStatus?.status,
              approvalStatus?.history || []
            );

            let Icon = Clock;
            let bgColor = 'bg-gray-100';
            let iconColor = 'text-gray-400';
            let lineColor = 'bg-gray-200';

            switch (status) {
              case 'approved':
                Icon = CheckCircle2;
                bgColor = 'bg-green-100';
                iconColor = 'text-green-600';
                lineColor = 'bg-green-200';
                break;
              case 'denied':
                Icon = XCircle;
                bgColor = 'bg-red-100';
                iconColor = 'text-red-600';
                lineColor = 'bg-red-200';
                break;
              case 'current':
                bgColor = 'bg-blue-100';
                iconColor = 'text-blue-600';
                break;
            }

            const historyEntry = approvalStatus?.history.find(
              h => h.stage === approver.role
            );

            return (
              <div key={approver.uniqueId} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${bgColor}`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-gray-900">{approver.name}</p>
                    <p className="text-xs text-gray-500">{approver.role}</p>
                    {historyEntry && (
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(historyEntry.date)}
                      </p>
                    )}
                    {historyEntry?.comment && (
                      <p className="text-xs text-gray-500 mt-1 max-w-[200px] truncate" title={historyEntry.comment}>
                        "{historyEntry.comment}"
                      </p>
                    )}
                  </div>
                </div>
                {index < approvers.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-4 ${lineColor}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-6 space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Selected Permissions</h4>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permission
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delegated
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {request.permissions.map((permission) => {
                const approvalStatus = request.permissionApprovals[permission];
                const currentApprover = getApproverByStage(approvalStatus?.currentStage);

                return (
                  <Fragment key={permission}>
                    <tr 
                      className={`cursor-pointer hover:bg-gray-50 ${selectedPermission === permission ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedPermission(selectedPermission === permission ? null : permission)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <span>{permission}</span>
                          <a
                            href={`https://learn.microsoft.com/en-us/graph/permissions-reference`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 inline-flex items-center ml-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.permissionTypes?.[permission]?.isApplication ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.permissionTypes?.[permission]?.isDelegated ? 'Yes' : 'No'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {currentApprover ? (
                          <div className="flex flex-col">
                            <span className="font-medium">{currentApprover.role}</span>
                            <span className="text-gray-500 text-xs">{currentApprover.name}</span>
                          </div>
                        ) : '-'}
                      </td>
                    </tr>
                    {selectedPermission === permission && (
                      <tr>
                        <td colSpan={4} className="px-6 py-4">
                          {renderApprovalProgress(permission)}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {request.additionalRequirements && request.additionalRequirements.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Requirements</h4>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permission
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requirements
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attachment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Link
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    List of Sites
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {request.additionalRequirements.map((req, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {req.permission}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-2">
                        {req.needs.map((need) => (
                          <span key={need} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {need}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.attachment ? (
                        <button
                          onClick={() => downloadFile(req.attachment!)}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          <span>{req.attachment.name}</span>
                        </button>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.link ? (
                        <a
                          href={req.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                        >
                          View Link
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.sites?.join(', ') || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}