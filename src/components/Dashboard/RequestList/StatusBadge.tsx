import { Clock, CheckCircle2, XCircle, Cog } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusDetails = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return {
          Icon: CheckCircle2,
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          iconColor: 'text-green-500',
          label: 'Approved'
        };
      case 'denied':
        return {
          Icon: XCircle,
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          iconColor: 'text-red-500',
          label: 'Denied'
        };
      case 'implemented':
        return {
          Icon: Cog,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-500',
          label: 'Implemented'
        };
      default:
        return {
          Icon: Clock,
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-500',
          label: 'Pending'
        };
    }
  };

  const { Icon, bgColor, textColor, iconColor, label } = getStatusDetails(status);

  return (
    <div className="flex items-center space-x-2">
      <Icon className={`h-5 w-5 ${iconColor}`} />
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {label}
      </span>
    </div>
  );
}