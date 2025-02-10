import { Shield } from 'lucide-react';
import { DateFilter } from './DateFilter';
import { RequestList } from './RequestList'; // Update import path
import { RequestMetrics } from '../Admin/RequestMetrics';
import { useFilters } from './useFilters';
import { downloadCSV } from './utils';
import { useRequests } from '../../context/RequestContext';

export function Dashboard() {
  const { state: { requests } } = useRequests();
  const { filters, setFilters, filteredRequests, clearFilters, metrics } = useFilters(requests);

  const handleDownload = () => {
    downloadCSV(filteredRequests);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-emerald-600 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Request Dashboard
            </h1>
            <p className="text-emerald-100">
              Track your Graph permission requests.
            </p>
          </div>
        </div>
      </div>

      <DateFilter
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={clearFilters}
        onDownload={handleDownload}
      />

      <RequestMetrics 
        metrics={metrics} 
        onFilterChange={setFilters}
        currentFilter={filters.status}
      />

      <RequestList requests={filteredRequests} />
    </div>
  );
}