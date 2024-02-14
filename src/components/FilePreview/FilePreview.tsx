import { FC, useState } from 'react';
import styles from './FilePreview.module.scss';

interface FilePrviewProps {
  orig: string;
  size: number;
  url: string;
}
const FilePreview: FC<FilePrviewProps> = (props) => {
  const fileSize =
    props.size > 1048576
      ? `${Math.trunc(props.size / (1024 * 1024))} Mb`
      : props.size > 1024
      ? `${Math.trunc(props.size / 1024)} kb`
      : `${props.size} b`;
  const fileName = decodeURIComponent(escape(props.orig));
  let transition = Math.trunc(props.size / 1024);
  if (transition > 2500) transition = 2500;

  const [state, setState] = useState('загрузка...');
  const [isDone, setIsDone] = useState(false);

  setTimeout(() => {
    setState('загружено');
  }, transition);
  setTimeout(() => {
    setIsDone(true);
  }, transition + 500);

  return (
    <div className={styles.imageWrap} data-wrapper="wrapper">
      <div className={styles.imagePreview}>
        <img src={props.url} alt="" width="31" />
      </div>
      <div>
        <p className={styles.imageName}>{fileName}</p>
        <p
          className={`${styles.imageSize} ${
            state === 'загружено' ? styles.done : null
          }`}>
          {fileSize} / <span>{state}</span>
        </p>
      </div>
      <div
        className={`${styles.progressWrapper} ${
          state === 'загружено' ? styles.done : ''
        } ${isDone ? 'hidden' : ''}`}>
        <div
          className={styles.progress}
          style={{
            transition: `width ${transition}ms`,
          }}></div>
      </div>
    </div>
  );
};

export { FilePreview };
