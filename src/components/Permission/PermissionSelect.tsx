import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Search, X, Lock } from 'lucide-react';
import { permissions } from '../../data/permissions';
import type { Permission, SelectedPermission } from './PermissionType';

interface PermissionSelectProps {
  selectedPermissions: SelectedPermission[];
  onSelect: (permission: Permission) => void;
  existingApprovals?: Record<string, { status: string }>;
}

export function PermissionSelect({ 
  selectedPermissions, 
  onSelect,
  existingApprovals 
}: PermissionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.permission.toLowerCase().includes(search.toLowerCase()) ||
      permission.description.toLowerCase().includes(search.toLowerCase())
  );

  const isSelected = (permission: { permission: string }) =>
    selectedPermissions.some((p) => p.name === permission.permission);

  const isPermissionLocked = (permissionName: string) => {
    if (!existingApprovals) return false;
    const status = existingApprovals[permissionName]?.status;
    return status === 'approved' || status === 'implemented' || status === 'pending';
  };

  const handleRemovePermission = (permissionName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // Don't allow removing locked permissions
    if (isPermissionLocked(permissionName)) return;

    const permission = permissions.find(p => p.permission === permissionName);
    if (permission) {
      onSelect({
        type: permission.type as 'Delegated' | 'Application',
        name: permission.permission,
        description: permission.description,
        glr: permission.glr,
        apiScan: permission.apiScan,
        asa: false
      });
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedPermissions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedPermissions.map((permission) => {
              const isLocked = isPermissionLocked(permission.name);
              return (
                <span
                  key={permission.name}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isLocked ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {permission.name}
                  {isLocked ? (
                    <Lock className="ml-1 h-3 w-3 text-gray-500" />
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleRemovePermission(permission.name, e)}
                      className="ml-1 inline-flex items-center p-0.5 hover:bg-blue-200 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              );
            })}
          </div>
        ) : (
          <span className="block truncate text-gray-500">Select permissions...</span>
        )}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown
            className={`h-5 w-5 text-gray-400 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </span>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-96 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <div className="sticky top-0 z-10 bg-white px-3 py-2">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search permissions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {filteredPermissions.map((permission) => {
            const isLocked = isPermissionLocked(permission.permission);
            const status = existingApprovals?.[permission.permission]?.status;

            return (
              <div
                key={permission.permission}
                className={`${
                  isSelected(permission) ? 'bg-blue-50' : 'hover:bg-gray-50'
                } cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                  isLocked ? 'opacity-75' : ''
                }`}
                onClick={() => !isLocked && onSelect({
                  type: permission.type as 'Delegated' | 'Application',
                  name: permission.permission,
                  description: permission.description,
                  glr: permission.glr,
                  apiScan: permission.apiScan,
                  asa: false
                })}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isSelected(permission)}
                    disabled={isLocked}
                    onChange={() => {}}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <span className="ml-3 block truncate font-medium">
                    {permission.permission}
                  </span>
                  {status && (
                    <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      status === 'approved' ? 'bg-green-100 text-green-800' :
                      status === 'denied' ? 'bg-red-100 text-red-800' :
                      status === 'implemented' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {status}
                    </span>
                  )}
                  {isLocked && (
                    <Lock className="ml-2 h-4 w-4 text-gray-400" />
                  )}
                </div>
                <span className="text-sm text-gray-500 ml-7">
                  {permission.description}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}