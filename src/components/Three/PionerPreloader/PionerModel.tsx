import React, { Ref, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import * as THREE from 'three'
import { Mesh } from 'three'

type ActionName = 'Armature|mixamo.com|Layer0'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Cube002: THREE.SkinnedMesh
    Cube002_1: THREE.SkinnedMesh
    Cube002_2: THREE.SkinnedMesh
    Cube002_3: THREE.SkinnedMesh
    Eyes: THREE.SkinnedMesh
    Hair: THREE.SkinnedMesh
    Hat: THREE.SkinnedMesh
    Tie: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
    ['Material.005']: THREE.MeshStandardMaterial
    ['Material.007']: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    ['Material.008']: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

export function Pioner(props: JSX.IntrinsicElements['group']) {
  const group = useRef<Mesh>(null)
  const { nodes, materials, animations } = useGLTF('/models/pionerPreloader.glb', true) as GLTFResult
  const { actions, names } = useAnimations(animations, group)
  useEffect(() => {
    actions[names[0]]!.play()
  }, [])
  return (
    <group ref={group as unknown as Ref<THREE.Group>} {...props} rotation={[0, Math.PI / 2, 0]} scale={[3, 3, 3]} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[0, -0.84, 0.01]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <group name="Body">
            <skinnedMesh
              name="Cube002"
              geometry={nodes.Cube002.geometry}
              material={materials['Material.003']}
              skeleton={nodes.Cube002.skeleton}
            />
            <skinnedMesh
              name="Cube002_1"
              geometry={nodes.Cube002_1.geometry}
              material={materials['Material.004']}
              skeleton={nodes.Cube002_1.skeleton}
            />
            <skinnedMesh
              name="Cube002_2"
              geometry={nodes.Cube002_2.geometry}
              material={materials['Material.005']}
              skeleton={nodes.Cube002_2.skeleton}
            />
            <skinnedMesh
              name="Cube002_3"
              geometry={nodes.Cube002_3.geometry}
              material={materials['Material.007']}
              skeleton={nodes.Cube002_3.skeleton}
            />
          </group>
          <skinnedMesh
            name="Eyes"
            geometry={nodes.Eyes.geometry}
            material={materials['Material.002']}
            skeleton={nodes.Eyes.skeleton}
          />
          <skinnedMesh
            name="Hair"
            geometry={nodes.Hair.geometry}
            material={materials['Material.001']}
            skeleton={nodes.Hair.skeleton}
          />
          <skinnedMesh
            name="Hat"
            geometry={nodes.Hat.geometry}
            material={materials['Material.008']}
            skeleton={nodes.Hat.skeleton}
          />
          <skinnedMesh
            name="Tie"
            geometry={nodes.Tie.geometry}
            material={materials['Material.008']}
            skeleton={nodes.Tie.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/pionerPreloader-transformed.glb')
