import React, { FC, useRef, useEffect } from 'react'
import './AppPreloader.scss'
import PionerWrapper from '../Three/PionerPreloader/PionerWrapper'
import preloaderSVG from '../../assets/images/preloader.svg'
import { usePreloader } from '../../hooks/usePreloader'

const AppPreloader: FC = React.memo(() => {
  const apploaded = usePreloader()

  if (apploaded === 'deleteNode') {
    return null
  }

  return (
    <div className={`appPreloader__content ${apploaded == 'ready' && '_hideContainer'}`}>
      <div className="appPreloader__items">
        <div className={`appPreloader__item ${apploaded === true && '_hideSVG'}`}>
          <img src={preloaderSVG} alt="" />
        </div>
        <PionerWrapper />
      </div>
    </div>
  )
})

export default AppPreloader
