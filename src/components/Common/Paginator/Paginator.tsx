import React from 'react'
import './Paginator.scss'
import { usePaginator } from '../../../hooks/usePaginator'
import { Button } from '../../../ui/Button/Button'
import { useSelector } from 'react-redux'
import { getFilterUsersSelector } from '../../../redux/selectors/usersSelectors'

type Props = {
  pageSize: number
  totalItemsCount: number
  portionSize?: number
}

const Paginator: React.FC<Props> = React.memo(({ pageSize, totalItemsCount, portionSize = 5 }) => {
  const filter = useSelector(getFilterUsersSelector)
  const [portionNumber, portionCount, leftPortionPageNumber, rightPortionPageNumber, setPortionNumber, pages, onPageChanged] =
    usePaginator(totalItemsCount, pageSize, portionSize, filter)
  return (
    <div className="paginator">
      {portionNumber > 1 && (
        <Button className="paginator__buttons" onClick={() => setPortionNumber(portionNumber - 1)}>
          {'◄'}
        </Button>
      )}
      {pages
        .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
          return (
            <a key={p} onClick={() => onPageChanged(p)} className={filter.currentPage === p ? 'selectedPage' : ''}>
              {p}
            </a>
          )
        })}
      {portionCount > portionNumber + 5 && (
        <Button className="paginator__buttons" onClick={() => setPortionNumber(portionNumber + 1)}>
          {'►'}
        </Button>
      )}
    </div>
  )
})

export default Paginator
