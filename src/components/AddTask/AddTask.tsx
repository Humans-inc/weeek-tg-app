/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, ChangeEvent, forwardRef, Ref, useEffect } from 'react';
import styles from './AddTask.module.scss';
import { Button } from '../UI/Button/Button';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { Editor } from '@tinymce/tinymce-react';
import { useDropzone } from 'react-dropzone';
import upload from '../../assets/upload.svg';

import 'react-datepicker/dist/react-datepicker.css';

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

interface CustomInputProps {
  value?: string | null;
  onClick?: () => void;
}
const CustomDatePicker = ({ userDate, onChange }: any) => {
  const CustomInput = forwardRef(
    ({ value, onClick }: CustomInputProps, ref: Ref<HTMLButtonElement>) => (
      <button
        className={`${styles.deadline} ${value ? styles.full : null}`}
        onClick={onClick}
        ref={ref}>
        Дедлайн
        <span>
          {value
            ? new Date(value!.toString()).toLocaleDateString()
            : 'Выбрать дату'}
        </span>
      </button>
    )
  );
  return (
    <DatePicker
      selected={userDate}
      onChange={onChange}
      customInput={<CustomInput />}
      locale={ru}
    />
  );
};

const TinyMCE = ({ handleChange }: any) => {
  return (
    <Editor
      apiKey="v6gobd9x6i3c23v657raceriks3k7hul4wz2dybpu8pp03ni"
      init={{
        language: 'ru',
        height: 260,
        plugins: ['lists'],
        toolbar: 'blocks | bullist numlist',
        placeholder:
          'Приложите ссылку на страницу. Расскажите, каким должен быть результат',
      }}
      onChange={handleChange}
    />
  );
};

const Basic = () => {
  const [files, setFiles] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 4,
  });

  useEffect(() => {
    if (acceptedFiles.length) {
      const formData = new FormData();
      acceptedFiles.forEach((image) => formData.append('images', image));
      fetch('https://s1.hmns.in/upload', { method: 'POST', body: formData })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log({ bad: res.status });
          }
        })
        .then((data) => setFiles(data))
        .catch((e) => console.error(e));
    }
  }, [acceptedFiles]);

  useEffect(() => {
    console.log(files);
  }, [files]);

  /*
  {
    "id": "936e3ebc219a20c",
    "name": "936e3ebc219a20c.png",
    "size": 250,
    "uploadDate": "2024-02-01T17:05:33.348Z",
    "url": "https://s1.hmns.in/files/936e3ebc219a20c.png"
  }
  */
  return (
    <section>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className={styles.uploadFiles}>
        <input {...getInputProps()} />
        <img src={upload} alt="" />
        <p>Выбрать файлы</p>
      </div>
      <div>
        {files.length > 0 && files.map((file, index) => <p>{index}</p>)}
      </div>
    </section>
  );
};

interface Data {
  dep: string;
  title: string;
  priority: string | null;
  day: null | Date;
  description: string;
}

const AddTask: FC<AddTaskProps> = ({ projectName }) => {
  const [data, setData] = useState<Data>({
    dep: 'other',
    title: '',
    priority: null,
    day: null,
    description: '',
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
          isSearchable={false}
        />
        <CustomDatePicker
          userDate={data.day}
          onChange={(date: any) => setData({ ...data, day: date })}
        />
      </div>
      <div className={`${styles.addTskBottom} container`}>
        <p className={styles.subtitle}>Загрузите скриншоты</p>
        {/* <input type="file" name="screenshots" id="screenshots" /> */}
        <Basic />
        <p className={styles.subtitle}>Опишите задачу подробно</p>
        <TinyMCE
          handleChange={(content: any, editor: any) =>
            setData({ ...data, description: editor.getContent() })
          }
        />
      </div>
      <div className="container">
        <Button
          clickHandler={() => {
            const realData = Object.fromEntries(
              Object.entries(data).filter(([key, value]) => value !== null)
            );
            if (Object.keys(realData).includes('day')) {
              realData.day = new Date(realData.day).toLocaleDateString();
            }
            console.log(realData);
          }}>
          Отправить задачу
        </Button>
      </div>
    </div>
  );
};

export { AddTask };
