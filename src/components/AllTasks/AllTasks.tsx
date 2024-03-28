/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
//import { FC } from 'react';
import { ChangeEvent, Fragment, useContext, useEffect, useState } from 'react';
import { TelegramContext } from '../../main';
import Select from 'react-select';

import styles from './AllTasks.module.scss';
import { TasksFilters } from '../../utils/types';
import { AddTask } from '../AddTask/AddTask';
import { Gant } from '../Gant/Gant';

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: '1px solid #F5F5F7',
    borderRadius: '8px',
    padding: '13px',
    boxShadow: 'none',
    background: '#fff',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: () => ({
    padding: '0',
    color: '#7784EE',
    display: 'flex',
  }),
  singleValue: (provided: any, state: { data: { value: string } }) => ({
    ...provided,
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#575757',
    textAlign: 'left',
  }),
  option: (provided: any, { isSelected }: { isSelected: boolean }) => ({
    ...provided,
    width: 'auto',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
    color: isSelected ? '#fff' : '#575757',
    textAlign: 'left',
    borderRadius: '4px',
    backgroundColor: isSelected ? '#7784EE' : 'transparent',
  }),
  menu: (provided: any) => ({
    ...provided,
    border: '1px solid #F5F5F7',
    borderRadius: '8px',
    padding: '13px',
    boxShadow: 'none',
    background: '#fff',
  }),
  // menuList: (provided: any) => ({
  //   ...provided,
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   alignItems: 'flex-start',
  //   justifyContent: 'flex-start',
  //   gap: '8px',
  //   padding: '0',
  // }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: '0',
  }),
};

