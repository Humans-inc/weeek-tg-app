import { NoAccess } from '../NoAccess/NoAccess';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <NoAccess/>
    </div>
  );
}

export { App };
