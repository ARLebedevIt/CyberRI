import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionsUsers, requestUsers } from '../redux/reducers/usersReducer'
import { getCurrentPageSelector, getFilterUsersSelector } from '../redux/selectors/usersSelectors'

export const usePaginator = (totalItemsCount: any, pageSize: any, portionSize: any) => {
  const filter = useSelector(getFilterUsersSelector)
  const currPage = useSelector(getCurrentPageSelector)
  const dispatch: any = useDispatch()
  let pagesCount = Math.ceil(totalItemsCount / pageSize)
  const pages = useMemo(() => {
    let curPages: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
      curPages.push(i)
    }
    return curPages
  }, [totalItemsCount])

  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, setPortionNumber] = useState<number>(1)
  
  useEffect(() => {
    setPortionNumber(1)
  }, [filter.friend, filter.term])

  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize

  const onPageChanged = useCallback((pageNumber: number) => {
    if (currPage !== pageNumber) {
      dispatch(actionsUsers.setCurrentPage(pageNumber))
    }
  }, [])
  return [portionNumber, portionCount, leftPortionPageNumber, rightPortionPageNumber, setPortionNumber, pages, onPageChanged] as const
}