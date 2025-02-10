import { AlertCircle } from 'lucide-react';
import { formatDate } from '../utils';

interface DenialInfoProps {
  approver: string;
  role: string;
  date: string;
  comment?: string;
}

export function DenialInfo({ approver, role, date, comment }: DenialInfoProps) {
  return (
    <div className="bg-red-50 rounded-md p-3">
      <div className="flex">
        <AlertCircle className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <h4 className="text-sm font-medium text-red-800">
            Denied by {approver}
          </h4>
          <div className="mt-1 text-sm text-red-700">
            <p className="text-xs text-red-600">
              {role} • {formatDate(date)}
            </p>
            {comment && (
              <p className="mt-1 text-sm">
                Reason: {comment}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}