/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NoAccess } from '../NoAccess/NoAccess';
import styles from './App.module.scss';
import { AddTask } from '../AddTask/AddTask';
import { useContext, useEffect, useState } from 'react';
import Loader from '../UI/Loader/Loader';
import { TelegramContext } from '../../main';

const App = () => {
  const [haveAccess, setHaveAccess] = useState<boolean | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    projectName: '',
    projectId: '',
  });

  const tg: any = useContext(TelegramContext);
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

  // const userId = '168348590';
  // const chatId = '-1002079262956';

  useEffect(() => {
    fetch(`https://s1.hmns.in/bot/get-tasks?chat=${chatId}&user=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.access) {
          setHaveAccess(true);
          setProjectData({ projectName: data.project, projectId: data.id });
        } else {
          setHaveAccess(false);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(true);
      });
  }, []);

  return (
    <div className={styles.app}>
      {isLoading ? null : <Loader />}
      {haveAccess ? <AddTask {...projectData} /> : <NoAccess />}
    </div>
  );
};

export { App };
