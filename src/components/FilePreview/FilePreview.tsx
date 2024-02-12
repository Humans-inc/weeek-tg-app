import { FC, useState, MouseEvent } from 'react';
import { File } from '../DropZone/DropZone';
import styles from './FilePreview.module.scss';

const FilePreview: FC<File> = (props) => {
  const fileSize =
    props.size > 1024 ? `${props.size / 1024} Mb` : `${props.size} kb`;
  const fileName = decodeURIComponent(escape(props.orig));

  const [state, setState] = useState('загрузка...');
  const [isDone, setIsDone] = useState(false);

  setTimeout(() => {
    setState('загружено');
  }, props.size);
  setTimeout(() => {
    setIsDone(true);
  }, props.size + 500);

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
      <button
        className={styles.deleteImg}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          const target = e.target as HTMLButtonElement;
          target.closest('[data-wrapper="wrapper"]')!.remove();
        }}>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 6.55147L6 18.5515"
            stroke="#292A2D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6.55147L18 18.5515"
            stroke="#292A2D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={`${styles.progressWrapper} ${
          state === 'загружено' ? styles.done : null
        } ${isDone ? 'hidden' : null}`}>
        <div
          className={styles.progress}
          style={{ transition: `width ${props.size}ms` }}></div>
      </div>
    </div>
  );
};

export { FilePreview };
