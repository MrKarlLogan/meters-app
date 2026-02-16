import { CounterTable } from '@components/CounterTable/index';
import styles from './MeterPage.module.scss';

export const MeterPage = () => (
  <div className={styles.container}>
    <h1 className={styles.container__title}>Список счётчиков</h1>
    <CounterTable />
  </div>
);
