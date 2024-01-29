import { FC } from 'react';

import styles from './NoAccess.module.scss';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Telegram: any;
  }
}

const NoAccess: FC = () => {
  const tg = window.Telegram.WebApp;
  console.log(tg);
  tg.expand();
  return (
    <div className={styles.noAccess}>
      <div className={`container ${styles.container}`}>
        <img src="/images/humans.svg" alt="logo" width="150" />
        <div className={styles.bottom}>
          <h1 className={styles.bottomTitle}>У вас нет доступа</h1>
          <p className={styles.bottomDescr}>
            Попросите администратора бота<br/>выдать вам доступ к приложению
          </p>
          <button className={styles.bottomButton}>
            Вернуться назад
          </button>
        </div>
      </div>
    </div>
  );
};

export { NoAccess };
