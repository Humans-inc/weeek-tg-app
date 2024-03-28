/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef } from 'react';
import styles from './Gant.module.scss';
import { GantProps } from '../../utils/types';
import Gantt from 'frappe-gantt';

const Gant: FC<GantProps> = ({ handleVisible, tasks }) => {
  const frappeTasks = [...tasks]
    .map((task) => {
      return {
        id: task.id,
        name: task.title || 'Noname',
        start: task.dateStart
          ? task.dateStart.split('.').reverse().join('-')
          : '',
        end: task.dateEnd ? task.dateEnd.split('.').reverse().join('-') : '',
        progress: 100,
        dependencies: '',
        custom_class: '',
      };
    })
    .filter((item) => item.start != '')
    .sort((a, b) => +new Date(a.start) - +new Date(b.start));

  const target = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svg.current) {
      const gantt = new Gantt(svg.current, frappeTasks, {
        language: 'ru',
        view_mode: 'Day',
      });
      console.log(gantt);
    }
    const midOfSvg = svg.current!.clientWidth * 0.5;
    target.current!.scrollLeft = midOfSvg;
  }, [frappeTasks]);

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
          <div style={{ overflow: 'scroll' }} ref={target}>
            <svg
              ref={svg}
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Gant };
