import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { getApproversForRequest, getApproverStatus } from '../../utils/ApproverLogic';
import type { Request } from './types';

interface ApproversDisplayProps {
  request: Request;
}

export function ApproversDisplay({ request }: ApproversDisplayProps) {
  const approvers = getApproversForRequest(request.permissions);

  if (approvers.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No approvers assigned
      </div>
    );
  }

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
          let statusLabel = 'Pending';

          switch (status) {
            case 'approved':
              Icon = CheckCircle2;
              bgColor = 'bg-green-100';
              textColor = 'text-green-700';
              lineColor = 'bg-green-200';
              statusLabel = 'Approved';
              break;
            case 'denied':
              Icon = XCircle;
              bgColor = 'bg-red-100';
              textColor = 'text-red-700';
              lineColor = 'bg-red-200';
              statusLabel = 'Denied';
              break;
            case 'current':
              Icon = Clock;
              bgColor = 'bg-blue-100';
              textColor = 'text-blue-700';
              lineColor = 'bg-blue-200';
              statusLabel = 'In Review';
              break;
          }

          return (
            <div key={approver.uniqueId} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-full ${bgColor}`}>
                  <Icon className={`w-6 h-6 ${textColor}`} />
                </div>
                <div className="mt-2 text-center min-w-[120px]">
                  <div className="text-sm font-medium text-gray-900">{approver.name}</div>
                  <div className="text-xs text-gray-500">{approver.role}</div>
                  <div className={`mt-1 text-xs font-medium ${textColor}`}>
                    {statusLabel}
                  </div>
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

export function ApprovalDisplay({ request }: { request: Request }) {
  const approvers = getApproversForRequest(request.permissions);

  if (approvers.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No approvers assigned
      </div>
    );
  }

  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          Icon: CheckCircle2,
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          borderColor: 'border-green-200',
          label: 'Approved'
        };
      case 'denied':
        return {
          Icon: XCircle,
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          label: 'Denied'
        };
      case 'current':
        return {
          Icon: Clock,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
          label: 'In Review'
        };
      default:
        return {
          Icon: Clock,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-500',
          borderColor: 'border-gray-200',
          label: 'Pending'
        };
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Approval Progress</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {approvers.map((approver, index) => {
          const status = getApproverStatus(
            approver,
            request.currentStage,
            request.status,
            request.history
          );

          const { Icon, bgColor, textColor, borderColor, label } = getStatusDetails(status);

          const historyEntry = request.history.find(h => h.stage === approver.role);

          return (
            <div
              key={approver.uniqueId}
              className={`relative rounded-lg border ${borderColor} p-4 ${bgColor} bg-opacity-10`}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 ${bgColor} rounded-full p-2`}>
                  <Icon className={`w-6 h-6 ${textColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {approver.name}
                    </p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
                      {label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{approver.role}</p>
                  {historyEntry && historyEntry.comment && (
                    <p className="mt-2 text-sm text-gray-600">
                      {historyEntry.comment}
                    </p>
                  )}
                  {historyEntry && (
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(historyEntry.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}