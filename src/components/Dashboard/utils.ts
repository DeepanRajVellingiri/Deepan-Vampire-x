export function formatDate(date: string): string {
  // Get user's timezone
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: userTimeZone
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(new Date(date));
  
  // Get timezone abbreviation
  const timeZoneAbbr = new Date().toLocaleTimeString('en-US', {
    timeZone: userTimeZone,
    timeZoneName: 'short'
  }).split(' ').pop();
  
  // Format: "M/D/YYYY - HH:MM AM/PM EDT"
  return `${formattedDate.replace(',', ' -')} ${timeZoneAbbr}`;
}

export function downloadCSV(requests: any[]): void {
  const headers = ['Request ID', 'Status', 'Current Stage', 'Submitted Date'];
  const csvContent = [
    headers.join(','),
    ...requests.map(request => [
      request.id,
      request.status,
      request.currentStage,
      request.submittedDate
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `requests_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
}