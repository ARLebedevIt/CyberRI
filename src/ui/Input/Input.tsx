import React, { Dispatch, InputHTMLAttributes, ReactNode, SetStateAction, memo } from "react";
import "./Input.scss";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange">;

export interface InputProps<T extends string | React.ChangeEvent<HTMLInputElement>> extends HTMLInputProps {
  className?: string;
  onChange?: (value: T) => void 
  value?: string
  formik?: boolean
  label?: string | ReactNode
}

// onChange?: (value: string | React.ChangeEvent<HTMLInputElement> ) => void 
const Input = <T extends string | React.ChangeEvent<HTMLInputElement>>(props: InputProps<T>) => {
  const { className, formik, label, value, onChange, ...otherProps } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formik) {
      onChange?.(e.target.value as T);
    } else {
      onChange?.(e as T);
    }
  };

  return (
    <>
    {label && <label htmlFor="inputLabel">{label}</label>}
    <input
      name="inputLabel"
      value={value}
      onChange={onChangeHandler}
      className={`defaultInput ${className ?? ""}`}
      {...otherProps}
    />
    </>
  );
}

export default Input;
