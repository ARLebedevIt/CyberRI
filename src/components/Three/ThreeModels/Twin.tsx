import React, { Ref, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import { Mesh } from 'three'

type GLTFResult = GLTF & {
  nodes: {
    Object_8: THREE.Mesh
    Object_8_1: THREE.Mesh
    Object_8_2: THREE.Mesh
    Object_0032: THREE.Mesh
    Object_0032_1: THREE.Mesh
    Object_0032_2: THREE.Mesh
    Object_0032_3: THREE.Mesh
    Object_0032_4: THREE.Mesh
    Object_0032_5: THREE.Mesh
    Object_0032_6: THREE.Mesh
  }
  materials: {
    ['default']: THREE.MeshPhysicalMaterial
    default3: THREE.MeshPhysicalMaterial
    default1: THREE.MeshPhysicalMaterial
    default2: THREE.MeshPhysicalMaterial
    ['default.002']: THREE.MeshPhysicalMaterial
    ['default2.002']: THREE.MeshPhysicalMaterial
    ['default1.002']: THREE.MeshPhysicalMaterial
    ['default3.002']: THREE.MeshPhysicalMaterial
  }
}
export function Twin(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('models/Twin-transformed.glb') as GLTFResult  
  const head = useRef<Mesh>(null!)
  const body = useRef<Mesh>(null!)
  useFrame((state) => {
    head.current.lookAt(state.pointer.x / 1, state.pointer.y / 2.5, 1.5)
    body.current.lookAt(state.pointer.x / 1.7, state.pointer.y / 3.2, 2)
  })
  return (
    <group {...props} scale={2.9} dispose={null}>
      <group ref={head as unknown as Ref<THREE.Group>}>
        <group position={[-0.01, -11.28, 0.05]} rotation={[-Math.PI / 2, 0, 0]} scale={0.07}>
          <mesh geometry={nodes.Object_8.geometry} material={materials['default']} />
          <mesh geometry={nodes.Object_8_1.geometry} material={materials.default3} />
          <mesh geometry={nodes.Object_8_2.geometry} material={materials.default1} />
        </group>
      </group>
      <group ref={body as unknown as Ref<THREE.Group>}>
        <group position={[-0.01, -11.28, 0.05]} rotation={[-Math.PI / 2, 0, 0]} scale={0.07}>
          <mesh geometry={nodes.Object_0032.geometry} material={materials.default2} />
          <mesh geometry={nodes.Object_0032_1.geometry} material={materials.default1} />
          <mesh geometry={nodes.Object_0032_2.geometry} material={materials['default']} />
          <mesh geometry={nodes.Object_0032_3.geometry} material={materials['default']} />
          <mesh geometry={nodes.Object_0032_4.geometry} material={materials.default2} />
          <mesh geometry={nodes.Object_0032_5.geometry} material={materials.default1} />
          <mesh geometry={nodes.Object_0032_6.geometry} material={materials.default3} />
        </group>
      </group>
    </group>
  )
}