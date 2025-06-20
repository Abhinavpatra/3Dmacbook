import {Canvas} from "@react-three/fiber"
import {Environment, OrbitControls, ScrollControls} from "@react-three/drei"
import MacContainer from './components/MacContainer'
import MacContainer2 from "./components/MacContainer2"



function App() {

  return (
    <>
    <div className='w-full h-screen'>
      <div
        className="absolute flex flex-col items-center text-white top-32 left-1/2 -translate-x-1/2"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        <h3 className='text-7xl tracking-tighter font-[400]'>macbook pro</h3>
      </div>
      <Canvas camera={{
        fov:18, 
        position:[0,-10,220]
        }}>
        <Environment files={
          ['https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/studio_small_09_4k.exr']
        } />
        <OrbitControls enableZoom ={false} />
        <ScrollControls pages={3}>
          <MacContainer/>
        </ScrollControls>
      </Canvas>
    </div>
    </>
  )
}

export default App
