import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Activity,
  Calendar,
  CheckCircle,
  AlertCircle,
  Wifi,
  MoreVertical,
  Info,
} from "lucide-react";

import type { Camera } from "../types";
import "./CameraTable.css";

interface CameraTableProps {
  cameras: Camera[];
}

export function CameraTable({ cameras }: CameraTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCameras, setSelectedCameras] = useState<number[]>([]);


  const toggleSelectAll = () => {
    if (selectedCameras.length === cameras.length) {
      setSelectedCameras([]);
    } else {
      setSelectedCameras(cameras.map((c) => c.id));
    }
  };

  const toggleSelectCamera = (id: number) => {
    if (selectedCameras.includes(id)) {
      setSelectedCameras(selectedCameras.filter((cId) => cId !== id));
    } else {
      setSelectedCameras([...selectedCameras, id]);
    }
  };

  return (
    <div className="camera-table">
      <div className="table-header">
        <div className="header-title">
          <h1 className="title">Cameras</h1>
          <p className="subtitle">Manage your cameras here.</p>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" width={16} height={16} />
        </div>
      </div>

      <div className="filters">
        <div className="filter-select-wrapper">
          <select className="filter-select">
            <option>Location</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
          </select>
          <MapPin className="filter-icon" width={16} height={16} />
          <svg
            className="filter-dropdown-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <div className="filter-select-wrapper">
          <select className="filter-select">
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <Activity className="filter-icon" width={16} height={16} />
          <svg
            className="filter-dropdown-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div className="table-scroll">
        <table className="table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header-cell">
                <input
                  type="checkbox"
                  checked={selectedCameras.length === cameras.length}
                  onChange={toggleSelectAll}
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
              <tr key={camera.id} className="table-row">
                <td className="table-cell">
                  <input
                    type="checkbox"
                    checked={selectedCameras.includes(camera.id)}
                    onChange={() => toggleSelectCamera(camera.id)}
                    className="table-checkbox"
                  />
                </td>
                <td className="table-cell">
                  <div className="camera-name-cell">
                    <div
                      className={`status-dot ${
                        camera.isOnline ? "online" : "offline"
                      }`}
                    />
                    <div>
                      <div className="camera-name-row">
                        <span className="camera-name">{camera.name}</span>
                        {(camera.id === 1 || camera.id === 8) && (
                          <span className="info-badge">
                            <Info width={12} height={12} />
                          </span>
                        )}
                      </div>
                      <div className="camera-details">{camera.details}</div>
                    </div>
                  </div>
                </td>
                <td className="table-cell">
                  <div className="health-icons">
                    {camera.id === 2 && (
                      <div className="health-badges">
                        <div className="avatar-badge purple">V</div>
                        <div className="avatar-badge blue">A</div>
                      </div>
                    )}
                    {camera.hasAlert && camera.id !== 2 && (
                      <div className="health-icon-wrapper alert">
                        <AlertCircle width={16} height={16} />
                      </div>
                    )}
                    {camera.hasWarning && camera.id !== 2 && (
                      <div className="health-icon-wrapper warning">
                        <AlertCircle width={16} height={16} />
                      </div>
                    )}
                    {camera.hasCalendar && (
                      <div className="health-icon-wrapper calendar">
                        <Calendar width={16} height={16} />
                      </div>
                    )}
                    {camera.hasCheck && (
                      <div className="health-icon-wrapper check">
                        <CheckCircle width={16} height={16} />
                      </div>
                    )}
                    {camera.hasWifi && (
                      <div className="health-icon-wrapper wifi">
                        <Wifi width={16} height={16} />
                      </div>
                    )}
                  </div>
                </td>
                <td className="table-cell">{camera.location}</td>
                <td className="table-cell">{camera.recorder}</td>
                <td className="table-cell">{camera.tasks}</td>
                <td className="table-cell">
                  {/* <StatusBadge status={camera.status} /> */}
                </td>
                <td className="table-cell">
                  <button className="action-button">
                    <MoreVertical width={20} height={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
