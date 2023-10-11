import React, { FC, useEffect } from "react";
import "./Users.scss";
import Paginator from "../Common/Paginator/Paginator";
import { useSelector } from "react-redux";
import {
  getCurrentPageSelector,
  getPageSizeSelector,
  getTotalItemsCountSelector,
} from "../../redux/selectors/usersSelectors";
import withAuthRedirect from "../../redux/hoc/withAuthRedirect";
import { useURLQuery } from "../../hooks/useURLQuery";
import UsersFilter from "./UsersFilter";
import { Page } from "../../ui/Page/Page";
import Users from "./Users";

const UsersContainer: FC = () => {
  const totalItemsCount = useSelector(getTotalItemsCountSelector);
  const currentPage = useSelector(getCurrentPageSelector);
  const pageSize = useSelector(getPageSizeSelector);
  useURLQuery(currentPage, pageSize);
  return (
    <Page className="users__wrapper">
      <div className="users__items">
        <UsersFilter pageSize={pageSize} />
        <Users />
        <Paginator
          totalItemsCount={totalItemsCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </Page>
  );
};

const UsersWrapper = withAuthRedirect(UsersContainer);

export default UsersWrapper;
