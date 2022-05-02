import './App.css';
import Model from './Gri'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense, useRef, useState, useContext, createContext, useEffect } from 'react'
import { OrbitControls, Cloud, Sparkles, Stars, MeshReflectorMaterial, Environment, Html, useProgress } from '@react-three/drei'

function Grit(props){
  return (
    <mesh {...props}>
    <Model position={[0, 0, 0]} rotation={[ Math.PI / 2 , 0 , 0]} scale={[ 1, 1 , 1]}  />   
    <BoxCube position={[1.125, 1.4, -.85]} rotation={[ 0 , 0 , 0]}/>
    <Box position={[3.45, 0.6 , -1.4]} rotation={[ Math.PI / 3 , Math.PI / 3 , Math.PI / 3]}/>    
    </mesh>
  );
} 


const FlashingContext = createContext();

function Sphere(props) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const flashing = useContext(FlashingContext);
   
  return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.1 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <BallLight brightness={54} color="#fff"/>
        <sphereGeometry args={[.025,16,16]} />
        <meshStandardMaterial color={( flashing || hovered ) ? 'white' : 'red'} />
      </mesh>
  );
}
function Box(props) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const size = .35
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
  // symmetric positioning of eight cubes
    const mesh = useRef()
    const [on, setOn] = useState(false)
    const [count, setCounter] = useState(0)
    useFrame(({clock}) => {
      mesh.current.rotation.y = clock.getElapsedTime()
      if (clock.getElapsedTime() > Math.PI / 2 ){
        clock.stop()
        setOn(true)
        setTimeout( () => {
            // console.log(count)
            setCounter(count + 1)
            setOn(false)
            clock.start()
          },
        1000)
      }
    })
    useEffect(()=> {
      if (count % 3 === 0){
        console.log(count)
        // setCounter(0)
      }
    },[count])
    // breathing and tilting cubes
    const [ x_pos, y_pos, z_pos ] = [0.325,0.275,0.325]
    // const [ x_pos, y_pos, z_pos ] = [0.18,0.18,0.18]
    return (
    <FlashingContext.Provider value={on}>
      <mesh {...props} ref={mesh}>
        <Sphere name={"pointLight"} position={[0,0,0]} />
        <Box position={[x_pos, y_pos, -z_pos]} />
        <Box position={[-x_pos, y_pos, -z_pos]} />
        <Box position={[x_pos, -y_pos, -z_pos]}/>
        <Box position={[-x_pos, -y_pos, -z_pos]} />  
        <Box position={[x_pos, y_pos, z_pos]} />
        <Box position={[-x_pos, y_pos, z_pos]} />
        <Box position={[x_pos, -y_pos, z_pos]} />
        <Box position={[-x_pos, -y_pos, z_pos]} />          
      </mesh>
    </FlashingContext.Provider>
  );
}


function App() {
  return (
    <Canvas gl={{ alpha: false }} dpr={[1, 1.5]} /* shadows colorManagement */ camera={{fov:70, near: 0.1, far: 1000,position:[1.3,0.72,2.95]}}> 
      <OrbitControls/>
      <Cloud/>
      <Sparkles/>
      <Stars/>
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <Environment preset="city" />  
      <group position={[0, -0.2, 0]}>      
        <KeyLight brightness={5.6} color="#ffbdf4" />
        <FillLight brightness={2.6} color="#bdefff" />
        <RimLight brightness={54} color="#fff" />  
        <Suspense fallback={<Loader/>}>
          <Grit position={[0, -.47, 0]} />
        </Suspense>
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
  );
}

export default App;

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

// Lights
function BallLight({ brightness, color }){
  const flashing = useContext(FlashingContext);  
  return(
    <pointLight 
      castShadow 
      intensity={flashing  ? 10 : 0 }
      shadow-mapSize-height={512}
      shadow-mapSize-width={512}
    />
  );
}

function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}
function FillLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      intensity={brightness}
      color={color}
      position={[2, 1, 4]}
      lookAt={[0, 0, 0]}
      penumbra={2}
      castShadow
    />
  );
}
function RimLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={2}
      height={2}
      intensity={brightness}
      color={color}
      position={[1, 4, -2]}
      rotation={[0, 180, 0]}
      castShadow
    />
  );
}
