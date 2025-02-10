import { MessageSquare } from 'lucide-react';
import { formatDate } from '../Dashboard/utils';
import type { Request } from '../Dashboard/types';

interface ApproveCommentsProps {
  request: Request;
}

export function ApproveComments({ request }: ApproveCommentsProps) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-2">Approval History</h4>
      <div className="space-y-4">
        {request.history.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {item.stage}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(item.date)}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  Status: <span className="font-medium">{item.status}</span>
                </p>
                {item.comment && (
                  <p className="mt-2 text-sm text-gray-600">
                    {item.comment}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}