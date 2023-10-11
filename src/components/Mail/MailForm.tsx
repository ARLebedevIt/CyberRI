import './Mail.scss'
import React, {  Dispatch, FC, SetStateAction, useState } from 'react'
import { Formik } from "formik";
import * as yup from 'yup'
import { sendMailMessage } from '../../redux/reducers/contactsReducer';
import { useDispatch } from 'react-redux';
import Textarea from '../../ui/Textarea/Textarea';
import { Button } from '../../ui/Button/Button';

type PropsType = {
  setModelChanger: Dispatch<SetStateAction<boolean>>
  modelChanger: boolean
}

const MailForm: FC<PropsType> = React.memo(({ setModelChanger, modelChanger}) => {
  const dispatch: any = useDispatch()
  const deviceWidth = window.innerWidth
  const validationSchema = yup.object().shape({
    subject: yup.string().required('Обязательно к заполнению'),
    text: yup.string().required('Обязательно к заполнению'),
    name: yup.string().required('Обязательно к заполнению'),
    mailAddress: yup.string().required('Обязательно к заполнению')
  })
  const onSubmit = (values: { subject: string, name: string, mailAddress: string, text: string },
    onSubmitProps: { setStatus: (param: string | string[]) => void, setSubmitting: (isSubmitting: boolean) => void }) => {
    dispatch(sendMailMessage(values.subject, values.name, values.mailAddress, values.text, onSubmitProps.setSubmitting))
    onSubmitProps.setSubmitting(true)
    setModelChanger(true)
  }
  return (
      <Formik
        initialValues={{
          subject: 'Сотрудничество с КиберНИИ.',
          text: '',
          name: '',
          mailAddress: '',
        }}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, isSubmitting }) => (
          <>
            <div className='mail__row'>
            <div className='mail__title'>Сотрудничество с КиберНИИ</div>
              <div className='mail__items'>
                <div className='mail__item'>
                    <Textarea
                      formik
                      label='Тема'
                      placeholder={touched.subject ? errors.subject : ''}
                      autoComplete="subject" 
                      name={'subject'}
                      onChange={handleChange}
                      onBlur={handleBlur} 
                      value={values.subject} />
                </div>
                <div className='mail__item'>
                    <Textarea
                    formik
                    label='Почта'
                    value={values.mailAddress}
                    autoComplete="mail" 
                    name={'mailAddress'} 
                    placeholder={touched.mailAddress ? errors.mailAddress : ''}
                    onBlur={handleBlur}
                    onChange={handleChange} />
                </div>
                <div className='mail__item'>
                    <Textarea autoFocus={deviceWidth > 1200 && true}
                      label='Имя'
                      formik
                      autoComplete="name" 
                      name={'name'}
                      placeholder={touched.name ? errors.name : ''}
                      onChange={handleChange}
                      onBlur={handleBlur} value={values.name} />
                </div>
                <div className='mail__item'>
                    <Textarea
                      label='Текст'
                      formik
                      autoComplete="text"
                      name='text'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={touched.text ? errors.text : ''}
                      value={values.text} />
                </div>
                <div className='mail__item'>
                  <Button
                    onClick={() => handleSubmit()} type={'submit'}
                    disabled={!isValid || isSubmitting}>
                      Отправить
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Formik>
  )
})

export default MailForm