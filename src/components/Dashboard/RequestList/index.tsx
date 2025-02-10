import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils';
import { StatusBadge } from './StatusBadge';
import { StatusModal } from './StatusModal';
import { PermissionRow } from './PermissionRow';
import type { Request } from '../types';

interface RequestListProps {
  requests: Request[];
}

export function RequestList({ requests }: RequestListProps) {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [statusModal, setStatusModal] = useState<{ requestId: string; permission: string } | null>(null);
  const navigate = useNavigate();

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No requests found</p>
      </div>
    );
  }

  const handleStatusClick = (e: React.MouseEvent, requestId: string, permission: string) => {
    e.stopPropagation();
    setStatusModal({ requestId, permission });
  };

  const handleRevisePermission = () => {
    navigate('/', { state: { revisePermission: statusModal?.permission } });
  };

  const getRevisionVersion = (request: Request) => {
    const revisionCount = request.history.filter(h => 
      h.comment?.includes('Request resubmitted for approval')
    ).length;
    
    return revisionCount > 0 ? `-v${revisionCount}` : '';
  };

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <StatusBadge status={request.status} />
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {request.id}
                      <span className="text-sm font-normal text-gray-500">
                        {getRevisionVersion(request)}
                      </span>
                    </h3>
                  </div>
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
              <div>
                <p className="text-sm text-gray-500">Overall Status</p>
                <p className="mt-1 text-sm font-medium text-gray-900 capitalize">
                  {request.status}
                </p>
              </div>
            </div>

            {selectedRequest === request.id && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Selected Permissions</h4>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Permission
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          App/Del
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status & Current Stage
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Requirements
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {request.permissions.map((permission) => (
                        <PermissionRow
                          key={permission}
                          permission={permission}
                          request={request}
                          onStatusClick={(e) => handleStatusClick(e, request.id, permission)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          {statusModal && request.id === statusModal.requestId && (
            <StatusModal
              request={request}
              permission={statusModal.permission}
              onClose={() => setStatusModal(null)}
              onRevise={handleRevisePermission}
            />
          )}
        </div>
      ))}
    </div>
  );
}