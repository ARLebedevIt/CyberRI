import React, { ChangeEvent, ReactNode, TextareaHTMLAttributes, useEffect, useLayoutEffect, useRef } from 'react'
import './Textarea.scss'

type HTMLTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange' | 'readOnly'>

interface TextareaProps<T extends string | React.ChangeEvent<HTMLTextAreaElement>> extends HTMLTextareaProps {
  onChange?: (value: T) => void
  value: string
  className?: string
  label?: string | ReactNode
  formik?: boolean

}
// onChange?: (value: string | React.ChangeEvent<HTMLTextAreaElement> ) => void 

const Textarea = <T extends string | React.ChangeEvent<HTMLTextAreaElement>>(props: TextareaProps<T>) => {
  const {className, value, formik, onChange, label, ...otherProps } = props
  const ref = useRef<HTMLTextAreaElement>(null)
  
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (formik) {
      onChange?.(e as T);
    } else {
      onChange?.(e.target.value as T);
    }
  };

  useLayoutEffect(() => {
    ref!.current!.style.height = "inherit";
    const textHeight = ref!.current!.scrollHeight;
    ref!.current!.style.height = (textHeight + 5) + "px";
  }, [value])

  return (
    <>
    {label && <label htmlFor='forLabel'>{label}</label>}
    <textarea name='forLabel' 
    {...otherProps} value={value} className={`defaultTextarea ${className ?? ''}`} onChange={onChangeHandler} ref={ref}  />
    </>
  )
}

export default Textarea