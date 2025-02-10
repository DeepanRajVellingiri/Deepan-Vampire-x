import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { getApproversForRequest, getApproverStatus } from '../../../utils/ApproverLogic';
import type { Request } from '../../Dashboard/types';

interface ApprovalProgressProps {
  request: Request;
  permission: string;
}

export function ApprovalProgress({ request, permission }: ApprovalProgressProps) {
  const approvers = getApproversForRequest([permission]);
  const approvalStatus = request.permissionApprovals[permission];

  if (!approvalStatus) {
    return (
      <div className="text-sm text-gray-500">
        No approval status available for this permission
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-4">Approval Progress for {permission}</h4>
      <div className="flex items-center justify-between">
        {approvers.map((approver, index) => {
          const status = getApproverStatus(
            approver,
            approvalStatus.currentStage,
            approvalStatus.status,
            approvalStatus.history
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

          const historyEntry = approvalStatus.history.find(
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
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(historyEntry.date).toLocaleDateString()}
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
}