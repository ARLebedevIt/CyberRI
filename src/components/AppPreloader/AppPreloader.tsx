import React, { FC, useRef, useEffect } from "react";
import './AppPreloader.scss';
import PionerWrapper from "../Three/PionerPreloader/PionerWrapper";
import preloaderSVG from "../../assets/images/preloader.svg";

type PropsType = {
  apploaded: boolean | string
}

const AppPreloader: FC<PropsType> = React.memo(({ apploaded }) => {
  const container = useRef<HTMLDivElement>(null!)
  const preloader = useRef<HTMLDivElement>(null!)
  useEffect(() => {
    if (apploaded == 'ready') {
      container.current.classList.add('_hideContainer')
    }
    if (apploaded == true) {
      preloader.current.classList.add('_hideSVG')
    }
  }, [apploaded])
  return (
    <div ref={container} className='appPreloader__content'>
      <div className='appPreloader__items'>
        <div ref={preloader} className='appPreloader__item'>
          <img src={preloaderSVG} alt="" />
        </div>
        <div>
          <PionerWrapper />
        </div>
      </div>
    </div>
  )
})

export default AppPreloader