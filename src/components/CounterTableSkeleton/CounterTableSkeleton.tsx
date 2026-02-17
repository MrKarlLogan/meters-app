import styles from './CounterTableSkeleton.module.scss';

export const CounterTableSkeleton = () => {
  return (
    <tr className={styles.skeletonRow}>
      <td>
        <div className={styles.skeleton} />
      </td>
      <td>
        <div className={styles.meterType}>
          <div className={styles.skeletonCircle} />
          <div className={styles.skeleton} />
        </div>
      </td>
      <td>
        <div className={styles.skeleton} />
      </td>
      <td>
        <div className={styles.skeleton} />
      </td>
      <td>
        <div className={styles.skeleton} />
      </td>
      <td>
        <div className={styles.skeleton} />
      </td>
      <td>
        <div className={styles.skeleton} />
      </td>
      <td>
        <div className={styles.deleteButtonSkeleton} />
      </td>
    </tr>
  );
};
