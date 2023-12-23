import * as yup from 'yup'
import { Form, Formik, FormikState } from 'formik'
import './Discourse.scss'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { SendMessageDiscourse, sendMessageDS } from '../../redux/reducers/discourseReducer'
import React from 'react'
import { Button } from '../../ui/Button/Button'
import Textarea from '../../ui/Textarea/Textarea'

const DiscourseNav: FC = React.memo(() => {
  let validationSchema = yup.object().shape({
    newMessageText: yup.string().required('Пустое поле').max(100, 'Слишком длинное сообщение')
  })
  const dispatch: any = useDispatch()

  const sendMessage = (
    values: SendMessageDiscourse,
    { resetForm }: { resetForm: (nextState?: Partial<FormikState<SendMessageDiscourse>>) => void }
  ) => {
    dispatch(sendMessageDS(values))
    resetForm({ values: { newMessageText: '' } })
  }

  const handleTextArea = (e: React.KeyboardEvent<HTMLTextAreaElement>, submit: () => void) => {
    e.preventDefault()
    submit()
  }
  return (
    <Formik
      initialValues={{
        newMessageText: ''
      }}
      validateOnBlur
      onSubmit={sendMessage}
      validationSchema={validationSchema}
    >
      {(props) => (
        <Form className="discourse__nav">
          <Textarea
            formik
            onKeyDown={(e) => e.key == 'Enter' && handleTextArea(e, props.handleSubmit)}
            className="discourse__textarea"
            placeholder="Поделитесь чем-то..."
            name={'newMessageText'}
            value={props.values.newMessageText}
            onChange={props.handleChange}
          />
          <Button
            className="discourse__button"
            disabled={!props.isValid || props.isSubmitting}
            type="reset"
            onClick={() => props.handleSubmit()}
          >
            Отправить
          </Button>
          {props.errors.newMessageText && <div className="discourse__error">{props.errors.newMessageText}</div>}
        </Form>
      )}
    </Formik>
  )
})

export default DiscourseNav
