// import { useEffect, useState } from 'react';
import { NoAccess } from '../NoAccess/NoAccess';
import styles from './App.module.scss';
import { AddTask } from '../AddTask/AddTask';

const App = () => {
  // const [haveAccess, setHaveAccess] = useState(true);

  // useEffect(() => {
  //   fetch(
  //     `https://s1.hmns.in/bot/?user_id=168348590&chat_id=-1002030267309&key=JZoQovd6aROzgV50dy9LyJypW06tXlEw`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  const haveAccess = false;

  return (
    <div className={styles.app}>{haveAccess ? <AddTask /> : <NoAccess />}</div>
  );
};

export { App };
