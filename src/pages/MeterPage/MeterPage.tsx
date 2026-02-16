import { CounterTable } from '@components/CounterTable/index';
import styles from './MeterPage.module.scss';
import { useEffect, useState } from 'react';
import { LoadMetesData } from '@/utils/meters';
import { TableMeter } from '@/types/tableProps';

export const MeterPage = () => {
  const [meters, setMeters] = useState<TableMeter[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await LoadMetesData(20, 0);
        setMeters(data);
      } catch (error) {
        console.log(`Ошибка загрузки данных: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Список счётчиков</h1>
      <CounterTable meters={meters} loading={loading} onDelete={() => {}} />
    </div>
  );
};
