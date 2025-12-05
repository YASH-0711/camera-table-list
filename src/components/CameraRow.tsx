import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import type { CameraItem } from "../types";
import { StatusBadge } from "./StatusBadge";
import { CameraHealthCell } from "./CameraHealthCell";
import { ConfirmModal } from "./ui/ConfirmModal";

interface CameraRowProps {
  camera: CameraItem;
  isSelected: boolean;
  onToggleSelect: () => void;
  onUpdateStatus: (status: string) => void;
}

export const CameraRow: React.FC<CameraRowProps> = ({
  camera,
  isSelected,
  onToggleSelect,
  onUpdateStatus,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  const handleStatusClick = (status: string) => {
    setPendingStatus(status);
    setConfirmOpen(true);
  };

  const handleConfirmStatus = async () => {
    if (!pendingStatus) return;
    setStatusLoading(true);
    setConfirmOpen(false);
    
    try {
      await onUpdateStatus(pendingStatus);
    } catch (error) {
      console.log(error);
    } finally {
      setStatusLoading(false);
      setPendingStatus(null);
    }
  };

  const camStatus = (camera.status ?? camera.current_status ?? "").toString();

  return (
    <>
      <tr className="table-row">
        <td className="table-cell">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="table-checkbox"
          />
        </td>

        <td className="table-cell">
          <div className="camera-name-cell">
            <div
              className={`status-dot ${
                camera.health?.device === "A" || camera.health?.cloud === "A"
                  ? "online"
                  : "offline"
              }`}
            />
            <div>
              <div className="camera-name-row">
                <span className="camera-name">{camera.name}</span>
              </div>
              <div className="camera-details">
                ID: {camera._id ?? camera.id}
              </div>
            </div>
          </div>
        </td>

        <td className="table-cell">
          <CameraHealthCell health={camera.health} />
        </td>

        <td className="table-cell">{camera.location}</td>
        <td className="table-cell">{camera.recorder}</td>
        <td className="table-cell">{String(camera.tasks)}</td>

        <td className="table-cell">
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <StatusBadge
              status={camStatus}
              handleStatus={(status) => handleStatusClick(status)}
            />
          </div>
        </td>

        <td className="table-cell">
          <button className="action-button" title="More actions">
            <MoreVertical width={18} height={18} />
          </button>
        </td>
      </tr>

      <ConfirmModal
        open={confirmOpen}
        title="Update camera status"
        message={`Are you sure you want to set "${camera.name}" status to "${pendingStatus}"?`}
        confirmText="Yes, update"
        cancelText="Cancel"
        onConfirm={handleConfirmStatus}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingStatus(null);
        }}
        loading={statusLoading}
      />
    </>
  );
};
