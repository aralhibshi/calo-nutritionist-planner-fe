import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { IPaginationFooter } from '../../interfaces';

const PaginationFooter: React.FC<IPaginationFooter> = (props) => {
  const { setSkip, ingredientsCount } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const newSkip = (currentPage - 1) * itemsPerPage;
    console.log(newSkip);
    setSkip(newSkip);
  }, [currentPage, setSkip]);

  const totalPages = Math.ceil((ingredientsCount / itemsPerPage));

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
      count={totalPages}
      shape="rounded"
      page={currentPage}
      onChange={handlePageChange}
    />
  );
};

export default PaginationFooter;
