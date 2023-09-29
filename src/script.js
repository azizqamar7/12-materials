import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Scene
const scene = new THREE.Scene()

// Mesh
const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: innerWidth,
  height: innerHeight,
}
const aspectRatio = sizes.width / sizes.height

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Renderer & its Size
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Window Resize
window.addEventListener('resize', () => {
  // Update Canvas Size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update Camera Aspect Ratio
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update Renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Animation
const tick = () => {
  // Renderer
  renderer.render(scene, camera)

  // Update Controls
  controls.update()

  window.requestAnimationFrame(tick)
}

tick()
