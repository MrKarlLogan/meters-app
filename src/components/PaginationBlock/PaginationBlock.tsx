import { observer } from 'mobx-react-lite';
import styles from './PaginationBlock.module.scss';
import { useStore } from '@/store';

export const PaginationBlock = observer(() => {
  const { currentPage, setPage, totalPages } = useStore();

  const getPageNumber = () => {
    const pages: (string | number)[] = [];
    if (!totalPages || totalPages === 0) {
      return Array.from({ length: 7 }, (_, i) => {
        if (i === 0) return 1;
        return '...';
      });
    }

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 2)
        pages.push(2, 3, '...', totalPages - 2, totalPages - 1, totalPages);
      else if (currentPage >= totalPages - 1)
        pages.push('...', totalPages - 2, totalPages - 1, totalPages);
      else
        pages.push(
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
    }

    return pages;
  };

  return (
    <nav className={styles.pagination}>
      {getPageNumber().map((page: number | string, index: number) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && setPage(page)}
          disabled={page === '...' || page === currentPage}
          className={`${styles.pagination__button} ${currentPage === page ? styles.pagination__button_active : ''}`}
          aria-label={
            page === '...' ? 'Промежуточные страницы' : `Страница ${page}`
          }
        >
          {page}
        </button>
      ))}
    </nav>
  );
});
