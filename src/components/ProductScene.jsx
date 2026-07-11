import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, RoundedBox } from '@react-three/drei'
import { pointerTarget, sceneTargets as T } from '../lib/scrollState'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const damp = THREE.MathUtils.damp

/* ------------------------------------------------------------------ */
/* REPLACING THE PLACEHOLDER BOTTLE WITH A REAL GLB MODEL              */
/* 1. Put your model at  public/models/bottle.glb                      */
/* 2. import { useGLTF } from '@react-three/drei'                      */
/* 3. Inside <Bottle>, replace the primitive shapes with:              */
/*      const gltf = useGLTF('/models/bottle.glb')                     */
/*      <primitive object={gltf.scene} />                              */
/*    Keep the outer <group ref={group}> - it drives all animation.    */
/* 4. Add  useGLTF.preload('/models/bottle.glb')  below the component. */
/* ------------------------------------------------------------------ */

const cameraSettings = { fov: 35, position: [0, 0.4, 7] }
const glSettings = { antialias: true, alpha: true, powerPreference: 'high-performance' }
const dprRange = [1, 1.75]

function Bottle({ reduced }) {
  const group = useRef()
  const cap = useRef()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const idleY = reduced ? 0 : Math.sin(t * 0.9) * 0.05
    const idleRot = reduced ? 0 : Math.sin(t * 0.35) * 0.05
    const g = group.current
    g.position.x = damp(g.position.x, T.bottleX, 3, delta)
    g.position.y = damp(g.position.y, T.bottleY + idleY, 3, delta)
    g.position.z = damp(g.position.z, T.bottleZ, 3, delta)
    g.rotation.y = damp(g.rotation.y, T.bottleRotY + idleRot + pointerTarget.x * 0.12, 2.6, delta)
    g.rotation.x = damp(g.rotation.x, T.bottleRotX + pointerTarget.y * 0.06, 2.6, delta)
    cap.current.position.y = damp(cap.current.position.y, 1.16 + T.capLift * 0.6, 3, delta)
    cap.current.rotation.y = damp(cap.current.rotation.y, T.capLift * 1.1, 3, delta)
  })

  return (
    <group ref={group}>
      {/* Glass body */}
      <RoundedBox args={[1.14, 1.68, 0.56]} radius={0.1} smoothness={6}>
        <meshPhysicalMaterial
          transmission={0.94}
          thickness={1.1}
          roughness={0.07}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.08}
          color="#fffdf8"
          attenuationColor="#f0dfc2"
          attenuationDistance={2.2}
        />
      </RoundedBox>

      {/* Warm beige liquid */}
      <RoundedBox args={[0.94, 1.4, 0.38]} radius={0.08} smoothness={5} position={[0, -0.07, 0]}>
        <meshPhysicalMaterial color="#dfa96a" roughness={0.3} transmission={0.55} thickness={1.4} ior={1.33} />
      </RoundedBox>

      {/* Ivory label with gold line + gold O */}
      <mesh position={[0, 0.02, 0.291]}>
        <planeGeometry args={[0.56, 0.46]} />
        <meshStandardMaterial color="#f6efe3" roughness={0.65} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.16, 0.296]}>
        <planeGeometry args={[0.26, 0.014]} />
        <meshStandardMaterial color="#c8a97e" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.02, 0.296]} scale={[1, 1.25, 1]}>
        <ringGeometry args={[0.05, 0.068, 48]} />
        <meshStandardMaterial color="#c8a97e" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Gold collar */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.16, 0.19, 0.14, 40]} />
        <meshStandardMaterial color="#c8a97e" metalness={1} roughness={0.24} />
      </mesh>

      {/* Matte black cap (lifts on scroll) */}
      <group ref={cap} position={[0, 1.16, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.42, 48]} />
          <meshStandardMaterial color="#141414" roughness={0.5} metalness={0.35} />
        </mesh>
        <mesh position={[0, -0.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.012, 16, 48]} />
          <meshStandardMaterial color="#c8a97e" metalness={1} roughness={0.25} />
        </mesh>
      </group>
    </group>
  )
}

