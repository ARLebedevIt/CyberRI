import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Pioner } from "./PionerModel";
import './Pioner.scss'

const PionerWrapper = () => {
  return (
    <div className='wrapperPioner'>
      <Canvas id='threePreloaderContainer'>
        <directionalLight intensity={.8} position={[0, 5, 9]} />
        <PerspectiveCamera makeDefault rotation={[-0.2, 0, 0.]} position={[-0.11, 0.12, 5.63]} />
        <mesh >
          <Pioner />
        </mesh>
      </Canvas>
    </div>
  )
}

export default PionerWrapper