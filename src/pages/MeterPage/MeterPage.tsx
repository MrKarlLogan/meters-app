import { CounterTable } from '@components/CounterTable/index';
import styles from './MeterPage.module.scss';
import { useEffect, useState } from 'react';
import { LoadMetesData } from '@/utils/meters';
import { TableMeter } from '@/types/tableProps';

export const MeterPage = () => {
  const [meters, setMeters] = useState<TableMeter[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await LoadMetesData((currentPage - 1) * 20, 20);
        setMeters(data.meters);
        setTotalPage(Math.ceil(data.total / 20));
      } catch (error) {
        console.log(`Ошибка загрузки данных: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Список счётчиков</h1>
      <CounterTable
        meters={meters}
        loading={loading}
        onDelete={() => {}}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </div>
  );
};
