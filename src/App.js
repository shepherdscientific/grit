import './App.css';
import Model from './Gri'
import { Canvas } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { OrbitControls, Cloud, Sparkles, Stars, useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'

function Grit(props){
  return (
    <>
    <Model position={[0, -0.45, 0]} rotation={[ Math.PI / 2 , 0 , 0]} scale={[ 1, 1 , 1]}  />   
    <BoxCube position={[0, 0, 0]} />
    </>
  );
} 

function Box(props) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const size = .35
  // useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.1 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={hovered ? 'yellow' : 'green'} />
    </mesh>
  );
}

function BoxCube(props){
  // Calculate positions of eight or eighteen cubes
  return (
    <>
    <Box position={[.8, 1.2, -.5]} />
    <Box position={[1.45, 1.2, -.5]} />
    <Box color={"orange"} position={[.8, 0.73, -.5]} />
    <Box position={[1.45, 0.73, -.5]} />  
    <Box position={[.8, 1.2, -1.15]} />
    <Box position={[1.45, 1.2, -1.15]} />
    <Box position={[.8, 0.73, -1.15]} />
    <Box position={[1.45, 0.73, -1.15]} />        
    <Box position={[2.45, 0.1, 0]} rotation={[ Math.PI / 4 , Math.PI / 4 , Math.PI / 4]}/>
    {/* <Box position={props.position} />
    <Box position={props.position} />
    <Box position={props.position} /> */}
    </>
  );
}


function App() {
  return (
    // <div className="App">
    <Canvas>
      <OrbitControls/>
      <Cloud/>
      <Sparkles/>
      <Stars/>
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <Environment preset="city" />   
      <group position={[0, -0.2, 0]}>
        <pointLight position={[10, 10, 10]} />
        <Grit position={[0, -10, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#101010"
            metalness={0.5}
          />
        </mesh>
      </group>               
    </Canvas>
    // </div>
  );
}

export default App;
