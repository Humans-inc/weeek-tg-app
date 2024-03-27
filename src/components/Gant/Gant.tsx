/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import styles from './Gant.module.scss';
import { GantProps } from '../../utils/types';

const Gant: FC<GantProps> = ({ handleVisible }) => {
  return (
    <div className={styles.addTask}>
      <button className={styles.close} onClick={handleVisible}>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 4.5L4 12.5M4 4.5L12 12.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="container">Gantt will be here</div>
    </div>
  );
};

export { Gant };
