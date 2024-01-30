/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, ChangeEvent } from 'react';
import styles from './AddTask.module.scss';
import { Button } from '../UI/Button/Button';
import Select from 'react-select';

const options = [
  { value: 'none', label: 'Без приоритета' },
  { value: '0', label: 'Низкий' },
  { value: '1', label: 'Средний' },
  { value: '2', label: 'Высокий' },
  { value: '3', label: 'Заморожен' },
];

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
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
    letterSpacing: '-0.24px',
    padding: '4px 8px',
    borderRadius: '4px',
    justifySelf: 'start',
    backgroundColor:
      state.data.value === '0'
        ? '#D4EACC'
        : state.data.value === '1'
        ? '#F9E6D0'
        : state.data.value === '2'
        ? '#FFCCD2'
        : state.data.value === '3'
        ? '#CCDAFF'
        : '#D6D6D6',
    color:
      state.data.value === '0'
        ? '#279600'
        : state.data.value === '1'
        ? '#DF8412'
        : state.data.value === '2'
        ? '#FF001F'
        : state.data.value === '3'
        ? '#4577EF'
        : '#575757',
  }),
  option: (provided: any, state: { data: { value: string } }) => ({
    ...provided,
    width: 'auto',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
    letterSpacing: '-0.24px',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor:
      state.data.value === '0'
        ? '#D4EACC'
        : state.data.value === '1'
        ? '#F9E6D0'
        : state.data.value === '2'
        ? '#FFCCD2'
        : state.data.value === '3'
        ? '#CCDAFF'
        : '#D6D6D6',
    color:
      state.data.value === '0'
        ? '#279600'
        : state.data.value === '1'
        ? '#DF8412'
        : state.data.value === '2'
        ? '#FF001F'
        : state.data.value === '3'
        ? '#4577EF'
        : '#575757',
  }),
  menu: (provided: any) => ({
    ...provided,
    border: '1px solid #F5F5F7',
    borderRadius: '8px',
    padding: '13px',
    boxShadow: 'none',
    background: '#fff',
  }),
  menuList: (provided: any) => ({
    ...provided,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '8px',
    padding: '0',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: '0',
  }),
};

interface AddTaskProps {
  projectName: string;
}

const AddTask: FC<AddTaskProps> = ({ projectName }) => {
  const [data, setData] = useState({
    dep: 'other',
    title: '',
    priority: 'none'
  });

  const changeDep = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, dep: e.target.value });
  };

  return (
    <div className={styles.addTask}>
      <div className={styles.addTaskTop}>
        <h1 className={styles.title}>Добавить задачу</h1>
        <p className={styles.projectName}>в проект “{projectName}”</p>
        <input
          type="text"
          placeholder="Название задачи"
          className={styles.textInput}
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, title: e.target.value })
          }
        />
        <p className={styles.subtitle}>Отдел</p>
        <div className={styles.depWrapper}>
          <div className={styles.deps}>
            <input
              type="radio"
              name="dep"
              id="design"
              value="design"
              onChange={(e) => changeDep(e)}
            />
            <label htmlFor="design">Дизайнеры</label>
            <input
              type="radio"
              name="dep"
              id="tech"
              value="tech"
              onChange={(e) => changeDep(e)}
            />
            <label htmlFor="tech">Тех спецы</label>
            <input
              type="radio"
              name="dep"
              id="dev"
              value="dev"
              onChange={(e) => changeDep(e)}
            />
            <label htmlFor="dev">Разработчики</label>
          </div>
        </div>
        <p className={styles.subtitle}>Приоритет</p>
        <Select
          options={options}
          defaultValue={options[0]}
          onChange={(selectedOption) =>
            setData({ ...data, priority: selectedOption!.value })
          }
          styles={customStyles}
        />
        <label htmlFor="deadline" className={styles.deadline}>
          Дедлайн
          <span>выбрать дату</span>
          <input type="date" name="date" id="deadline" />
        </label>
      </div>
      <div className={styles.addTskBottom}>
        <p>Загрузите скриншоты</p>
        <input type="file" name="screenshots" id="screenshots" />
        <p>Опишите задачу подробно</p>
        <textarea name="task_description" id="task_description"></textarea>
      </div>
      <div className="container">
        <Button clickHandler={() => {
          if (data.priority === 'none') {
            const {priority, ...rest} = data;
            console.log(rest);
          } else {
            console.log(data);
          }}}>Отправить задачу</Button>
      </div>
    </div>
  );
};

export { AddTask };
