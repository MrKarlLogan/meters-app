import { CounterTable } from '@components/CounterTable/index';
import styles from './MeterPage.module.scss';
import { useEffect, useState } from 'react';
import { LoadMetesData } from '@/utils/meters';
import { TableMeter } from '@/types/tableProps';
// import { meterApi } from '@/api/meterApi';

export const MeterPage = () => {
  const [meters, setMeters] = useState<TableMeter[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  // Заглушка для имитации удаления
  const [total, setTotal] = useState(20);

  const handleDelete = async (id: string) => {
    if (loading) return;
    if (!confirm('Вы уверены, что хотите удалить счётчик?')) return;

    try {
      // Запрос не проходит из-за CORS

      // await meterApi.deleteMeter(id);

      // В случае удаления повторно просто делается запрос

      // Симулирую, что счётчик удалён
      const updatedMeters = meters.filter((meter) => meter.id !== id);
      const newTotal = total - 1;
      setTotal(newTotal);
      // Получаю следующие значения, но без корректного удаления это работает максимум в рамках 20 значений. Показательно делаю, но это не совсем верно.
      if (newTotal !== 20 && newTotal !== 0) {
        const offset = (currentPage + 1) * 20 - newTotal;
        const newMeter = await LoadMetesData(offset - 1, 1);

        setMeters([...updatedMeters, ...newMeter.meters]);
      }
      // Просто переключаю страницу, чтобы в данной реализации не было ошибок
      if (newTotal === 0) setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.log(`Произошла ошибка при удалении счётчика: ${error}`);
      alert('Не удалось удалить счётчик');
    }
  };

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
        onDelete={handleDelete}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </div>
  );
};
