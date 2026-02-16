import styles from './CounterTable.module.scss';

export const CounterTable = () => {
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
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
