import type { AdditionalRequirements } from './PermissionType';

interface PermissionAdditionalReqProps {
  requirements: AdditionalRequirements[];
  onRequirementChange: (
    permission: string,
    field: keyof AdditionalRequirements,
    value: any
  ) => void;
}

export function PermissionAdditionalReq({
  requirements,
  onRequirementChange,
}: PermissionAdditionalReqProps) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Additional Requirements
      </h3>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Permission
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Requirements
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Attachment
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Link
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      List of Sites
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {requirements.map((req) => (
                    <tr key={req.permission}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {req.permission}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex gap-2">
                          {req.needs.map((need) => (
                            <span
                              key={need}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {need}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <input
                          type="file"
                          onChange={(e) =>
                            onRequirementChange(
                              req.permission,
                              'attachment',
                              e.target.files?.[0]
                            )
                          }
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <input
                          type="url"
                          value={req.link || ''}
                          onChange={(e) =>
                            onRequirementChange(
                              req.permission,
                              'link',
                              e.target.value
                            )
                          }
                          placeholder="Enter URL..."
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <input
                          type="text"
                          value={req.sites?.join(', ') || ''}
                          onChange={(e) =>
                            onRequirementChange(
                              req.permission,
                              'sites',
                              e.target.value.split(',').map((s) => s.trim())
                            )
                          }
                          placeholder="Enter sites (comma-separated)..."
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}