import React, { RefObject, useCallback, useEffect, useState } from 'react'
import { useThrottle } from './useThrottle'


export const useScrollToBottom = (ref: RefObject<HTMLElement>, items: any[])
  : (e: React.UIEvent<HTMLDivElement, UIEvent>) => void => {

  const [isAutoScroll, setAutoScroll] = useState<boolean>(true)
  
  const scrollHandler = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {    
    const element = e.currentTarget
    if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
      !isAutoScroll && setAutoScroll(true)
    } else {
      isAutoScroll && setAutoScroll(false)
    }
  }, [isAutoScroll, setAutoScroll])

  const withThrottle = useThrottle(scrollHandler, 1000)
  
  useEffect(() => {
    let timer = setTimeout(() => {
      if (isAutoScroll) ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return () => clearTimeout(timer)
  }, [items])

  return withThrottle
}