/* Ivory gift box with lid, ribbon pull and a gold O on top */
function GiftBox() {
  const group = useRef()
  const lid = useRef()

  useFrame((state, delta) => {
    const p = T.boxProgress
    const g = group.current
    g.position.y = damp(g.position.y, -4.6 + p * 3.55, 3, delta)
    g.rotation.y = damp(g.rotation.y, 0.5 - p * 0.35, 3, delta)
    const lidLift = Math.max(0, (p - 0.65) / 0.35)
    lid.current.position.y = damp(lid.current.position.y, 0.62 + lidLift * 0.55, 3, delta)
    lid.current.position.z = damp(lid.current.position.z, lidLift * 0.5, 3, delta)
    lid.current.rotation.x = damp(lid.current.rotation.x, -lidLift * 0.4, 3, delta)
  })

  return (
    <group ref={group} position={[0, -4.6, -0.6]} rotation={[0, 0.5, 0]}>
      <RoundedBox args={[1.9, 1.15, 1.9]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#efe6d8" roughness={0.62} />
      </RoundedBox>
      {/* Black ribbon pull tab */}
      <mesh position={[0, 0.12, 0.97]}>
        <boxGeometry args={[0.24, 0.055, 0.06]} />
        <meshStandardMaterial color="#141414" roughness={0.5} />
      </mesh>
      <group ref={lid} position={[0, 0.62, 0]}>
        <RoundedBox args={[1.98, 0.22, 1.98]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#ece2d2" roughness={0.6} />
        </RoundedBox>
        <mesh position={[0, 0.115, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.16, 0.21, 48]} />
          <meshStandardMaterial color="#c8a97e" metalness={0.9} roughness={0.25} />
        </mesh>
      </group>
    </group>
  )
}

/* Black thank-you card with a gold O and gold line */
function BrandCard() {
  const group = useRef()

  useFrame((state, delta) => {
    const p = T.cardProgress
    const t = state.clock.elapsedTime
    const g = group.current
    g.position.x = damp(g.position.x, 5 - p * 3.1, 3, delta)
    g.position.y = damp(g.position.y, -0.15 + p * 0.35 + Math.sin(t * 0.8) * 0.045 * p, 3, delta)
    g.rotation.y = damp(g.rotation.y, -0.55 + p * 0.2, 3, delta)
    g.rotation.z = damp(g.rotation.z, -0.06 * p, 3, delta)
  })

  return (
    <group ref={group} position={[5, -0.15, 0.35]} rotation={[0, -0.55, 0]}>
      <mesh>
        <boxGeometry args={[1.15, 0.78, 0.018]} />
        <meshStandardMaterial color="#161310" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.08, 0.012]} scale={[1, 1.25, 1]}>
        <ringGeometry args={[0.075, 0.095, 48]} />
        <meshStandardMaterial color="#c8a97e" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.18, 0.012]}>
        <planeGeometry args={[0.4, 0.012]} />
        <meshStandardMaterial color="#c8a97e" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  )
}

/* Metallic gold O icon - rotates slowly, fades in behind the product */
function OIcon() {
  const mesh = useRef()
  const material = useRef()

  useFrame((state, delta) => {
    const m = mesh.current
    m.rotation.y += delta * 0.5
    m.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.18
    material.current.opacity = damp(material.current.opacity, T.oIconProgress * 0.92, 3, delta)
    m.visible = material.current.opacity > 0.02
    const s = 0.65 + T.oIconProgress * 0.5
    m.scale.set(s, s * 1.22, s)
  })

  return (
    <mesh ref={mesh} position={[0, 0.35, -1.9]} visible={false}>
      <torusGeometry args={[0.85, 0.075, 32, 96]} />
      <meshStandardMaterial ref={material} color="#c8a97e" metalness={1} roughness={0.18} transparent opacity={0} />
    </mesh>
  )
}

/* Camera dolly/orbit + breathing, plus warm key light intensity */
function Rig({ reduced }) {
  const keyLight = useRef()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const breathe = reduced ? 0 : Math.sin(t * 0.4) * 0.1
    const z = T.camZ + breathe
    const camera = state.camera
    camera.position.x = damp(camera.position.x, Math.sin(T.camOrbit) * z, 2.6, delta)
    camera.position.z = damp(camera.position.z, Math.cos(T.camOrbit) * z, 2.6, delta)
    camera.position.y = damp(camera.position.y, 0.4, 2.6, delta)
    camera.lookAt(0, 0.15, 0)
    keyLight.current.intensity = damp(keyLight.current.intensity, T.lightIntensity * 1.6, 2.6, delta)
  })

  return <directionalLight ref={keyLight} position={[3.5, 5, 4]} intensity={1.6} color="#ffe8cd" />
}

export default function ProductScene() {
  const reduced = usePrefersReducedMotion()

  // Gentle mouse parallax (desktop pointers only)
  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return undefined
    const onMove = (event) => {
      pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointerTarget.y = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced])

  return (
    <div className="pointer-events-none fixed inset-0 z-10" aria-hidden="true">
      <Canvas dpr={dprRange} camera={cameraSettings} gl={glSettings}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} color="#fff4e4" />
          <spotLight position={[-4, 3, 3]} intensity={0.5} angle={0.5} penumbra={1} color="#f2d9b0" />
          <Bottle reduced={reduced} />
          <GiftBox />
          <BrandCard />
          <OIcon />
          <ContactShadows position={[0, -1.62, 0]} opacity={0.4} scale={9} blur={2.8} far={3.2} color="#392c1a" />
          {/* Offline-friendly studio environment (no HDR download needed) */}
          <Environment resolution={128} frames={1}>
            <Lightformer intensity={1.15} color="#fff2df" position={[0, 3, 4]} scale={[6, 3, 1]} />
            <Lightformer intensity={0.7} color="#ffe0b8" position={[-4, 1, 2]} rotation-y={Math.PI / 3} scale={[3, 4, 1]} />
            <Lightformer intensity={0.5} color="#f7f3ee" position={[4, 0.5, -2]} rotation-y={-Math.PI / 3} scale={[3, 4, 1]} />
          </Environment>
          <Rig reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  )
}
