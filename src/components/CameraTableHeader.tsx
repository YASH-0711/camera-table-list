import React from 'react';
import { Search } from 'lucide-react';

interface CameraTableHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const CameraTableHeader: React.FC<CameraTableHeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
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
  );
};
