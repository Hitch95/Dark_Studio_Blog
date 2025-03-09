import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={`${styles.spinner} ${styles.center}`}>
      <div className={styles['spinner-blade']}></div>
      <div className={styles['spinner-blade']}></div>
      <div className={styles['spinner-blade']}></div>
      <div className={styles['spinner-blade']}></div>
      <div className={styles['spinner-blade']}></div>
      <div className={styles['spinner-blade']}></div>
      <div className={styles['spinner-blade']}></div>
      <div className={styles['spinner-blade']}></div>
      <div className={styles['spinner-blade']}></div>
      <div className={styles['spinner-blade']}></div>
      <div className={styles['spinner-blade']}></div>
      <div className={styles['spinner-blade']}></div>
    </div>
  );
};

export default Loading;
