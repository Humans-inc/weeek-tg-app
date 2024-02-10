import { FC } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from '../../../utils/types';

const Button: FC<ButtonProps> = ({ clickHandler, children, classList = '' }) => {
  return (
    <button className={`${styles.button} ${classList}`} onClick={clickHandler}>
      {children}
    </button>
  );
};

export { Button };
