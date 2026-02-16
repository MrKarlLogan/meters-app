import { PaginationProps } from '@/types/paginationProps';
import styles from './PaginationBlock.module.scss';

export const PaginationBlock = (props: PaginationProps) => {
  const { currentPage, setCurrentPage, totalPage } = props;

  const getPageNumber = () => {
    const pages: (string | number)[] = [];
    if (!totalPage || totalPage === 0) {
      return Array.from({ length: 7 }, (_, i) => {
        if (i === 0) return 1;
        return '...';
      });
    }

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 2)
        pages.push(2, 3, '...', totalPage - 2, totalPage - 1, totalPage);
      else if (currentPage >= totalPage - 1)
        pages.push('...', totalPage - 2, totalPage - 1, totalPage);
      else
        pages.push(
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPage
        );
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      {getPageNumber().map((page: number | string, index: number) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && setCurrentPage(page)}
          disabled={page === '...'}
          className={`${styles.pagination__button} ${currentPage === page ? styles.pagination__button_active : ''}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
