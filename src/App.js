import './App.css';
import Model from './Gri'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { OrbitControls, Cloud, Sparkles, Stars, useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'

function Grit(props){
  return (
    <mesh {...props}>
    <Model position={[0, 0, 0]} rotation={[ Math.PI / 2 , 0 , 0]} scale={[ 1, 1 , 1]}  />   
    <BoxCube position={[1.125, 1.4, -.85]} />
    <Box position={[3.45, 0.6 , -1.4]} rotation={[ Math.PI / 3 , Math.PI / 3 , Math.PI / 3]}/>    
    </mesh>
  );
} 
function Sphere(props) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.1 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <sphereGeometry args={[.025,16,16]} />
      <meshStandardMaterial color={hovered ? 'yellow' : 'red'} />
    </mesh>
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
    const mesh = useRef()
    console.log(mesh)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)    
    useFrame((state, delta) => (mesh.current.rotation.y += 0.01))  
    const [ x_pos, y_pos, z_pos ] = [0.325,0.275,0.325]
    return (
    <mesh {...props}
          ref={mesh}
      >
      <Box position={[x_pos, y_pos, -z_pos]} />
      <Box position={[-x_pos, y_pos, -z_pos]} />
      <Box position={[x_pos, -y_pos, -z_pos]}  />
      <Box position={[-x_pos, -y_pos, -z_pos]} />  
      <Box position={[x_pos, y_pos, z_pos]} />
      <Box position={[-x_pos, y_pos, z_pos]} />
      <Box position={[x_pos, -y_pos, z_pos]} />
      <Box position={[-x_pos, -y_pos, z_pos]} />    
      <Sphere position={[0,0,0]} />
      
    </mesh>
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
        <pointLight position={[10, 10, 10]} intensity={5} />
        <Grit position={[0, -.47, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[700, 1000]}
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
