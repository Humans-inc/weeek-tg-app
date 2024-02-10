/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useContext } from 'react';

import styles from './NoAccess.module.scss';
import { Button } from '../UI/Button/Button';
import { TelegramContext } from '../../main';

const NoAccess: FC = () => {
  const tg: any = useContext(TelegramContext);
  tg.expand();
  return (
    <div className={styles.noAccess}>
      <div className={`container ${styles.container}`}>
        <img src="/webapp/images/humans.svg" alt="logo" width="150" />
        <div className={styles.background}></div>
        <div className={styles.bottom}>
          <h1 className={styles.bottomTitle}>У вас нет доступа</h1>
          <p className={styles.bottomDescr}>
            Попросите администратора бота
            <br />
            выдать вам доступ к приложению
          </p>
          <Button clickHandler={() => tg.close()}>Вернуться назад</Button>
        </div>
      </div>
    </div>
  );
};

export { NoAccess };
