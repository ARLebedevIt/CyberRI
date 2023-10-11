import React, { Ref, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Coat: THREE.Mesh
    Head: THREE.Mesh
    Eyes: THREE.Mesh
  }
  materials: {
    Livesey: THREE.MeshStandardMaterial
  }
}

export function Livesey(props: JSX.IntrinsicElements['group']) {
  const head = useRef<Mesh>(null!)
  const body = useRef<Mesh>(null!)
  useFrame((state) => {
    head.current.lookAt(state.pointer.x / 1.2, state.pointer.y / 2.5, 1.5)
    body.current.lookAt(state.pointer.x / 2.5, state.pointer.y / 3.2, 2)
  })
  const { nodes, materials } = useGLTF('models/DrLivesey-transformed.glb') as GLTFResult
  return (
    <group {...props} dispose={null} position={[0, -.2, 0]} scale={[15, 15, 15]}>
      <group ref={body as unknown as Ref<THREE.Group>}>
        <mesh name="Coat" geometry={nodes.Coat.geometry} material={materials.Livesey}
          morphTargetDictionary={nodes.Coat.morphTargetDictionary} morphTargetInfluences={nodes.Coat.morphTargetInfluences}
          position={[0, -1.76, -0.06]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group ref={head as unknown as Ref<THREE.Group>} >
        <mesh name="Head" geometry={nodes.Head.geometry} material={materials.Livesey}
          morphTargetDictionary={nodes.Head.morphTargetDictionary} morphTargetInfluences={nodes.Head.morphTargetInfluences}
          position={[0, -1.76, -0.06]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh name="Eyes" geometry={nodes.Eyes.geometry}
          morphTargetDictionary={nodes.Eyes.morphTargetDictionary} morphTargetInfluences={nodes.Eyes.morphTargetInfluences}
          position={[0, -1.76, -0.06]} rotation={[Math.PI / 2, 0, 0]} >
          <meshStandardMaterial color={'black'} metalness={5} roughness={0.1} />
        </mesh>
      </group>
    </group>
  )
}