import { SetStateAction, useEffect, useState } from 'react'

export const useBrowser = (): { name: string; version: string | number } => {
  const [currBrowser, setBrowser] = useState<{ name: string; version: string | number }>({ name: '', version: '' })
  useEffect(() => {
    function get_browser(): SetStateAction<{ name: string; version: string | number }> {
      let ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || []
        return { name: 'IE', version: tem[1] || '' }
      }
      if (M[1] === 'Chrome') {
        tem = ua.match(/\bEdg\/(\d+)/)
        if (tem != null) {
          return { name: 'Edge(Chromium)', version: tem[1] }
        }
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) {
          return { name: 'Opera', version: tem[1] }
        }
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
      if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1])
      }
      return {
        ...currBrowser,
        name: M[0],
        version: M[1]
      }
    }
    setBrowser(get_browser())
  }, [])
  return currBrowser
}
