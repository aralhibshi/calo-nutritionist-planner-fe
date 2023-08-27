import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IPaginationFooter } from '../../interfaces';

const PaginationFooter: React.FC<IPaginationFooter> = (props) => {
  const { setSkip, ingredientsCount } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

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
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        shape="rounded"
        page={currentPage}
        onChange={handlePageChange}
      />
    </Stack>
  );
};

export default PaginationFooter;
