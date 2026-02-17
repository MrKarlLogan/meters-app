import { observer } from 'mobx-react-lite';
import { CounterTable } from '@components/CounterTable/index';
import styles from './MeterPage.module.scss';
import { useEffect } from 'react';
import { useStore } from '@/store';

export const MeterPage = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.loadMeters(store.currentPage);
  }, [store]);

  const meters = store.meters.map((meter) => {
    const area = store.areas.get(meter.areaId);
    return {
      id: meter.id,
      number: meter.number,
      type: meter.type,
      installationDate: meter.installationDate,
      isAutomatic: meter.isAutomatic,
      value: meter.value,
      address: area?.address || '-',
      description: meter.description,
    };
  });

  const handleDelete = async (id: string) => {
    if (store.loading) return;
    if (!confirm('Вы уверены, что хотите удалить счётчик?')) return;

    const meter = store.meters.find((meter) => meter.id === id);
    if (meter) {
      await meter.delete();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Список счётчиков</h1>
      <CounterTable
        meters={meters}
        loading={store.loading}
        onDelete={handleDelete}
      />
    </div>
  );
});
