import { PerspectiveCamera } from '@react-three/drei'
import { Livesey } from './ThreeModels/DrLivesey'
import { Twin } from './ThreeModels/Twin'
import { Vector3 } from '@react-three/fiber'

export type PropsType = {
  modelChanger: boolean
}

export default function ThreeModel({ modelChanger }: PropsType) {
  const cameraPosTwin: Vector3 = [-0.11, 2.12, 9.63]
  const lightTwin = 2.3
  const lightLivesey = 1.2
  const cameraPosLivesey: Vector3 = [-0.11, 2.12, 12.63]
  return (
    <>
      <directionalLight intensity={modelChanger ? lightLivesey : lightTwin} position={[0, 11, 10]} />
      <PerspectiveCamera makeDefault rotation={[-0.2, 0, 0]} position={modelChanger ? cameraPosLivesey : cameraPosTwin} />
      <mesh>{modelChanger ? <Livesey /> : <Twin />}</mesh>
    </>
  )
}
