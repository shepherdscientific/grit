import './App.css';
import Model from './Gri'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense, useRef, useState, useContext, createContext } from 'react'
import { OrbitControls, Cloud, Sky, Sparkles, Stars, MeshReflectorMaterial, Environment, Html, useProgress } from '@react-three/drei'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { useSpring, animated, config } from '@react-spring/three'

function Grit(props){
  return (
    <mesh {...props}>
    <Model position={[0, 0, 0]} rotation={[ Math.PI / 2 , 0 , 0]} scale={[ 1, 1 , 1]}  />   
    <BoxCube position={[1.125, 1.4, -.85]} rotation={[ 0 , 0 , 0]}/>
    <Box position={[3.75, .65 , -1.4]} rotation={[ 0,0,0]}/>    
    <Box position={[3.15, 0.5 , -1.4]} rotation={[ Math.PI / 3 , Math.PI / 3 , Math.PI / 3]}/>    
    <Box position={[5.95, 0.5 , -9.4]} rotation={[ Math.PI / 3 , Math.PI / 3 , Math.PI / 3]}/>    
    <Box position={[4.85, 0.5 , -10.4]} rotation={[ Math.PI / 3 , Math.PI / 3 , Math.PI / 3]}/>    
    <Box position={[-5.85, 0.5 , -2.4]} rotation={[ Math.PI / 3 , Math.PI / 3 , Math.PI / 3]} />    
    <Box position={[-12.85, 0.5 , -4.4]} rotation={[ Math.PI / 3 , Math.PI / 3 , Math.PI / 3]} />    
    <Box position={[-14.85, 0.5 , -2.4]} rotation={[ Math.PI / 3 , Math.PI / 3 , Math.PI / 3]} />    
    <Box position={[-5.45, 0.5 , 1.4]} rotation={[ Math.PI / 3 , Math.PI / 3 , Math.PI / 3]}/>    
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
    <animated.mesh 
      {...props}
      ref={mesh}
      // scale={active ? 1.1 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={hovered ? 'yellow' : props.color } />
    </animated.mesh>
  );
}

function BoxCube(props){
  // symmetric positioning of eight cubes
    const mesh = useRef()
    const [on, setOn] = useState(false)
    const [count, setCounter] = useState(0)
    // const [tilt, setTilt] = useState(0)
    const [space, setSpacing] = useState(0)
    useFrame(({clock}) => {
      mesh.current.rotation.y += ( on ? 0 : 0.05 )
      if (mesh.current.rotation.y % Math.PI / 4 <= 0.01 ){
        setOn(true)
        count % 3 === 0 ? setSpacing(Math.sin(clock.getElapsedTime())/10) : setSpacing(0)
        setTimeout( () => {
            // console.log(mesh.current.children.find( box => box.name === "top-right-front"))
            setCounter(count + 1)
            setOn(false)
          },
        1000)
      }
    })
    const [flip, set] = useState(false)
    const springs = useSpring({ 
      scale: on ? 1.15 : 1,
      // to: { opacity: 1 },
      // from: { opacity: 0 },
      // reset: true,
      // reverse: flip,
      // delay: 200,
      config: config.wobbly,
      // onRest: () => set(!flip),
    })
    // breathing and tilting cubes
    const [ x_pos, y_pos, z_pos ] = [0.325,0.275,0.325]
    // const [ x_pos, y_pos, z_pos ] = [0.18,0.18,0.18]
    return (
    <FlashingContext.Provider value={on}>
      <mesh 
        {...props} 
        ref={mesh} 
        
       >
        <Sphere name={"pointLight"} position={[0,0,0]} />
        <Box scale={springs.scale} style={springs} position={[ x_pos,  y_pos,  z_pos]} name={"top-right-front"} color="green"/>
        <Box position={[ x_pos,  y_pos, -z_pos]} name={"top-right-rear"} color={'green'}/>        
        <Box position={[ x_pos, -y_pos,  z_pos]} name={"bottom-right-front"} color={'green'}/>
        <Box position={[ x_pos, -y_pos, -z_pos]} name={"bottom-right-rear"} color={'green'}/>
        <Box position={[-x_pos,  y_pos,  z_pos]} name={"top-left-front"} color={'green'}/>
        <Box position={[-x_pos,  y_pos, -z_pos]} name={"top-left-rear"} color={'green'}/>
        <Box position={[-x_pos, -y_pos,  z_pos]} name={"bottom-left-front"} color={'gold'}/>
        <Box position={[-x_pos, -y_pos, -z_pos]} name={"bottom-left-rear"} color={'green'}/>
                
      </mesh>
    </FlashingContext.Provider>
  );
}

function App() {
  return (
    <Canvas gl={{ alpha: false }} dpr={[1, 1.5]} /* shadows colorManagement */ camera={{fov:70, near: 0.1, far: 1000,position:[1.3,0.72,2.95]}}> 
      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>    
      <OrbitControls/>
      <Cloud opacity={0.4} speed={0.4} width={25} depth={0.5} segments={5}/>
      <Sky distance={450000} sunPosition={[1, -1, 1]} inclination={9} azimuth={10.25}  />
      <Stars radius={1} depth={200} count={10000} factor={4} saturation={0} fade speed={1} />
      {/* <Sparkles/> */}
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
