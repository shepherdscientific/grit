import './App.css';
import Model from './Grit'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'

function Grit(props){
  return (
    <>
    <Model position={[0, -0.7, 0]} rotation={[4 * Math.PI / 7 , 0 , 0]} scale={[ 1, 1 , 1]}  />   
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
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1.25, 1.25, 1.25]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'green'} />
    </mesh>
  );
}

function BoxCube(props){
  return (
    <>
    <Box position={props.position} />
    <Box position={props.position} />
    <Box position={props.position} />
    <Box position={props.position} />
    </>
  );
}


function App() {
  return (
    // <div className="App">
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Grit />
      
    </Canvas>
    // </div>
  );
}

export default App;
