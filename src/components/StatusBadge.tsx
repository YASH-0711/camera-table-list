import './StatusBadge.css';

interface StatusBadgeProps {
  status: string;
  handleStatus: (status: string) => void;
}

export function StatusBadge({ status, handleStatus }: StatusBadgeProps) {
  const className = status === 'Active' ? 'status-badge active' : 'status-badge inactive';
  const updateStatus = status === 'Active' ? "Inactive" : "Active"
  return (
    <button onClick={() => handleStatus(updateStatus)} className={className}>
      {status}
    </button>
  );
}
