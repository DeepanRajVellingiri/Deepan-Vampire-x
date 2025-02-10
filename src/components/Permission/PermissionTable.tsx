import { ExternalLink, Lock } from 'lucide-react';
import type { SelectedPermission } from './PermissionType';
import { useLocation } from 'react-router-dom';

interface PermissionTableProps {
  permissions: SelectedPermission[];
  onPermissionChange: (
    permissionName: string,
    field: keyof SelectedPermission,
    value: any
  ) => void;
  existingApprovals?: Record<string, { status: string }>;
}

export function PermissionTable({
  permissions,
  onPermissionChange,
  existingApprovals
}: PermissionTableProps) {
  const location = useLocation();
  const state = location.state as { requestId?: string };
  const isRevision = Boolean(state?.requestId);

  const getNotice = (permission: SelectedPermission) => {
    if (permission.isApplication && permission.isDelegated) {
      return 'Why selecting both Application and Delegated?';
    }
    return permission.notice;
  };

  const isPermissionLocked = (permissionName: string) => {
    if (!isRevision || !existingApprovals) return false;
    const status = existingApprovals[permissionName]?.status;
    return status === 'approved' || status === 'implemented';
  };

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Permission
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Application
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Delegated
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Justification
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Notice
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {permissions.map((permission) => {
                  const isLocked = isPermissionLocked(permission.name);
                  const status = existingApprovals?.[permission.name]?.status;

                  return (
                    <tr
                      key={permission.name}
                      className={`${
                        permission.isApplication && permission.isDelegated
                          ? 'bg-red-50'
                          : isLocked ? 'bg-gray-50' : ''
                      }`}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div className="flex items-center">
                          <span>{permission.name}</span>
                          <a
                            href={`https://learn.microsoft.com/en-us/graph/permissions-reference`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 inline-flex items-center ml-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                          {isLocked && (
                            <Lock className="h-4 w-4 text-gray-400 ml-2" />
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {status && (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            status === 'approved' ? 'bg-green-100 text-green-800' :
                            status === 'denied' ? 'bg-red-100 text-red-800' :
                            status === 'implemented' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {status}
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <input
                          type="checkbox"
                          checked={permission.isApplication}
                          onChange={(e) =>
                            onPermissionChange(
                              permission.name,
                              'isApplication',
                              e.target.checked
                            )
                          }
                          disabled={isLocked}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <input
                          type="checkbox"
                          checked={permission.isDelegated}
                          onChange={(e) =>
                            onPermissionChange(
                              permission.name,
                              'isDelegated',
                              e.target.checked
                            )
                          }
                          disabled={isLocked}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <input
                          type="text"
                          value={permission.justification || ''}
                          onChange={(e) =>
                            onPermissionChange(
                              permission.name,
                              'justification',
                              e.target.value
                            )
                          }
                          disabled={isLocked}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100 disabled:opacity-75"
                          placeholder="Enter justification..."
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                        {getNotice(permission)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}