import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilterType, actionsUsers, requestUsers } from '../redux/reducers/usersReducer'

export const usePaginator = (totalItemsCount: number, pageSize: number, portionSize: number, filter: FilterType) => {
  const dispatch: any = useDispatch()
  const pagesCount = Math.ceil(totalItemsCount / pageSize)

  const pages = useMemo(() => {
    let curPages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
      curPages.push(i)
    }
    return curPages
  }, [totalItemsCount])

  const portionCount = Math.ceil(pagesCount / portionSize)
  const [portionNumber, setPortionNumber] = useState<number>(1)

  useEffect(() => {
    setPortionNumber(1)
  }, [filter.friend, filter.term])

  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize

  const onPageChanged = useCallback(
    (pageNumber: number) => {
      if (filter.currentPage !== pageNumber) {
        dispatch(actionsUsers.setFilter({ ...filter, currentPage: pageNumber }))
        dispatch(requestUsers())
      }
    },
    [filter])

  return [
    portionNumber,
    portionCount,
    leftPortionPageNumber,
    rightPortionPageNumber,
    setPortionNumber,
    pages,
    onPageChanged
  ] as const
}
