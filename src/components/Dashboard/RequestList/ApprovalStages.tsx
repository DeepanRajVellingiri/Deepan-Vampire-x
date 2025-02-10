import { Clock, CheckCircle2, XCircle, ArrowRight, AlertCircle, User } from 'lucide-react';
import { getApproversForRequest, getApproverStatus } from '../../../utils/ApproverLogic';
import { formatDate } from '../utils';
import type { Request } from '../types';
import { memo, useMemo } from 'react';

interface StageIconProps {
  status: 'approved' | 'denied' | 'current' | 'pending';
  className?: string;
}

const StageIcon = memo(({ status, className = '' }: StageIconProps) => {
  switch (status) {
    case 'approved':
      return <CheckCircle2 className={`${className} text-green-500`} />;
    case 'denied':
      return <XCircle className={`${className} text-red-500`} />;
    case 'current':
      return <Clock className={`${className} text-blue-500`} />;
    default:
      return <Clock className={`${className} text-gray-400`} />;
  }
});

StageIcon.displayName = 'StageIcon';

interface StageTooltipProps {
  approver: {
    role: string;
    name: string;
  };
  historyEntry?: {
    date: string;
    comment?: string;
    status: string;
  };
  status: string;
}

const StageTooltip = memo(({ approver, historyEntry, status }: StageTooltipProps) => (
  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10">
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-xs">
      <div className="flex items-center gap-2 mb-2">
        <User className="h-4 w-4 text-gray-400" />
        <div>
          <div className="text-sm font-medium">{approver.name}</div>
          <div className="text-xs text-gray-400">{approver.role}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
          status === 'approved' ? 'bg-green-900/50 text-green-200' :
          status === 'denied' ? 'bg-red-900/50 text-red-200' :
          status === 'current' ? 'bg-blue-900/50 text-blue-200' :
          'bg-gray-800 text-gray-200'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        {historyEntry?.date && (
          <span className="text-xs text-gray-400">
            {formatDate(historyEntry.date)}
          </span>
        )}
      </div>
      {historyEntry?.comment && (
        <div className="mt-2 text-xs text-gray-300 border-t border-gray-700 pt-2">
          {historyEntry.comment}
        </div>
      )}
    </div>
    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-1">
      <div className="border-8 border-transparent border-t-gray-900"></div>
    </div>
  </div>
));

StageTooltip.displayName = 'StageTooltip';

interface ApprovalStageProps {
  approver: any;
  status: 'approved' | 'denied' | 'current' | 'pending';
  historyEntry?: any;
  isLast: boolean;
  isFirst: boolean;
}

const ApprovalStage = memo(({ approver, status, historyEntry, isLast, isFirst }: ApprovalStageProps) => {
  const stageStyles = useMemo(() => {
    const styles = {
      container: 'flex-1',
      icon: {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        label: 'text-gray-500',
        gradient: 'from-gray-200 to-gray-200',
        ring: '',
        animation: ''
      }
    };

    switch (status) {
      case 'approved':
        styles.icon = {
          bg: 'bg-green-50',
          border: 'border-green-200',
          label: 'text-green-700',
          gradient: 'from-green-500 to-green-500',
          ring: '',
          animation: ''
        };
        break;
      case 'denied':
        styles.icon = {
          bg: 'bg-red-50',
          border: 'border-red-200',
          label: 'text-red-700',
          gradient: 'from-red-500 to-red-500',
          ring: '',
          animation: ''
        };
        break;
      case 'current':
        styles.icon = {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          label: 'text-blue-700',
          gradient: 'from-blue-500 to-gray-200',
          ring: 'ring-2 ring-blue-500 ring-offset-2',
          animation: 'animate-pulse'
        };
        break;
    }

    return styles;
  }, [status]);

  return (
    <div className={`flex items-center ${stageStyles.container}`}>
      <div className={`relative group flex-1 flex flex-col items-center ${isFirst ? 'ml-0' : ''} ${isLast ? 'mr-0' : ''}`}>
        <div className="flex flex-col items-center">
          <div 
            className={`w-10 h-10 rounded-full ${stageStyles.icon.bg} border-2 ${stageStyles.icon.border} 
              flex items-center justify-center shadow-sm transition-all duration-300 
              ${stageStyles.icon.ring} ${stageStyles.icon.animation} hover:scale-110`}
          >
            <StageIcon status={status} className="h-5 w-5" />
          </div>
          
          <div className="mt-2 flex flex-col items-center">
            <span className={`text-xs font-medium ${stageStyles.icon.label}`}>
              {approver.role}
            </span>
            <span className="text-xs text-gray-500">
              {approver.name}
            </span>
          </div>

          <StageTooltip 
            approver={approver} 
            historyEntry={historyEntry} 
            status={status}
          />
        </div>
      </div>

      {!isLast && (
        <div className="flex-1 flex items-center justify-center px-2">
          <ArrowRight className={`h-4 w-4 ${
            status === 'approved' ? 'text-green-500' :
            status === 'denied' ? 'text-red-500' :
            status === 'current' ? 'text-blue-500' :
            'text-gray-300'
          }`} />
        </div>
      )}
    </div>
  );
});

ApprovalStage.displayName = 'ApprovalStage';

interface ApprovalStagesProps {
  request: Request;
  permission: string;
}

export function ApprovalStages({ request, permission }: ApprovalStagesProps) {
  const approvers = useMemo(() => 
    getApproversForRequest([permission]), 
    [permission]
  );

  const approvalStatus = request.permissionApprovals[permission];

  if (!approvalStatus) {
    return (
      <div className="py-4 px-6 flex items-center justify-center text-gray-500">
        <AlertCircle className="h-5 w-5 mr-2" />
        <span>No approval status available</span>
      </div>
    );
  }

  return (
    <div className="py-4 px-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              approvalStatus.status === 'approved' ? 'bg-green-100 text-green-800' :
              approvalStatus.status === 'denied' ? 'bg-red-100 text-red-800' :
              approvalStatus.status === 'implemented' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {approvalStatus.status.charAt(0).toUpperCase() + approvalStatus.status.slice(1)}
            </span>
            <span className="text-sm text-gray-500">
              Submitted: {formatDate(request.submittedDate)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          {approvers.map((approver, index) => {
            const status = getApproverStatus(
              approver,
              approvalStatus.currentStage,
              approvalStatus.status,
              approvalStatus.history
            );

            const historyEntry = approvalStatus.history.find(
              h => h.stage === approver.role
            );

            return (
              <ApprovalStage
                key={approver.uniqueId}
                approver={approver}
                status={status}
                historyEntry={historyEntry}
                isFirst={index === 0}
                isLast={index === approvers.length - 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}