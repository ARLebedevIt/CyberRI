import { useDispatch, useSelector } from 'react-redux'
import usersSearch from '../../assets/images/iconSearch.png'
import { Formik, Form } from 'formik'
import { getFilterUsersSelector } from '../../redux/selectors/usersSelectors'
import React, { FC } from 'react'
import { FilterType, actionsUsers, requestUsers } from '../../redux/reducers/usersReducer'
import './Users.scss'
import Input from '../../ui/Input/Input'
import { Button } from '../../ui/Button/Button'
import Checkbox from '../../ui/Checkbox/Checkbox'

const UsersFilter: FC = React.memo(() => {
  const dispatch: any = useDispatch()
  const filter = useSelector(getFilterUsersSelector)
  const setFilter = (values: FilterType) => {
    dispatch(actionsUsers.setFilter(values))
    dispatch(requestUsers())
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        term: filter.term,
        friend: filter.friend,
        currentPage: 1
      }}
      validateOnBlur
      onSubmit={setFilter}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="users__form">
          <Input
            formik
            onKeyDown={(e) => e.key == 'Enter' && handleSubmit()}
            autoFocus
            id="input"
            onChange={handleChange}
            name="term"
            value={values.term}
          />
          <Checkbox
            formik
            labelFor="friend"
            id="friend"
            checked={values.friend}
            value={values.friend}
            name="friend"
            onChange={handleChange}
          />
          <span>Товарищи</span>
          <Button className="users_search_button" type="submit">
            <img src={usersSearch} alt="Здесь могла быть ваша картинка" />
          </Button>
        </Form>
      )}
    </Formik>
  )
})

export default UsersFilter
