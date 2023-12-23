import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterType} from '../redux/reducers/usersReducer'

// Helpers and Types

type URLParamsType = Record<string, string | number | boolean>

const mapDataToURL: Record<keyof FilterType, string> = {
  currentPage: 'page',
  term: 'search',
  friend: 'friend'
}

const mappedUrlParams = (params: URLParamsType) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([name, value]) => {
    const mappedName = mapDataToURL[name as keyof FilterType]
    if (value) {
      searchParams.set(mappedName, String(value))
    }
  })
  return searchParams
}



// Functional logic
export function getQueryParams(params: URLParamsType) {
  const searchParams = mappedUrlParams(params)
  return `?${searchParams.toString()}`
}

export function addQueryParams(params: URLParamsType) {
  window.history.pushState(null, '', getQueryParams(params))
}


// Hook variant 
export const useURLQuery = (params: URLParamsType) => {
  const [_, setSearchParams] = useSearchParams()

  useEffect(() => {
    const searchParams = mappedUrlParams(params)
    setSearchParams(searchParams)
  }, [params])
}
