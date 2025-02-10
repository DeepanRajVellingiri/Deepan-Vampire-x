import { ChevronDown, ChevronUp, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { formatDate } from './utils';
import type { Request } from './types';
import { getApproversForRequest } from '../../utils/ApproverLogic';

interface RequestItemProps {
  request: Request;
  isSelected: boolean;
  onToggleDetails: () => void;
}

export function RequestItem({ request, isSelected, onToggleDetails }: RequestItemProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    denied: 'bg-red-100 text-red-800'
  };

  const approvers = getApproversForRequest(request.permissions);
  const currentStageIndex = approvers.findIndex(a => a.id === request.currentStage);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-medium text-gray-900">{request.id}</h3>
          </div>
          <button
            onClick={onToggleDetails}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            {isSelected ? (
              <>
                Hide details
                <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                View details
                <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${statusColors[request.status]}`}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Stage</p>
            <p className="text-sm font-medium text-gray-900 mt-1 capitalize">
              {request.currentStage.replace('-', ' ')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Submitted</p>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {formatDate(request.submittedDate)}
            </p>
          </div>
        </div>

        {isSelected && (
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Requested Permissions</h4>
              <div className="space-y-2">
                {request.permissions.map((permission) => (
                  <div key={permission} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {permission}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Approval History</h4>
              <div className="space-y-3">
                {request.history.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{item.stage}</span> - {item.status}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                      {item.comment && (
                        <p className="text-sm text-gray-600 mt-1">{item.comment}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}