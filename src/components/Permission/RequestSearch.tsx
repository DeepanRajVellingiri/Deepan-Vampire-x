import { useState } from 'react';
import { Search, X, ArrowUpRight, ExternalLink } from 'lucide-react';
import { useRequests } from '../../context/RequestContext';
import { formatDate } from '../Dashboard/utils';
import { useNavigate } from 'react-router-dom';

interface RequestSearchProps {
  onSelectRequest: (requestId: string) => void;
}

export function RequestSearch({ onSelectRequest }: RequestSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { state: { requests } } = useRequests();
  const navigate = useNavigate();

  const filteredRequests = requests
    .filter(request => 
      request.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5); // Limit to 5 results

  const handleRequestClick = (requestId: string, status: string) => {
    if (status === 'denied') {
      onSelectRequest(requestId);
    } else {
      navigate(`/dashboard?requestId=${requestId}`);
    }
    setSearchQuery('');
    setIsOpen(false);
  };

  const getRevisionVersion = (history: any[]) => {
    const revisionCount = history.filter(h => 
      h.comment?.includes('Request resubmitted for approval')
    ).length;
    
    return revisionCount > 0 ? ` • Rev.${revisionCount}` : '';
  };

  const getDeniedPermissions = (request: any) => {
    return Object.entries(request.permissionApprovals)
      .filter(([_, status]: [string, any]) => status.status === 'denied')
      .map(([permission]: [string, any]) => permission);
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search requests by ID..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
          </button>
        )}
      </div>

      {isOpen && searchQuery && filteredRequests.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
          <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {filteredRequests.map((request) => {
              const deniedPermissions = getDeniedPermissions(request);
              const hasEditablePermissions = deniedPermissions.length > 0;

              return (
                <li
                  key={request.id}
                  className={`cursor-pointer hover:bg-gray-50 px-4 py-2 ${
                    hasEditablePermissions ? 'hover:bg-red-50' : ''
                  }`}
                  onClick={() => handleRequestClick(request.id, hasEditablePermissions ? 'denied' : request.status)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">
                          {request.id}
                        </p>
                        {request.history.length > 1 && (
                          <span className="text-xs text-gray-500">
                            {getRevisionVersion(request.history)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        Submitted {formatDate(request.submittedDate)}
                      </p>
                      {hasEditablePermissions && (
                        <div className="mt-1 text-xs text-red-600">
                          {deniedPermissions.length} denied permission{deniedPermissions.length > 1 ? 's' : ''} can be revised
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        request.status === 'denied' ? 'bg-red-100 text-red-800' :
                        request.status === 'implemented' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                      {hasEditablePermissions ? (
                        <div className="flex items-center text-xs text-blue-600">
                          <span className="mr-1">Edit</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </div>
                      ) : (
                        <div className="flex items-center text-xs text-blue-600">
                          <span className="mr-1">View</span>
                          <ExternalLink className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}