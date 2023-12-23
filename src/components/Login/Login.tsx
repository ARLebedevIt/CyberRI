import React, { FC } from 'react'
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import './Login.scss'
import { getAuthLogin, getAuthLogout } from '../../redux/reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getCaptchaSelector, getIsAuthSelector } from '../../redux/selectors/authSelectors'
import { Button } from '../../ui/Button/Button'
import { Page } from '../../ui/Page/Page'
import Input from '../../ui/Input/Input'
import Checkbox from '../../ui/Checkbox/Checkbox'
import { useMediaQueries } from '../../hooks/useMediaQuery'

const LoginForm: FC = () => {
  const { lg } = useMediaQueries()
  const isAuth = useSelector(getIsAuthSelector)
  const captchaUrl = useSelector(getCaptchaSelector)
  const dispacth: any = useDispatch()
  const onSubmit = (
    values: {
      email: string
      password: string
      rememberMe: string
      captcha: string
    },
    onSubmitProps: {
      setStatus: (param: string | string[]) => void
      setSubmitting: (isSubmitting: boolean) => void
    }
  ) => {
    dispacth(
      getAuthLogin(
        values.email,
        values.password,
        values.rememberMe,
        values.captcha,
        onSubmitProps.setStatus,
        onSubmitProps.setSubmitting
      )
    )
  }
  if (isAuth) return <Navigate to={'/profile'} />
  const validationSchema = yup.object().shape({
    email: yup.string().typeError('Должно быть строкой').required('Обязательно к заполнению'),
    password: yup.string().required('Обязательно к заполнению').min(4, 'Минимум 8 символов').max(16, 'Максимум 16 символов')
  })
  return (
    <Page className="auth__content">
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: 'false',
          captcha: ''
        }}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, isSubmitting, status }) => (
          <Form onSubmit={handleSubmit} className="auth__items">
            <div className="auth__item_login">
              <label htmlFor={'email'}>
                <span>Логин</span>
              </label>
              <Input
                autoFocus={lg}
                className="login__input"
                autoComplete="email"
                placeholder={'Идентификатор'}
                type={'email'}
                name={'email'}
                formik
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </div>
            {touched.email && errors.email && <span className="auth__item_error">{errors.email}</span>}
            <div className="auth__item_login">
              <label htmlFor={'password'}>
                <span>Пароль</span>
              </label>
              <Input
                formik
                className="login__input"
                placeholder={'Код-слово'}
                type={'password'}
                autoComplete="current-password"
                name={'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>

            {touched.password && errors.password && <span className="auth__item_error">{errors.password}</span>}
            <Checkbox
              type="checkbox"
              formik
              onChange={handleChange}
              value={values.rememberMe}
              name={'rememberMe'}
              id={'rememberMe'}
              labelFor="rememberMe"
              className="login__checkbox"
            />
            <span className="login__rememberMe">Запомнить</span>
            <span className="auth__item_error">
              {status == 'Enter valid Email'
                ? 'Введите корректный логин'
                : status == 'Incorrect Email or Password'
                ? 'Неверный логин или пароль'
                : null}
            </span>
            {captchaUrl && (
              <div className="auth__item_captcha">
                <img src={captchaUrl}></img>
              </div>
            )}
            {captchaUrl && (
              <Input
                formik
                className="login__input"
                autoComplete="captcha"
                type={'text'}
                name={'captcha'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.captcha}
              />
            )}
            <Button className="login__button" type={'submit'} disabled={!isValid || isSubmitting}>
              <span>Подключиться</span>
            </Button>
          </Form>
        )}
      </Formik>
    </Page>
  )
}

export default LoginForm
