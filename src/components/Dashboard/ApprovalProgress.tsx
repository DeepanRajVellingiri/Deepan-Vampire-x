import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { getApproversForRequest, getApproverStatus } from '../../utils/ApproverLogic';
import type { Request } from './types';

interface ApprovalProgressProps {
  request: Request;
}

export function ApprovalProgress({ request }: ApprovalProgressProps) {
  const approvers = getApproversForRequest(request.permissions);

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Approval Progress</h3>
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        {approvers.map((approver, index) => {
          const status = getApproverStatus(
            approver,
            request.currentStage,
            request.status,
            request.history
          );

          let Icon = Clock;
          let bgColor = 'bg-gray-100';
          let textColor = 'text-gray-500';
          let lineColor = 'bg-gray-200';

          switch (status) {
            case 'approved':
              Icon = CheckCircle2;
              bgColor = 'bg-green-100';
              textColor = 'text-green-700';
              lineColor = 'bg-green-200';
              break;
            case 'denied':
              Icon = XCircle;
              bgColor = 'bg-red-100';
              textColor = 'text-red-700';
              lineColor = 'bg-red-200';
              break;
            case 'current':
              bgColor = 'bg-blue-100';
              textColor = 'text-blue-700';
              break;
          }

          return (
            <div key={approver.uniqueId} className="flex items-center flex-shrink-0">
              <div className={`flex flex-col items-center ${textColor}`}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${bgColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium">{approver.name}</div>
                  <div className="text-xs text-gray-500">{approver.role}</div>
                </div>
              </div>
              {index < approvers.length - 1 && (
                <div className={`hidden sm:block h-0.5 w-16 ${lineColor} ml-4`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}