/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NoAccess } from '../NoAccess/NoAccess';
import { useContext, useEffect, useState } from 'react';
import Loader from '../UI/Loader/Loader';
import { TelegramContext } from '../../main';
import { AllTasks } from '../AllTasks/AllTasks';

const App = () => {
  const [haveAccess, setHaveAccess] = useState<boolean | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState({});

  const tg: any = useContext(TelegramContext);
  console.log(tg);
  const userId = tg.initDataUnsafe.user?.id;

  const searchString = new URLSearchParams(window.location.search);
  const params: any[] = [];
  searchString.forEach((value) => {
    params.push(value);
  });
  const paramsObj = JSON.parse(atob(params[0]));
  const chatId = paramsObj.chat_id;

  // const userId = '168348590';
  // const chatId = '-1002079262956';

  console.log({
    userId,
    chatId,
    params
    chatIdTG: tg.initDataUnsafe.chat?.id,
  });


  useEffect(() => {
    fetch(
      `https://server.hmn.su/sandbot/get-tasks?chat=${chatId}&user=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          setHaveAccess(true);
          setProjectData(data);
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
    <div>
      {isLoading ? null : <Loader />}
      {/* {haveAccess ? <AddTask {...projectData} /> : <NoAccess />} */}
      {haveAccess ? <AllTasks {...projectData} /> : <NoAccess />}
    </div>
  );
};

export { App };
