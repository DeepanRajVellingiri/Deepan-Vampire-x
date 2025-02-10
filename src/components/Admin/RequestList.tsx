import { useState } from 'react';
import { Clock, CheckCircle2, XCircle, Cog } from 'lucide-react';
import { formatDate } from '../Dashboard/utils';
import type { Request } from '../types';
import { RequestDetails } from './RequestDetails/RequestDetails';
import { getApproverByStage } from '../../utils/ApproverLogic';

interface RequestListProps {
  requests: Request[];
}

export function RequestList({ requests }: RequestListProps) {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No requests found</p>
      </div>
    );
  }

  const getStatusDetails = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return {
          Icon: CheckCircle2,
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          iconColor: 'text-green-500',
          label: 'Approved'
        };
      case 'denied':
        return {
          Icon: XCircle,
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          iconColor: 'text-red-500',
          label: 'Denied'
        };
      case 'implemented':
        return {
          Icon: Cog,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-500',
          label: 'Implemented'
        };
      default:
        return {
          Icon: Clock,
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-500',
          label: 'Pending'
        };
    }
  };

  const getRevisionVersion = (request: Request) => {
    const revisionCount = request.history.filter((h: { comment: string | string[]; }) => 
      h.comment?.includes('Request resubmitted for approval')
    ).length;
    
    return revisionCount > 0 ? `-v${revisionCount}` : '';
  };

  return (
    <div className="space-y-4">
      {requests.map((request) => {
        const { Icon, bgColor, textColor, iconColor, label } = getStatusDetails(request.status);
        const currentApprover = getApproverByStage(request.currentStage);

        return (
          <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {request.id}
                        <span className="text-sm font-normal text-gray-500">
                          {getRevisionVersion(request)}
                        </span>
                      </h3>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor} mt-1`}>
                      {label}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {selectedRequest === request.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Current Stage</p>
                  {currentApprover && (
                    <div className="mt-1">
                      <p className="text-sm font-medium text-gray-900">
                        {currentApprover.role} - {currentApprover.name}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submitted</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {formatDate(request.submittedDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Permissions</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {request.permissions.length} selected
                  </p>
                </div>
              </div>

              {selectedRequest === request.id && (
                <RequestDetails
                  request={request}
                  isSelected={true}
                  onToggleDetails={() => setSelectedRequest(null)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}