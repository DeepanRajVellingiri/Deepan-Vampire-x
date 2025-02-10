import { ExternalLink, FileIcon } from 'lucide-react';
import { downloadFile } from '../../Permission/StoringDataCache';
import type { Request } from '../types';

interface PermissionRequirementsProps {
  additionalReq: NonNullable<Request['additionalRequirements']>[0];
}

export function PermissionRequirements({ additionalReq }: PermissionRequirementsProps) {
  return (
    <div className="space-y-1">
      <div className="flex flex-wrap gap-1">
        {additionalReq.needs.map((need) => (
          <span key={need} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {need}
          </span>
        ))}
      </div>
      <div className="flex items-center space-x-2 text-xs">
        {additionalReq.attachment && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              downloadFile(additionalReq.attachment!);
            }}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <FileIcon className="h-3 w-3 mr-1" />
            <span className="truncate max-w-[100px]">
              {additionalReq.attachment.name}
            </span>
          </button>
        )}
        {additionalReq.link && (
          <a
            href={additionalReq.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-blue-600 hover:text-blue-800 inline-flex items-center"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Link
          </a>
        )}
      </div>
      {additionalReq.sites && additionalReq.sites.length > 0 && (
        <div className="text-xs text-gray-500">
          Sites: {additionalReq.sites.join(', ')}
        </div>
      )}
    </div>
  );
}