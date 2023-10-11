import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterUsersSelector } from "../redux/selectors/usersSelectors";
import { useSearchParams } from "react-router-dom";
import { actionsUsers, requestUsers } from "../redux/reducers/usersReducer";

type QueryParamsType = {
  term?: string;
  friend?: string | boolean;
  page?: string;
};

export const useURLQuery = (currentPage: number, pageSize: number) => {
  const filter = useSelector(getFilterUsersSelector);
  const [prevFilter, setFilter] = useState(filter);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch: any = useDispatch();
  useEffect(() => {
    const query: QueryParamsType = {};
    if (filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (filter.friend == "") query.friend = "false";
    if (currentPage !== 1) query.page = String(currentPage);
    if (filter.friend !== prevFilter.friend || filter.term !== prevFilter.term)
      query.page = String(1);
    const queryToString = new URLSearchParams(query as string).toString();
    setSearchParams(queryToString);
  }, [filter, currentPage]);
  useEffect(() => {
    let parsed = Object.fromEntries([...searchParams]);
    let actualPage = currentPage;
    let actualFilter = filter;
    if (parsed.page) actualPage = Number(parsed.page);
    if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term };
    if (parsed.friend)
      actualFilter = {
        ...actualFilter,
        friend: parsed.friend == "false" ? "false" : "true",
      };
    setFilter(actualFilter);
    dispatch(requestUsers(actualPage, pageSize, actualFilter));
    dispatch(actionsUsers.setCurrentPage(actualPage));
  }, [searchParams]);
  return filter;
};
