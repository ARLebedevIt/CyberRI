import { useDispatch, useSelector } from "react-redux";
import usersSearch from "../../assets/images/iconSearch.png";
import { Formik, Form, Field } from "formik";
import { getFilterUsersSelector } from "../../redux/selectors/usersSelectors";
import React, { FC } from "react";
import { FilterType, requestUsers } from "../../redux/reducers/usersReducer";
import "./Users.scss";
import Input from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import Checkbox from "../../ui/Checkbox/Checkbox";

type PropsType = {
  pageSize: number;
};

const UsersFilter: FC<PropsType> = React.memo(({ pageSize }) => {
  const dispatch: any = useDispatch();
  const filter = useSelector(getFilterUsersSelector);
  const setFilter = (
    values: FilterType,
    onSubmitProps: {
      setStatus: (param: string | string[]) => void;
      setSubmitting: (isSubmitting: boolean) => void;
    }
  ) => {
    dispatch(requestUsers(1, pageSize, values, onSubmitProps.setSubmitting));
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        term: filter.term,
        friend: filter.friend,
      }}
      validateOnBlur
      onSubmit={setFilter}
    >
      {({ values, handleChange, isValid, handleSubmit, isSubmitting }) => (
        <Form className="users__form">
          <Input
            formik
            onKeyDown={(e) => e.key == "Enter" && handleSubmit()}
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
            value={
              values.friend == "false"
                ? false
                : values.friend == ""
                ? false
                : true
            }
            name="friend"
            onChange={handleChange}
          />
          <span>Товарищи</span>
          <Button
            className="users_search_button"
            onClick={() => handleSubmit()}
            type={"submit"}
            disabled={!isValid || isSubmitting}
          >
            <img src={usersSearch} alt="Здесь могла быть ваша картинка" />
          </Button>
        </Form>
      )}
    </Formik>
  );
});

export default UsersFilter;
