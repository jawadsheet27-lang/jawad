// Shared mutable animation targets.
// GSAP ScrollTrigger writes target values here (ScrollRig.jsx) and the
// React Three Fiber scene eases toward them every frame (ProductScene.jsx).
// This keeps scroll -> 3D fully decoupled and buttery smooth.

export const sceneTargets = {
  bottleX: 0,
  bottleY: 0,
  bottleZ: 0,
  bottleRotY: 0,
  bottleRotX: 0,
  capLift: 0, // 0 = closed, 1 = fully lifted
  camZ: 7,
  camOrbit: 0, // radians, gentle orbit around the product
  lightIntensity: 1,
  boxProgress: 0, // packaging box slide-in, 0..1
  cardProgress: 0, // thank-you card float-in, 0..1
  oIconProgress: 0, // gold O icon reveal, 0..1
}

export const pointerTarget = { x: 0, y: 0 }
