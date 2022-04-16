const scene = new THREE.Scene(); {
  const color = "lightblue";
  const density = 0.03;
  scene.fog = new THREE.FogExp2(color, density); 
}

// The camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

// The renderer: something that draws 3D objects onto the canvas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa, 1);
// Append the renderer canvas into <body>
document.body.appendChild(renderer.domElement);
const loader = new THREE.TextureLoader();
scene.background = loader.load( 'Sky.jpeg' );


const texture = new THREE.TextureLoader().load( 'Red.jpeg' );
// A cube we are going to animate
const cube = {
  // The geometry: the shape & size of the object
  geometry: new THREE.BoxGeometry(1, 1, 1),
  // The material: the appearance (color, texture) of the object
  material: new THREE.MeshBasicMaterial({ map: texture })
};

// The mesh: the geometry and material combined, and something we can directly add into the scene (I had to put this line outside of the object literal, so that I could use the geometry and material properties)
cube.mesh = new THREE.Mesh(cube.geometry, cube.material);

// Add the cube into the scene
scene.add(cube.mesh);
cube.mesh.position.x += 4;

const texture1 = new THREE.TextureLoader().load( 'Blue.jpeg' );
// A cube we are going to animate
const cube1 = {
  // The geometry: the shape & size of the object
  geometry: new THREE.BoxGeometry(1, 1, 1),
  // The material: the appearance (color, texture) of the object
  material: new THREE.MeshBasicMaterial({ map: texture1 })
};

// The mesh: the geometry and material combined, and something we can directly add into the scene (I had to put this line outside of the object literal, so that I could use the geometry and material properties)
cube1.mesh = new THREE.Mesh(cube1.geometry, cube1.material);

// Add the cube into the scene
scene.add(cube1.mesh);
cube1.mesh.position.x -= 4;

const texture2 = new THREE.TextureLoader().load( 'Dirt.jpeg' );
texture2.wrapS = THREE.RepeatWrapping;
texture2.wrapT = THREE.RepeatWrapping;
texture2.repeat.set( 15, 15 );
// A cube we are going to animate
const cube2 = {
  // The geometry: the shape & size of the object
  geometry: new THREE.BoxGeometry(50, 1, 50),
  // The material: the appearance (color, texture) of the object
  material: new THREE.MeshBasicMaterial({ map: texture2 })
};

// The mesh: the geometry and material combined, and something we can directly add into the scene (I had to put this line outside of the object literal, so that I could use the geometry and material properties)
cube2.mesh = new THREE.Mesh(cube2.geometry, cube2.material);

// Add the cube into the scene
scene.add(cube2.mesh);
cube2.mesh.position.y -= 1;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
var keyCode = event.which;
if (keyCode == 38) {
cube.mesh.position.y += 1;
setTimeout(() => {
cube.mesh.position.y += 0.5;
}, 50);
setTimeout(() => {
cube.mesh.position.y += 0.1;
}, 70);
setTimeout(() => {
cube.mesh.position.y -= 0.6;
}, 100);
setTimeout(() => {
cube.mesh.position.y -= 1;
}, 50);
} else if (keyCode == 37) {
cube.mesh.position.x -= 1;
setTimeout(() => {
cube.mesh.position.x -= 0.7;  
}, 50);
setTimeout(() => {
cube.mesh.position.x -= 0.5;
}, 70);
setTimeout(() => {
cube.mesh.position.x -= 0.2; 
}, 100);
} else if (keyCode == 39) {
cube.mesh.position.x += 1; 
setTimeout(() => {
cube.mesh.position.x += 0.7;  
}, 50);
setTimeout(() => {
cube.mesh.position.x += 0.5;
}, 70);
setTimeout(() => {
cube.mesh.position.x += 0.2;
}, 100);
} 
};

// Make the camera further from the cube so we can see it better
camera.position.z = 16;
camera.position.y = 3;
camera.rotation.x -= 0.2;

var id;

function render() {
  // Render the scene and the camera
  id = requestAnimationFrame(render);
  renderer.render(scene, camera);

camera.position.z += 0.005;
  
var i = 1; 
function random1() { 
setTimeout(() => { 
cube1.mesh.position.x += 0.5;
i++;  
if (i < 10) {    
random1(); 
  }
 }, Math.floor(Math.random() * 9000));
} 
random1();

function random2() { 
setTimeout(() => { 
cube1.mesh.position.x -= 0.5;
i++;  
if (i < 10) {    
random2(); 
  }
 }, Math.floor(Math.random() * 9000));
} 
random2();

function kill1() { 
setTimeout(() => { 
cube1.mesh.visible = false;
i++;  
if (i < 10) {    
kill1(); 
  }
 }, Math.floor(Math.random() * 9000000));
} 
kill1();

function kill2() { 
setTimeout(() => { 
cube.mesh.visible = false;
i++;  
if (i < 10) {    
kill2(); 
  }
 }, Math.floor(Math.random() * 9000000));
} 
kill2();

const onePlayerIsDead = !cube.mesh.visible || !cube1.mesh.visible;
  if (onePlayerIsDead) {
    cancelAnimationFrame( id );
  }
  // Make it call the render() function about every 1/60 second
}

render();
