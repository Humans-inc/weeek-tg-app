import styles from './Loader.module.scss';
const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <img src="/webapp/images/humans.svg" alt="logo" width="150" />
    </div>
  );
}

export default Loader
