import { useGLTF, useScroll, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from "three"

export default function MacContainer() {
  let model = useGLTF('./mac.glb')
  let tex = useTexture('./red.jpg')
  let meshes = {};
  model.scene.traverse((e)=>{
    meshes[e.name] = e;
  });
  console.log(meshes)
  meshes.matte.material.map = tex;
  meshes.matte.material.emissiveIntensity = 0;
  meshes.matte.material.metalness = 0;
  meshes.matte.material.roughness = 1;

  // meshes.screen.rotation.x = THREE.MathUtils.degToRad(90)
  let data = useScroll();

  useFrame(()=>{
    meshes.screen.rotation.x = THREE.MathUtils.degToRad(180 - data.offset*90 )
  })

  return (
    <group position={[0,-10,20]}>
     <primitive object={model.scene}/>
    </group>
    // <mesh>
    //   <boxGeometry/>
    // </mesh>
  )
}
