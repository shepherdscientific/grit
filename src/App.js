// import './App.css';
import Model from './Grit'
import { Canvas, useFrame } from '@react-three/fiber'

function App() {
  return (
    <div className="App">
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Model position={[0, -12, 0]} rotation={[1.6,0,0]} scale={[10,10,10]}  />   
      {/* <BoxCube position={[2.465, 0.85, -1.47]} /> */}
      
    </Canvas>
    </div>
  );
}

export default App;
