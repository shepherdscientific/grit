import './App.css';
import Model from './Grit'
import { Canvas } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { OrbitControls, Stars, useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'

function Grit(props){
  return (
    <>
    <Model position={[0, -0.5, 0]} rotation={[4 * Math.PI / 7 , 0 , 0]} scale={[ 1, 1 , 1]}  />   
    <BoxCube position={[2.465, 0.85, -1.47]} />
    </>
  );
} 

function Box(props) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.1 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1.25, 1.25, 1.25]} />
      <meshStandardMaterial color={hovered ? 'yellow' : 'green'} />
    </mesh>
  );
}

function BoxCube(props){
  // Calculate positions of eight or eighteen cubes
  return (
    <>
    <Box position={props.position} />
    <Box />
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
