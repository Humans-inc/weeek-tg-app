/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NoAccess } from '../NoAccess/NoAccess';
import styles from './App.module.scss';
import { AddTask } from '../AddTask/AddTask';
import { Suspense, useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';

const App = () => {
  const [haveAccess, setHaveAccess] = useState<boolean | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [projectName, setProjectName] = useState('');

  const tg = window.Telegram.WebApp;
  const userId = tg.initDataUnsafe.user?.id;

  const searchString = new URLSearchParams(window.location.search);
  const params: any[] = [];
  searchString.forEach((value) => {
    params.push(value);
  });
  const paramsObj = JSON.parse(atob(params[0]));
  const chatId = paramsObj.chat_id;

  console.log({
    userId,
    chatId,
    chatIdTG: tg.initDataUnsafe.chat?.id,
  });

  useEffect(() => {
    fetch(`https://s1.hmns.in/bot/get-tasks?chat=${chatId}&user=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.access) {
          setHaveAccess(true);
          setProjectName(data.project);
        } else {
          setHaveAccess(false);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(true);
      })
  }, []);

  return (
    <div className={styles.app}>
      {haveAccess ? <AddTask projectName={projectName} /> : <NoAccess />}
      {isLoading ? null : <Loader />}
    </div>
  );
};

export { App };
