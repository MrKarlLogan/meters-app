import styles from './CounterTableSkeleton.module.scss';

export const CounterTableSkeleton = () => {
  return (
    <tr className={styles.skeletonRow}>
      <td>
        <div className={styles.skeleton} style={{ width: '30px' }} />
      </td>
      <td>
        <div className={styles.meterType}>
          <div className={styles.skeletonCircle} />
          <div className={styles.skeleton} style={{ width: '40px' }} />
        </div>
      </td>
      <td>
        <div className={styles.skeleton} style={{ width: '80px' }} />
      </td>
      <td>
        <div className={styles.skeleton} style={{ width: '60px' }} />
      </td>
      <td>
        <div className={styles.skeleton} style={{ width: '50px' }} />
      </td>
      <td>
        <div className={styles.skeleton} style={{ width: '200px' }} />
      </td>
      <td>
        <div className={styles.skeleton} style={{ width: '150px' }} />
      </td>
    </tr>
  );
};
