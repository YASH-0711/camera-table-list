import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import './Pagination.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (perPage: number) => void;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);


  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
      onPageChange?.(totalPages);
    }
  }, [currentPage, totalPages, onPageChange]);

  const goToPage = (page: number) => {
    const next = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(next);
    onPageChange?.(next);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const perPage = Number(e.target.value);
    onItemsPerPageChange?.(perPage);
    setCurrentPage(1);
    onPageChange?.(1);
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <select
          className="pagination-select"
          value={itemsPerPage}
          onChange={handlePerPageChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="pagination-text">
          {startItem}-{endItem} of {totalItems}
        </span>
      </div>

      <div className="pagination-buttons">
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          <ChevronsLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          <ChevronsRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
