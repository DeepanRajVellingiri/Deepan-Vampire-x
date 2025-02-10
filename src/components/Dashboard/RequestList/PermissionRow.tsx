import { ExternalLink, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { getApproverByStage, getApproversForRequest, getApproverStatus } from '../../../utils/ApproverLogic';
import { PermissionRequirements } from './PermissionRequirements';
import { ApprovalStages } from './ApprovalStages';
import type { Request } from '../types';

interface PermissionRowProps {
  permission: string;
  request: Request;
  onStatusClick: (e: React.MouseEvent, permission: string) => void;
}

export function PermissionRow({ permission, request, onStatusClick }: PermissionRowProps) {
  const [showStages, setShowStages] = useState(false);
  const approvalStatus = request.permissionApprovals[permission];
  const currentApprover = getApproverByStage(approvalStatus?.currentStage);
  const additionalReq = request.additionalRequirements?.find(
    req => req.permission === permission
  );

  const denialEntry = approvalStatus?.history.find(h => 
    h.status.toLowerCase() === 'denied' && 
    !h.comment?.includes('Automatically denied')
  );

  const toggleStages = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowStages(!showStages);
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
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
          {request.permissionTypes?.[permission]?.isApplication ? 'Yes' : 'No'}/
          {request.permissionTypes?.[permission]?.isDelegated ? 'Yes' : 'No'}
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => onStatusClick(e, permission)}
                className="flex items-center space-x-2 hover:bg-gray-50 rounded p-1 transition-colors"
              >
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  approvalStatus?.status === 'approved' ? 'bg-green-100 text-green-800' :
                  approvalStatus?.status === 'denied' ? 'bg-red-100 text-red-800' :
                  approvalStatus?.status === 'implemented' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {approvalStatus?.status || 'pending'}
                </span>
                {denialEntry && (
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                )}
              </button>
              <button
                onClick={toggleStages}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                {showStages ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="ml-1">Stages</span>
              </button>
            </div>

            {currentApprover && approvalStatus?.status !== 'denied' && (
              <div className="flex items-center text-xs">
                <span className="font-medium text-gray-900">
                  {currentApprover.role}:
                </span>
                <span className="ml-1 text-gray-600">
                  {currentApprover.name}
                </span>
              </div>
            )}
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">
          {additionalReq && <PermissionRequirements additionalReq={additionalReq} />}
        </td>
      </tr>
      {showStages && (
        <tr>
          <td colSpan={4} className="px-6 py-4 bg-gray-50">
            <ApprovalStages request={request} permission={permission} />
          </td>
        </tr>
      )}
    </>
  );
}