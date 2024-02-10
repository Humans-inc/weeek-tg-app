/* eslint-disable @typescript-eslint/no-explicit-any */
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { forwardRef, Ref } from 'react';
import { CustomInputProps } from '../../utils/types';

import styles from './CustomDatePicker.module.scss';

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

export {CustomDatePicker}
