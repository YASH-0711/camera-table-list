import React from 'react';
import type { CameraItem } from "../types";
import { HealthIndicator } from './HealthIndicator';
import Cloud from "../assets/cloud.svg"
import Server from "../assets/edge.svg"

interface Props {
  health: CameraItem['health'];
}

export const CameraHealthCell: React.FC<Props> = ({ health }) => {
  const cloud = health?.cloud ?? '-';
  const device = health?.device ?? '-';

  return (
    <div className="health-container">
      <HealthIndicator type="cloud" value={cloud} icon={Cloud} />
      <HealthIndicator type="device" value={device} icon={Server} />
    </div>
  );
};
