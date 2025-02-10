import { X, XCircle, User, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '../utils';
import type { Request } from '../types';
import { getApproverByStage } from '../../../utils/ApproverLogic';

interface StatusModalProps {
  request: Request;
  permission: string;
  onClose: () => void;
  onRevise: () => void;
}

export function StatusModal({ request, permission, onClose, onRevise }: StatusModalProps) {
  const [copied, setCopied] = useState(false);
  const approvalStatus = request.permissionApprovals[permission];
  const denialEntry = approvalStatus?.history.find(entry => 
    entry.status.toLowerCase() === 'denied' && 
    !entry.comment?.includes('Automatically denied')
  );

  if (!denialEntry) {
    return null;
  }

  const approver = getApproverByStage(denialEntry.stage);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(request.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium text-gray-900">
              Status History for {permission}
            </h3>
            <div className="flex items-center space-x-2 ml-4">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                {request.id}
              </code>
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                title={copied ? "Copied!" : "Copy request ID"}
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900">
                    {approver?.name || denialEntry.stage}
                  </h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Denied
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {approver?.role || 'Approver'}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {formatDate(denialEntry.date)}
                </p>
                {denialEntry.comment && (
                  <div className="mt-4 bg-white rounded-md p-4 border border-red-200">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Denial Reason:
                    </p>
                    <p className="text-sm text-gray-600">
                      {denialEntry.comment}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
          <button
            onClick={onRevise}
            className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Revise Permission
          </button>
        </div>
      </div>
    </div>
  );
}