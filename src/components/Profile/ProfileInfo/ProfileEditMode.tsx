import './ProfileInfo.scss'
import { Form, Formik } from "formik";
import { ChangeEvent, Dispatch, FC, SetStateAction, memo, useCallback } from 'react';
import * as yup from 'yup'
import { saveDescripton, savePhoto, updateStatus } from '../../../redux/reducers/profileReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getEditDataProfile } from '../../../redux/selectors/profileSelectors';
import Textarea from '../../../ui/Textarea/Textarea';
import Input from '../../../ui/Input/Input';
import { Button } from '../../../ui/Button/Button';
import Checkbox from '../../../ui/Checkbox/Checkbox';

export type DescriptionProfileType = {
  status?: string
  fullName?: string,
  lookingForAJobDescription?: string,
  lookingForAJob?: boolean,
  aboutMe?: string,
  contacts?: {
    github: string,
    mainLink: string,
  },
}

type PropsType = {
  setEditMode: Dispatch<SetStateAction<boolean>>
  editMode: boolean
}

const ProfileEditMode: FC<DescriptionProfileType & PropsType> = memo((props) => {
  const dispatch: any = useDispatch()  
  const profile = useSelector(getEditDataProfile.getProfile)
  const status = useSelector(getEditDataProfile.getStatus)

  const sendDescription = (values: DescriptionProfileType,
    onSubmitProps: { setStatus: (param: string | string[]) => void, setSubmitting: (isSubmitting: boolean) => void }) => {
    dispatch(saveDescripton(values, onSubmitProps.setStatus, onSubmitProps.setSubmitting, props.setEditMode))
    dispatch(updateStatus(values.status ?? ''))
  }

  let validationSchema = yup.object().shape({
    fullName: yup.string().required('Поле не заполнено!').max(20, 'Максимум символов: 10'),
    aboutMe: yup.string().required('Поле не заполнено!').max(200, 'Максимум символов: 200'),
  })
  const onMainPhotoSelected = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(savePhoto(e.target.files[0]))
    }
  }, [])  
  return (
    <Formik
      initialValues={{
        fullName: profile?.fullName ?? '',
        lookingForAJobDescription: profile?.lookingForAJobDescription ?? '',
        lookingForAJob: profile?.lookingForAJob ?? false,
        aboutMe: profile?.aboutMe ?? '',
        contacts: {
          github: profile?.contacts.github ?? '',
          mainLink: profile?.contacts.mainLink ?? '',
        },
        status: status ?? '',
      }}
      validateOnBlur
      validationSchema={validationSchema}
      onSubmit={sendDescription}
      enableReinitialize
    >
      {({ values, errors, handleChange, handleBlur, isValid, handleSubmit, isSubmitting }) => (
        <Form>
          <div className={props.editMode ? 'description__edit__items' : 'description__items_bio'}>

            <label htmlFor="updatePhoto" className='description__label'>Фотокарточка</label>
            <Input formik id='updatePhoto' type={'file'} className='description__input_photo'
              onChange={onMainPhotoSelected} />

            <span className='description__edit_errors'>{errors.fullName}</span>
            <Textarea formik label={'Имя'} autoFocus className='description__textarea' name={'fullName'}
              onChange={handleChange} onBlur={handleBlur} value={values.fullName} />

            <span className='description__edit_errors'>{errors.aboutMe}</span>
            <Textarea formik label='Характеристика' className='description__textarea' name={'aboutMe'}
              onChange={handleChange} onBlur={handleBlur} value={values.aboutMe} />

            <span>В поиске работы?</span>
            <Checkbox formik onChange={handleChange}
              labelFor='lookingForAJob'
              name='lookingForAJob'
              id='lookingForAJob'
              className='description__checkbox'
              value={values.lookingForAJob}
             />

            <Textarea formik label={'Навыки'} className='description__textarea' name={'lookingForAJobDescription'}
              onChange={handleChange} onBlur={handleBlur} value={values.lookingForAJobDescription} />

            <Textarea formik label={'ГитХаб'} className='description__textarea' name={'contacts.github'}
              onChange={handleChange} onBlur={handleBlur} value={values.contacts.github} />

            <Textarea formik label={'Портфолио'} className='description__textarea' name={'contacts.mainLink'}
              onChange={handleChange} onBlur={handleBlur} value={values.contacts.mainLink} />

            <Textarea formik label='Статус' className='description__textarea' name={'status'}
              onChange={handleChange} onBlur={handleBlur} value={values.status} />

            <Button className='description__button'
              onClick={() => handleSubmit()} type={'submit'} disabled={!isValid || isSubmitting}>
              Сохранить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
})

export default ProfileEditMode