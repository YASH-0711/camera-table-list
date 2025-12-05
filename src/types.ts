export interface CameraItem {
  current_status: string;
  hasWarning: boolean;
  health: {
    cloud: string;
    device: string;
    id: string;
    _id: string;
  };
  id: string;
  _id: string;
  name: string;
  location: string;
  recorder: string;
  tasks: string;
  status: string;
}

export interface CameraApiResponse {
  status: number;
  message: string;
  data: CameraItem[];
}
