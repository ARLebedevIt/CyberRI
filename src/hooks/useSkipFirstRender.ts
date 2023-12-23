import React, { useEffect, useRef } from 'react'

export const useSkipFirstRender = (fn: any, ...args: any) => {
  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) {
      return fn()
    }
  }, [...args])

  useEffect(() => {
    isMounted.current = true
  }, [])
}

export default useSkipFirstRender
