import { forwardRef, useState,useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import {
  View,
  Preload,
  OrbitControls,
  PerspectiveCamera,
  CameraShake,
  PivotControls,
  Environment,
  Center,
  useTexture
} from '@react-three/drei'

import { Soda, Apple, Duck, Candy, Flash, Target } from './Models'

export default function App() {
  //const [ref, view1, view2, view3, view4, view5, view6] = useRef()
  const ref = useRef()
  const view1 = useRef()
  const view2 = useRef()
  const view3 = useRef()
  const view4 = useRef()
  const view5 = useRef()
  const view6 = useRef()
  return (
    <div ref={ref} className="container">
      <div className="text">
        Work on <Link ref={view6}>version 8</Link> has begun 3 Sep 2021.
        <div ref={view1} className="view translateX" />
        This is perhaps the biggest update to Fiber yet.
        <div ref={view2} className="view scale" style={{ height: 300 }} />
        We've tried our best to keep breaking-changes to a minimum,
        <div ref={view3} className="view translateY" />
        they mostly affect rarely used api's like attach.
        <div ref={view4} className="view scale" />
        This release brings a ton of performance related fixes,
        <div ref={view5} className="view translateX" />
        but also includes some new and ground-breaking features.
      </div>
      <Canvas eventSource={ref} className="canvas">
        <View track={view1}>
          <Bg />
          <Common color="lightpink" />
          <PivotControls lineWidth={3} depthTest={false} displayValues={false} scale={2}>
            <Soda scale={6} position={[0, -1.6, 0]} />
          </PivotControls>
          <OrbitControls makeDefault />
        </View>
        <View track={view2}>
          <Common color="lightblue" />
          <Apple position={[0, -1, 0]} scale={14} />
          <OrbitControls makeDefault />
        </View>
        <View track={view3}>
          <Common color="lightgreen" />
          <Duck scale={2} position={[0, -1.6, 0]} />
          <CameraShake intensity={2} />
          <OrbitControls />
        </View>
        <View track={view4}>
          <Common color="peachpuff" />
          <Candy scale={3} />
        </View>
        <View track={view5}>
          <Common color="orange" />
          <Flash scale={3} />
        </View>
        <View track={view6}>
          <Common color="hotpink" />
          <Center>
            <Target scale={1.5} />
          </Center>
        </View>
        <Preload all />
      </Canvas>
    </div>
  )
}

function Bg() {
  const { width, height } = useThree((state) => state.viewport)
  const image = useTexture(
    'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  )
  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry />
      <meshBasicMaterial map={image} depthWrite={false} />
    </mesh>
  )
}

const Common = ({ color }) => (
  <>
    {color && <color attach="background" args={[color]} />}
    <ambientLight intensity={0.5} />
    <pointLight position={[20, 30, 10]} intensity={1} />
    <pointLight position={[-10, -10, -10]} color="blue" />
    <Environment preset="dawn" />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </>
)

const Link = forwardRef(({ children }, fRef) => {
  const [hovered, hover] = useState(false)
  return (
    <a
      href="https://github.com/pmndrs/react-three-fiber/releases/tag/v8.0.0"
      onPointerMove={(e) => {
        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY - e.target.offsetTop - 100
        fRef.current.style.transform = `translate3d(${x}px,${y}px,0)`
      }}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      {children}
      <div ref={fRef} className="view" style={{ position: 'absolute', width: 200, display: hovered ? 'block' : 'none' }} />
    </a>
  )
})
