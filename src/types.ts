export interface Camera {
  id: number;
  name: string;
  details: string;
  isOnline: boolean;
  location: string;
  recorder: string;
  tasks: string;
  status: 'Active' | 'Inactive';
  hasAlert?: boolean;
  hasWarning?: boolean;
  hasCheck?: boolean;
  hasWifi?: boolean;
  hasCalendar?: boolean;
}
