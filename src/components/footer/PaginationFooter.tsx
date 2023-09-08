import React, { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import useEntityStore from '../../stores/entityStore';
import useSearchStore from '../../stores/searchStore';

const PaginationFooter: React.FC = () => {
  const {
    entityCount,
    setSkip,
    take,
    currentPage,
    setCurrentPage,
    searchCurrentPage,
    setSearchCurrentPage
  } = useEntityStore();
  const {
    searchResult
  } = useSearchStore();

  useEffect(() => {
    const newSkip = (currentPage - 1) * take;
    console.log(newSkip);
    setSkip(newSkip);
  }, [currentPage, setSkip]);

  const totalPages = entityCount? Math.ceil((Number(entityCount) / take)) : 0;

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        position: 'static',
        bottom: '5vh'
      }}
      count={totalPages}
      shape="rounded"
      page={searchResult ? searchCurrentPage: currentPage}
      onChange={handlePageChange}
    />
  );
};

export default PaginationFooter;
