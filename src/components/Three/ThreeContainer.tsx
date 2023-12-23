import { Canvas } from '@react-three/fiber'
import React, { Suspense, FC } from 'react'
import ThreeModel from './ModelWrapper'
import './Three.scss'
import Preloader from '../Common/Preloader/Preloader'

export type PropsType = {
  modelChanger: boolean
}

const ThirdWord: FC<PropsType> = ({ modelChanger }) => {
  return (
    <div className={modelChanger ? `wrapperThreeLivesey` : 'wrapperThreeTwin'}>
      <Canvas id="threeCanvasContainer">
        <Suspense fallback={null}>
          <ThreeModel modelChanger={modelChanger} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThirdWord
