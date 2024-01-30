import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  clickHandler?: () => void;
  children: ReactNode;
  classList?: string;
}

const Button: FC<ButtonProps> = ({ clickHandler, children, classList = '' }) => {
  return (
    <button className={`${styles.button} ${classList}`} onClick={clickHandler}>
      {children}
    </button>
  );
};

export { Button };
