import { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex items-center"
      >
        {children}
        <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 px-3 py-2 mt-1 text-sm text-white bg-gray-900 rounded-lg shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
}