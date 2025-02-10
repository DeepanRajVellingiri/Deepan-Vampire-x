import { useState, useMemo } from 'react';
import type { Request, FilterState } from './types';

export function useFilters(requests: Request[]) {
  const [filters, setFilters] = useState<FilterState>({
    startDate: '',
    endDate: '',
    searchQuery: '',
    status: 'all'
  });

  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      const date = new Date(request.submittedDate);
      
      // Date filtering
      const matchesDate = (!filters.startDate || date >= new Date(filters.startDate)) &&
                         (!filters.endDate || date <= new Date(filters.endDate));
      
      // Search query filtering
      const matchesSearch = !filters.searchQuery ||
        request.id.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      // Status filtering
      const matchesStatus = filters.status === 'all' || request.status === filters.status;
      
      return matchesDate && matchesSearch && matchesStatus;
    });
  }, [requests, filters]);

  const metrics = useMemo(() => ({
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    implemented: requests.filter(r => r.status === 'implemented').length,
    denied: requests.filter(r => r.status === 'denied').length
  }), [requests]);

  const clearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      searchQuery: '',
      status: 'all'
    });
  };

  return {
    filters,
    setFilters,
    filteredRequests,
    clearFilters,
    metrics
  };
}