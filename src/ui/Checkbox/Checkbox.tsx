import React, { InputHTMLAttributes } from 'react'
import './Checkbox.scss'

type HTMLCheckboxPropsProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

export interface CheckboxProps<T extends string | React.ChangeEvent<HTMLInputElement>> extends HTMLCheckboxPropsProps {
  className?: string
  onChange?: (value: T) => void
  value?: string | boolean
  formik?: boolean
  labelFor?: string
}

// onChange?: (value: string | React.ChangeEvent<HTMLInputElement> ) => void

const Checkbox = <T extends string | React.ChangeEvent<HTMLInputElement>>(props: CheckboxProps<T>) => {
  const { className, formik, labelFor, value, onChange, ...otherProps } = props

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formik) {
      onChange?.(e.target.value as T)
    } else {
      onChange?.(e as T)
    }
  }

  return (
    <>
      <input className="defaultCheckbox" type="checkbox" value={`${value}`} onChange={onChangeHandler} {...otherProps} />
      <label className={`defaultCheckboxLabel ${className ?? ''}`} htmlFor={labelFor}></label>
    </>
  )
}

export default Checkbox
