import { useGLTF, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react'
import * as THREE from "three"

export default function MacContainer2() {
  let model = useGLTF('./mac.glb')
  const videoRef = useRef();
  const videoTextureRef = useRef();
  
  let meshes = {};
  model.scene.traverse((e)=>{
    meshes[e.name] = e;
  });

  // Create video element and texture
  useEffect(() => {
    const video = document.createElement('video');
    video.src = './20250620133506.mp4'; // Replace with your video path
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true; // Required for autoplay in most browsers
    video.playsInline = true;
    video.autoplay = true;
    
    // Create video texture
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;
    
    videoRef.current = video;
    videoTextureRef.current = videoTexture;
    
    // Apply video texture to the screen mesh
    if (meshes.screen) {
      meshes.screen.material.map = videoTexture;
      meshes.screen.material.needsUpdate = true;
    }
    
    // Start playing video
    video.play().catch(console.error);
    
    return () => {
      video.pause();
      video.src = '';
      videoTexture.dispose();
    };
  }, [meshes.screen]);

  // Configure matte material (the laptop body)
  if (meshes.matte) {
    meshes.matte.material.emissiveIntensity = 0;
    meshes.matte.material.metalness = 0;
    meshes.matte.material.roughness = 1;
  }

  let data = useScroll();

  useFrame(() => {
    meshes.screen.rotation.x = THREE.MathUtils.degToRad(180 - data.offset * 90);
    
    // Update video texture if it exists
    if (videoTextureRef.current) {
      videoTextureRef.current.needsUpdate = true;
    }
  });

  return (
    <group position={[0,-10,20]}>
     <primitive object={model.scene}/>
    </group>
  )
}