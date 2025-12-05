import React from 'react';
import type { CameraItem } from '../types';
import { CameraRow } from './CameraRow';

interface CameraTableBodyProps {
  cameras: CameraItem[];
  allCamerasCount: number;
  selectedCameras: string[];
  onToggleSelectAll: () => void;
  onToggleSelectCamera: (id: string) => void;
  onUpdateStatus: (id: string, status: string) => void;
}

export const CameraTableBody: React.FC<CameraTableBodyProps> = ({
  cameras,
  allCamerasCount,
  selectedCameras,
  onToggleSelectAll,
  onToggleSelectCamera,
  onUpdateStatus
}) => {
  return (
    <div className="table-scroll">
      <table className="table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header-cell">
              <input
                type="checkbox"
                checked={selectedCameras.length === allCamerasCount && allCamerasCount > 0}
                onChange={onToggleSelectAll}
                className="table-checkbox"
              />
            </th>
            <th className="table-header-cell">NAME</th>
            <th className="table-header-cell">HEALTH</th>
            <th className="table-header-cell">LOCATION</th>
            <th className="table-header-cell">RECORDER</th>
            <th className="table-header-cell">TASKS</th>
            <th className="table-header-cell">STATUS</th>
            <th className="table-header-cell">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {cameras.map((camera) => (
            <CameraRow
              key={camera.id}
              camera={camera}
              isSelected={selectedCameras.includes(camera.id)}
              onToggleSelect={() => onToggleSelectCamera(camera.id)}
              onUpdateStatus={(status) => onUpdateStatus(camera.id, status)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
