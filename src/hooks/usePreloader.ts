import { useEffect, useRef, useState } from 'react'
import { useMediaQueries } from './useMediaQuery'

export const usePreloader = () => {
  const [apploaded, setAppLoaded] = useState<boolean | 'ready' | 'deleteNode'>(false)
  const { lg } = useMediaQueries()

  const timers = useRef<Map<string, NodeJS.Timeout>>(new Map())

  const timerHelper = (fn: () => void, id: string, ms: number) => {
    timers.current.set(id, setTimeout(fn, ms))
  }

  useEffect(() => {
    const preloaderInit = (ms: number) => {
      timerHelper(
        () => {
          setAppLoaded('ready')
          timerHelper(() => setAppLoaded('deleteNode'), 'timer2', 1000)
        },
        'timer1',
        ms
      )
    }

    if (apploaded === true) {
      if (lg) {
        preloaderInit(2300)
      } else preloaderInit(3700)
    }

    if (apploaded === 'deleteNode') {
      return () => [...timers.current.values()].forEach((item) => clearTimeout(item))
    }
  }, [apploaded, document.readyState])

  useEffect(() => {
    document.readyState == 'complete' ? setAppLoaded(true) : window.addEventListener('load', () => setAppLoaded(true))
  }, [document.readyState])

  return apploaded
}
