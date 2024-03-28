/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import styles from './Gant.module.scss';
import { GantProps } from '../../utils/types';
import { Chart } from 'react-google-charts';

const columns = [
  { type: 'string', label: 'Task ID' },
  { type: 'string', label: 'Task Name' },
  { type: 'string', label: 'Resource' },
  { type: 'date', label: 'Start Date' },
  { type: 'date', label: 'End Date' },
  { type: 'number', label: 'Duration' },
  { type: 'number', label: 'Percent Complete' },
  { type: 'string', label: 'Dependencies' },
];

const options = {
  height: 700,
  gantt: {
    trackHeight: 30,
    palette: [
      {
        color: '#7784ee',
        dark: '#6d7be4',
        light: '#97a1f0',
      },
    ],
  },
};

const Gant: FC<GantProps> = ({ handleVisible, tasks }) => {
  const filteredTask = [...tasks]
    .map((task: any, index: number) => {
      return [
        task.id,
        task.title || 'Noname',
        task.boardId,
        task.dateStart
          ? new Date(task.dateStart.split('.').reverse().join('/'))
          : '',
        task.dateEnd
          ? new Date(task.dateEnd.split('.').reverse().join('/'))
          : '',
        null,
        0,
        null,
      ];
    })
    .filter((item) => item[3] != '');

  const data = [columns, ...filteredTask];

  return (
    <div className={styles.gant}>
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
      <div className={`container ${styles.gantContainer}`}>
        <div className={styles.gantWrapper}>
          <Chart
            chartType="Gantt"
            width="100%"
            height="100%"
            data={data}
            options={options}
            chartLanguage='ru'
          />
        </div>
      </div>
    </div>
  );
};

export { Gant };
