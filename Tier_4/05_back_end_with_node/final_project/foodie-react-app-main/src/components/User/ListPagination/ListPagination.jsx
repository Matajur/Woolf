import { Pagination } from '../../UI/index.js';

const ListPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return totalPages > 1 && <Pagination total={totalPages} current={currentPage} onChange={onPageChange} />;
};

export default ListPagination;
