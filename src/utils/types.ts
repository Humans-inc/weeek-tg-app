import { ReactNode } from "react";

export interface AddTaskProps {
  projectName: string;
  projectId: string;
}

export interface DataNewTask {
  category: string;
  title: string;
  priority: string | null;
  day: null | Date;
  description: string;
}

export interface ButtonProps {
  clickHandler?: () => void;
  children: ReactNode;
  classList?: string;
}

export interface CustomInputProps {
  value?: string | null;
  onClick?: () => void;
}