/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import type { CameraItem } from "../types";
import { Pagination } from "./Pagination";
import { CameraTableHeader } from "./CameraTableHeader";
import { CameraTableBody } from "./CameraTableBody";
import { fetchCameras, updateCameraStatus } from "../api/camers";
import "./CameraTable.css";
import location from "../assets/location-icon.svg";
import service from "../assets/rss-feed.svg";

interface CameraTableProps {
  apiUrl?: string;
  apiToken?: string;
}

export const CameraTable: React.FC<CameraTableProps> = ({
  apiUrl,
  apiToken,
}) => {
  const [cameras, setCameras] = useState<CameraItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCameras, setSelectedCameras] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    setError(null);

    fetchCameras({ apiUrl, apiToken, signal: ac.signal })
      .then((items: CameraItem[]) => {
        console.log(items, "@@@");
        setCameras(items);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [apiUrl, apiToken]);

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const location = selectedLocation.toLowerCase();
    const statusFilter = selectedStatus.toLowerCase();

    return cameras.filter((items) => {
      const text =
        `${items.name} ${items.recorder} ${items.location} ${items.tasks}`.toLowerCase();
      const status = (items.status ?? items.current_status ?? "").toLowerCase();

      return (
        (!query || text.includes(query)) &&
        (!location || (items.location ?? "").toLowerCase() === location) &&
        (!statusFilter || status === statusFilter)
      );
    });
  }, [cameras, searchQuery, selectedLocation, selectedStatus]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    const pageItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);



  const toggleSelectAll = () => {
    if (selectedCameras.length === filteredData.length) {
      setSelectedCameras([]);
    } else {
      setSelectedCameras(filteredData.map((c) => c.id));
    }
  };

  const toggleSelectCamera = (id: string) => {
    setSelectedCameras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(cameras.map((c) => c.location).filter(Boolean)));
  }, [cameras]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const previous = cameras;
    setCameras((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: newStatus, current_status: newStatus }
          : item
      )
    );

    try {
      await updateCameraStatus(id, newStatus, { apiUrl: undefined, apiToken });
    } catch (err: any) {
      setCameras(previous);
      alert(`Failed to update status: ${err?.message ?? err}`);
    }
  };

  return (
    <div className="camera-table">
      <CameraTableHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="filters">
        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={selectedLocation}
            onChange={(e) => {
              setSelectedLocation(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <img src={location} className="filter-icon" width={16} height={16} />
        </div>

        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="error">Error</option>
          </select>
          <img src={service} className="filter-icon" width={16} height={16} />
        </div>
      </div>

      {loading && <div style={{ padding: 12 }}>Loading cameras...</div>}
      {error && <div style={{ padding: 12, color: "red" }}>Error: {error}</div>}

      <CameraTableBody
        cameras={pageItems}
        allCamerasCount={filteredData.length}
        selectedCameras={selectedCameras}
        onToggleSelectAll={toggleSelectAll}
        onToggleSelectCamera={toggleSelectCamera}
        onUpdateStatus={handleUpdateStatus}
      />

      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
        onItemsPerPageChange={(perPage) => {
          setItemsPerPage(perPage);
        }}
      />
    </div>
  );
};
