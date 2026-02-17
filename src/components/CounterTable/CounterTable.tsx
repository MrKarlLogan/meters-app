import { CounterTableProps } from '@/types/tableProps';
import styles from './CounterTable.module.scss';
import { ColdWaterIcon, HotWaterIcon, TrashIcon } from './icons';
import { CounterTableSkeleton } from '../CounterTableSkeleton/index';
import { PaginationBlock } from '../PaginationBlock';

export const CounterTable = (props: CounterTableProps) => {
  const { meters, loading, onDelete } = props;

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
            <th colSpan={2}>Примечание</th>
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          {loading
            ? Array.from({ length: 20 }).map((_, index) => (
                <CounterTableSkeleton key={index} />
              ))
            : meters.map((meter) => (
                <tr key={meter.id} className={styles.table__element}>
                  <td>{meter.number}</td>
                  <td>
                    <div className={styles.meterType}>
                      {' '}
                      {meter.type === 'ХВС' ? (
                        <ColdWaterIcon />
                      ) : (
                        <HotWaterIcon />
                      )}
                      {meter.type}
                    </div>
                  </td>
                  <td>{meter.installationDate}</td>
                  <td>{meter.isAutomatic}</td>
                  <td>{meter.value}</td>
                  <td>{meter.address}</td>
                  <td>{meter.description}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => onDelete(meter.id)}
                      className={styles.deleteButton}
                      aria-label={`Удалить счетчик ${meter.type} по адресу ${meter.address}`}
                      title="Удалить"
                    >
                      <TrashIcon aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <div className={styles.table__footer}>
        <PaginationBlock />
      </div>
    </div>
  );
};
