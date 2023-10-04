import * as THREE from 'three'
import { DoubleSide } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

const gui = new dat.GUI()

// Scene
const scene = new THREE.Scene()

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Sizes
const sizes = {
  width: innerWidth,
  height: innerHeight,
}
const aspectRatio = sizes.width / sizes.height

// Textures
const textureLoader = new THREE.TextureLoader()
// Cube Textures
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorAmbientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
)
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

const environmentTexttureMap = cubeTextureLoader.load([
  '/textures/environmentMaps/1/px.jpg', // px => +ve x
  '/textures/environmentMaps/1/nx.jpg', // nx => -ve x
  '/textures/environmentMaps/1/py.jpg', // py => +ve x
  '/textures/environmentMaps/1/ny.jpg', // ny => -ve x
  '/textures/environmentMaps/1/pz.jpg', // pz => +ve x
  '/textures/environmentMaps/1/nz.jpg', // nz => -ve x
])

// Mesh
// Having One material better for performance
// const material = new THREE.MeshBasicMaterial({ side: DoubleSide})

// Mesh Normal Material
// const material = new THREE.MeshNormalMaterial({
//   side: DoubleSide,
//   flatShading: true,
// })

// Mesh MatCap Material
// const material = new THREE.MeshMatcapMaterial({ side: DoubleSide })
// material.matcap = matcapTexture

// Mesh Standard Material
const material = new THREE.MeshStandardMaterial({ side: DoubleSide })
material.metalness = 1
material.roughness = 0
material.envMap = environmentTexttureMap
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// Debug Material
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)
// gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.001)
// gui.add(material, 'displacementScale').min(0).max(1).step(0.001)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
sphere.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)
sphere.position.x = -1.5
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
plane.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
)
torus.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

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

const clock = new THREE.Clock()

// Animation
const tick = () => {
  //get Elapsed time
  const elaspedTime = clock.getElapsedTime()

  // rotate meshes
  // sphere.rotation.x = 0.1 * elaspedTime
  // plane.rotation.x = 0.1 * elaspedTime
  // torus.rotation.x = 0.1 * elaspedTime

  // sphere.rotation.y = 0.15 * elaspedTime
  // plane.rotation.y = 0.15 * elaspedTime
  // torus.rotation.y = 0.15 * elaspedTime

  // Renderer
  renderer.render(scene, camera)

  // Update Controls
  controls.update()

  window.requestAnimationFrame(tick)
}

tick()
