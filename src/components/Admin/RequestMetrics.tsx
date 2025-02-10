import { Clock, CheckCircle2, XCircle, Activity, Cog } from 'lucide-react';
import type { FilterState } from '../Dashboard/types';

interface RequestMetricsProps {
  metrics: {
    total: number;
    pending: number;
    approved: number;
    implemented: number;
    denied: number;
  };
  onFilterChange: (filters: FilterState) => void;
  currentFilter: string;
}

export function RequestMetrics({ metrics, onFilterChange, currentFilter }: RequestMetricsProps) {
  // Calculate percentages for the progress bars
  const calculatePercentage = (value: number) => {
    return metrics.total > 0 ? (value / metrics.total) * 100 : 0;
  };

  const getStatusColor = (status: 'total' | 'pending' | 'approved' | 'implemented' | 'denied') => {
    switch (status) {
      case 'total':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-600',
          icon: 'text-purple-600',
          progress: 'bg-purple-600',
          hover: 'hover:bg-purple-50',
          active: 'ring-purple-500',
        };
      case 'pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-600',
          icon: 'text-yellow-600',
          progress: 'bg-yellow-600',
          hover: 'hover:bg-yellow-50',
          active: 'ring-yellow-500',
        };
      case 'approved':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          icon: 'text-green-600',
          progress: 'bg-green-600',
          hover: 'hover:bg-green-50',
          active: 'ring-green-500',
        };
      case 'implemented':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          icon: 'text-blue-600',
          progress: 'bg-blue-600',
          hover: 'hover:bg-blue-50',
          active: 'ring-blue-500',
        };
      case 'denied':
        return {
          bg: 'bg-red-100',
          text: 'text-red-600',
          icon: 'text-red-600',
          progress: 'bg-red-600',
          hover: 'hover:bg-red-50',
          active: 'ring-red-500',
        };
    }
  };

  const metricsData = [
    {
      label: 'Total Requests',
      value: metrics.total,
      icon: Activity,
      status: 'total' as const,
      filterValue: 'all',
    },
    {
      label: 'Pending',
      value: metrics.pending,
      icon: Clock,
      status: 'pending' as const,
      filterValue: 'pending',
    },
    {
      label: 'Approved',
      value: metrics.approved,
      icon: CheckCircle2,
      status: 'approved' as const,
      filterValue: 'approved',
    },
    {
      label: 'Implemented',
      value: metrics.implemented,
      icon: Cog,
      status: 'implemented' as const,
      filterValue: 'implemented',
    },
    {
      label: 'Denied',
      value: metrics.denied,
      icon: XCircle,
      status: 'denied' as const,
      filterValue: 'denied',
    },
  ];

  const handleMetricClick = (filterValue: string) => {
    onFilterChange({
      startDate: '',
      endDate: '',
      searchQuery: '',
      status: filterValue,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      {metricsData.map((metric) => {
        const colors = getStatusColor(metric.status);
        const percentage = calculatePercentage(metric.value);
        const Icon = metric.icon;
        const isActive = currentFilter === metric.filterValue;

        return (
          <button
            key={metric.label}
            onClick={() => handleMetricClick(metric.filterValue)}
            className={`block w-full text-left bg-white rounded-lg shadow-sm border ${
              isActive ? 'border-2 border-blue-500' : 'border-gray-200'
            } p-6 transition-all duration-200 ${colors.hover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              colors.active
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className={`text-2xl font-semibold ${colors.text}`}>
                  {metric.value}
                </p>
              </div>
              <div className={`p-3 ${colors.bg} rounded-full`}>
                <Icon className={`h-6 w-6 ${colors.icon}`} />
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    {percentage.toFixed(1)}% of total
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                <div
                  style={{ width: `${percentage}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${colors.progress} transition-all duration-500`}
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}