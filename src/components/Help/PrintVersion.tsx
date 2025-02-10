import { Printer } from 'lucide-react';

interface PrintVersionProps {
  content: React.ReactNode;
}

export function PrintVersion({ content }: PrintVersionProps) {
  return (
    <div>
      <button
        onClick={() => window.print()}
        className="print:hidden inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Printer className="h-5 w-5 mr-2" />
        Print this page
      </button>

      <div className="hidden print:block">
        <div className="prose max-w-none">
          {content}
        </div>
      </div>
    </div>
  );
}