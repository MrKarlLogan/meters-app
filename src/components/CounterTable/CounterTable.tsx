import { CounterTableProps } from '@/types/tableProps';
import styles from './CounterTable.module.scss';
import { ColdWaterIcon, HotWaterIcon } from './icons';

export const CounterTable = (props: CounterTableProps) => {
  const { meters, loading, onDelete } = props;

  console.log(onDelete);

  if (loading) return <p>Идёт загрузка...</p>;

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.table__header}>
          <tr>
            <th>№</th>
            <th>Тип</th>
            <th>Дата установки</th>
            <th>Автоматический</th>
            <th>Текущие показания</th>
            <th>Адрес</th>
            <th>Примечание</th>
          </tr>
        </thead>
        <tbody>
          {meters.map((meter) => (
            <tr key={meter.id} className={styles.table__element}>
              <td>{meter.number}</td>
              <td>
                <div className={styles.meterType}>
                  {' '}
                  {meter.type === 'ХВС' ? <ColdWaterIcon /> : <HotWaterIcon />}
                  {meter.type}
                </div>
              </td>
              <td>{meter.installationDate}</td>
              <td>{meter.isAutomatic}</td>
              <td>{meter.value}</td>
              <td>{meter.address}</td>
              <td>{meter.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.table__footer}>Привет</div>
    </div>
  );
};