const AllTasks: any = (props: any) => {
  const tg: any = useContext(TelegramContext);

  const [board] = useState([...props.data.boards][0]);
  const [columns, setColumns] = useState(
    [...props.data.columns].filter((item: any) => item.boardId === board.id)
  );
  const selectOptions = props.data.boards.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));

  const [filters, setFilters] = useState<TasksFilters>({
    departament: board.id,
    state: columns[0].id,
  });
  const [tasks, setTasks] = useState(
    [...props.data.tasks].filter(
      (item: any) =>
        item.boardId == filters.departament &&
        item.boardColumnId == filters.state
    )
  );
  const [activeTask, setActiveTask] = useState({
    ...tasks.filter((item) => item.id === tasks[0].id),
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleNewTask, setIsVisibleNewTask] = useState(false);
  const [isVisibleGant, setIsVisibleGant] = useState(false);

  document.body.style.overflow = `${
    isVisible || isVisibleNewTask ? 'hidden' : ''
  }`;

  useEffect(() => {
    setTasks(
      [...props.data.tasks].filter(
        (item: any) =>
          item.boardId == filters.departament &&
          item.boardColumnId == filters.state
      )
    );
    console.log(filters);
  }, [filters]);

  const handleVisibleNewTask = () => {
    setIsVisibleNewTask(false);
  };
  const handleVisibleGant = () => {
    setIsVisibleGant(false);
  };

  const changeState = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, state: +e.target.value });
    console.log(filters);
  };

  return (
    <div className={styles.allTasks}>
      <div className={styles.allTasksHeader}>
        <img src="/webapp/images/humans.svg" alt="logo" width="150" />
        <button className={styles.closeApp} onClick={() => tg.close()}>
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
          Закрыть
        </button>
      </div>
      <Select
        options={selectOptions}
        defaultValue={selectOptions[0]}
        onChange={(selectedOption) => {
          const column = [...props.data.columns].filter(
            (item: any) => item.boardId === +selectedOption!.value
          )[0];
          setFilters({
            state: column.id,
            departament: +selectedOption!.value,
          });
          setColumns(
            [...props.data.columns].filter(
              (item: any) => item.boardId === +selectedOption!.value
            )
          );
        }}
        styles={customStyles}
        isSearchable={false}
      />
      <p className={styles.subtitle}>Статус</p>
      <div className={styles.depWrapper}>
        <div className={styles.deps}>
          {columns.map((item: any) => (
            <Fragment key={item.id}>
              <input
                type="radio"
                name="state"
                id={`state-${item.id}`}
                value={item.id}
                onChange={(e) => changeState(e)}
                checked={filters.state == item.id}
              />
              <label htmlFor={`state-${item.id}`}>{item.name}</label>
            </Fragment>
          ))}
        </div>
      </div>
      <div className={styles.tasksContainer}>
        {tasks.length > 0
          ? tasks.map((item: any, index: number) => (
              <button
                key={index}
                className={styles.task}
                onClick={() => {
                  setActiveTask({
                    ...tasks.filter((task) => task.id === item.id),
                  });
                  setIsVisible(!isVisible);
                }}>
                <span className={styles.taskName}>
                  {item.title || 'Без названия'}
                </span>
                <span className={styles.taskDate}>
                  <b>Дедлайн:</b> {item.date}
                </span>
                <span
                  className={`${styles.taskPriority} priority-${item.priority}`}>
                  {item.priority === 0
                    ? 'Низкий'
                    : item.priority === 1
                    ? 'Средний'
                    : item.priority === 2
                    ? 'Высокий'
                    : item.priority === 3
                    ? 'Заморожен'
                    : 'Без приоритета'}
                </span>
              </button>
            ))
          : 'Пока ничего нет'}
      </div>
      <div className={styles.bottom}>
        <button
          type="button"
          className={styles.bottomProject}
          onClick={() => setIsVisibleGant(!isVisibleGant)}>
          Посмотреть гант <span>{props.project}</span>
        </button>
        <button
          className={styles.bottomAddTask}
          onClick={() => setIsVisibleNewTask(!isVisibleNewTask)}>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.99998 3.83337V13.1667M3.33331 8.50004H12.6666"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Добавить задачу
        </button>
      </div>
      <div className={`${styles.taskPage} ${isVisible ? 'visible' : ''}`}>
        <div className={styles.activeTaskHeader}>
          <a
            href={`https://app.weeek.net/ws/452020/task/${activeTask[0].id}`}
            className={styles.activeTaskLink}>
            {activeTask[0].id}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_5514)">
                <path
                  d="M6.35378 9.18196L5.64667 9.88907C4.67036 10.8654 3.08745 10.8654 2.11114 9.88907C1.13483 8.91276 1.13483 7.32985 2.11114 6.35354L2.81825 5.64643M9.18221 6.35354L9.88931 5.64643C10.8656 4.67012 10.8656 3.08721 9.88931 2.1109C8.913 1.13458 7.33009 1.13458 6.35378 2.1109L5.64667 2.818M4.25023 7.74997L7.75023 4.24997"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_6_5514">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <button
            className={styles.activeTaskHide}
            onClick={() => setIsVisible(!isVisible)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Закрыть
          </button>
        </div>
        <p className={styles.activeTaskTitle}>{activeTask[0].title}</p>
        <div className={styles.activeTaskData}>
          <div className={styles.taskDate}>
            Дедлайн: {activeTask[0].date || 'нет'}
          </div>
          <div
            className={`${styles.taskPriority} priority-${activeTask[0].priority}`}>
            {activeTask[0].priority === 0
              ? 'Низкий'
              : activeTask[0].priority === 1
              ? 'Средний'
              : activeTask[0].priority === 2
              ? 'Высокий'
              : activeTask[0].priority === 3
              ? 'Заморожен'
              : 'Без приоритета'}
          </div>
        </div>
        <div
          className={styles.activeTaskDescription}
          dangerouslySetInnerHTML={{ __html: activeTask[0].description }}
        />
      </div>
      {isVisibleNewTask && (
        <AddTask
          projectName={props.project}
          projectId={props.id}
          handleVisible={handleVisibleNewTask}
        />
      )}
      {isVisibleGant && (
        <Gant handleVisible={handleVisibleGant} tasks={[...props.data.tasks]} />
      )}
    </div>
  );
};

export { AllTasks };
