import * as yup from 'yup'
import { Form, Formik, FormikState } from 'formik'
import './MyPosts.scss'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { actionsProfile } from '../../../redux/reducers/profileReducer'
import { useFutureDate } from '../../../hooks/useFutureDate'
import { Button } from '../../../ui/Button/Button'
import Textarea from '../../../ui/Textarea/Textarea'

type PropsType = {
  postsId: number
}

const MyPostCreator: FC<PropsType> = (props) => {
  const dispatch = useDispatch()
  let validationSchema = yup.object().shape({
    newPostText: yup.string().required('Пустое поле').max(100, 'Слишком длинная запись')
  })

  const getDate = useFutureDate()

  let addPost = (
    values: { newPostText: string },
    { resetForm }: { resetForm: (nextState?: Partial<FormikState<{ newPostText: string }>>) => void }
  ) => {
    dispatch(actionsProfile.addPost(values.newPostText, getDate, props.postsId + 1))
    resetForm({ values: { newPostText: '' } })
  }
  return (
    <Formik
      initialValues={{
        newPostText: ''
      }}
      validateOnBlur
      onSubmit={addPost}
      validationSchema={validationSchema}
    >
      {(props) => (
        <Form className="posts__ui">
          <span>Журнал</span>
          <Textarea
            formik
            className="post__textarea"
            placeholder="Увековечьте мысль..."
            name={'newPostText'}
            value={props.values.newPostText}
            onChange={props.handleChange}
          />
          <span>{props.errors.newPostText}</span>
          <Button
            className="post__button"
            disabled={props.touched.newPostText && props.values.newPostText.length == 0}
            onClick={() => props.handleSubmit()}
          >
            Добавить
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default MyPostCreator
