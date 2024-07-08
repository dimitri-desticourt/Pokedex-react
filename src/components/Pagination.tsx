import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const firstPage = () => {
    onPageChange(1);
  };

  const lastPage = () => {
    onPageChange(totalPages);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;

    if (totalPages <= maxButtonsToShow) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      const start = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
      const end = Math.min(totalPages, start + maxButtonsToShow - 1);

      if (start > 1) {
        buttons.push(
          <button
            key={1}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => onPageChange(1)}
          >
            {1}
          </button>
        );
        if (start > 2) {
          buttons.push(<span key="dots-start">...</span>);
        }
      }

      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          buttons.push(<span key="dots-end">...</span>);
        }
        buttons.push(
          <button
            key={totalPages}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className="flex justify-center my-4">
      <button
        className={`mx-1 px-3 py-1 rounded-md ${
          currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'
        }`}
        onClick={firstPage}
        disabled={currentPage === 1}
      >
        {'<<'}
      </button>
      <button
        className={`mx-1 px-3 py-1 rounded-md ${
          currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'
        }`}
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      {renderPageButtons()}
      <button
        className={`mx-1 px-3 py-1 rounded-md ${
          currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'
        }`}
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
      <button
        className={`mx-1 px-3 py-1 rounded-md ${
          currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'
        }`}
        onClick={lastPage}
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
