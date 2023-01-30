const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

const drligt = new THREE.DirectionalLight(0xffffff, 2);
scene.add(drligt);

const camera = new THREE.Camera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
scene.add(camera);

const canvas = document.querySelector("#canvas");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setClearColor(new THREE.Color("lightgrey"), 0);
renderer.setSize(1800, 1200);
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0px";
renderer.domElement.style.left = "0px";
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();
let deltaTime = 0;
let totalTime = 0;

const arToolkitSource = new THREEx.ArToolkitSource({
  sourceType: "webcam",
});

function onResize() {
  arToolkitSource.onResize();
  arToolkitSource.copySizeTo(renderer.domElement);
  if (arToolkitContext.arController !== null) {
    arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
  }
}

arToolkitSource.init(function onReady() {
  onResize();
});

window.addEventListener("resize", function () {
  onResize();
});

const arToolkitContext = new THREEx.ArToolkitContext({
  cameraParametersUrl: "data/camera_para.dat",
  detectionMode: "mono",
});

arToolkitContext.init(function onCompleted() {
  camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
});

const markerRoot1 = new THREE.Group();
scene.add(markerRoot1);
let markerControls1 = new THREEx.ArMarkerControls(
  arToolkitContext,
  markerRoot1,
  {
    type: "pattern",
    patternUrl: "data/kanji.patt",
  }
);

function onProgress(xhr) {
  console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
}
function onError(xhr) {
  console.log("An error happened");
}

const loader = new THREE.GLTFLoader();

let model;
loader.load("box.glb", function (gltf) {
  model = gltf.scene;
  markerRoot1.add(model);
  model.position.set(0, 0, 0.5);
  model.scale.set(0.8, 0.8, 0.8);

  setTimeout(() => {
    model.position.set(-1.2, 0, 0.5);
  }, 6500);
  setTimeout(() => {
    markerRoot1.remove(model);
  }, 16000);
  setTimeout(() => {
    markerRoot1.add(model);
    model.position.set(0, 0, 0.5);
  }, 49000);
  setTimeout(() => {
    model.position.set(-1.2, 0, 0.5);
  }, 49650);
  setTimeout(() => {
    markerRoot1.remove(model);
  }, 65000);

  model.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
});

const plane1geo = new THREE.PlaneGeometry(2, 2, 2);
const plane1texture = new THREE.TextureLoader().load("Picture1.png");
const plane1Mat = new THREE.MeshBasicMaterial({
  map: plane1texture,
  side: THREE.DoubleSide,
});
const plane1 = new THREE.Mesh(plane1geo, plane1Mat);
// markerRoot1.add(plane1);
plane1.position.set(10, 0, -0.5);
// plane1.scale.set(0, 0, 0);

// POSITION
const positionKF = new THREE.VectorKeyframeTrack(
  ".position",
  [0, 1, 2],
  [10, 0, -0.5, 1.2, 0, -0.5, 1.2, 0, -0.5]
);

const positionKF1 = new THREE.VectorKeyframeTrack(
  ".position",
  [0, 1, 2],
  [1.2, 0, -0.5, 10, 0, -0.5, 10, 0, -0.5]
);
const positionKF8 = new THREE.VectorKeyframeTrack(
  ".position",
  [0, 1, 2],
  [10, 0, -0.5, 1.2, 0, -0.5, 1.2, 0, -0.5]
);

const positionKF9 = new THREE.VectorKeyframeTrack(
  ".position",
  [0, 1, 2],
  [1.2, 0, -0.5, 10, 0, -0.5, 10, 0, -0.5]
);

// // SCALE
// const scaleKF = new THREE.VectorKeyframeTrack( '.scale', [ 0, 1, 2 ], [ 0, 0, 0,1, 1, 1, 1, 1, 1, ] );

// // OPACITY
// const opacityKF = new THREE.NumberKeyframeTrack( '.material.opacity', [ 1, 1, 2 ], [ 1, 1, 2 ] );

// create an animation sequence with the tracks
// If a negative time value is passed, the duration will be calculated from the times of the passed tracks array
const clip = new THREE.AnimationClip("Action", 50, [positionKF]);
const clip1 = new THREE.AnimationClip("Action", 50, [positionKF1]);
const clip8 = new THREE.AnimationClip("Action", 50, [positionKF8]);
const clip9 = new THREE.AnimationClip("Action", 50, [positionKF9]);

// setup the THREE.AnimationMixer
const mixer = new THREE.AnimationMixer(plane1);
const mixer1 = new THREE.AnimationMixer(plane1);
const mixer8 = new THREE.AnimationMixer(plane1);
const mixer9 = new THREE.AnimationMixer(plane1);

// create a ClipAction and set it to play
const clipAction = mixer.clipAction(clip);
const clipAction1 = mixer1.clipAction(clip1);
const clipAction8 = mixer8.clipAction(clip8);
const clipAction9 = mixer9.clipAction(clip9);

// const plane4geo = new THREE.PlaneGeometry(2, 1, 1.5);
// const plane4texture = new THREE.TextureLoader().load("Picture5.png");
// const plane4Mat = new THREE.MeshBasicMaterial({
//   map: plane4texture,
//   side: THREE.DoubleSide,
// });
// const plane4 = new THREE.Mesh(plane4geo, plane4Mat);
// // markerRoot1.add(plane4);
// plane4.position.set(1.2, 0, 10);
// plane4.rotation.set(-Math.PI / 2, 0, 0);

// // POSITION
// const positionKF2 = new THREE.VectorKeyframeTrack(
//   ".position",
//   [0, 1, 2],
//   [1.2, 0, 10, 1.2, 0, 1, 1.2, 0, 1]
// );

// const positionKF3 = new THREE.VectorKeyframeTrack(
//   ".position",
//   [0, 1, 2],
//   [1.2, 0, 1, 1.2, 0, 10, 1.2, 0, 10]
// );

// const positionKF10 = new THREE.VectorKeyframeTrack(
//   ".position",
//   [0, 1, 2],
//   [1.2, 0, 10, 1.2, 0, 1, 1.2, 0, 1]
// );

// const positionKF11 = new THREE.VectorKeyframeTrack(
//   ".position",
//   [0, 1, 2],
//   [1.2, 0, 1, 1.2, 0, 10, 1.2, 0, 10]
// );

// const clip2 = new THREE.AnimationClip("Action", 50, [positionKF2]);
// const clip3 = new THREE.AnimationClip("Action", 50, [positionKF3]);
// const clip10 = new THREE.AnimationClip("Action", 50, [positionKF10]);
// const clip11 = new THREE.AnimationClip("Action", 50, [positionKF11]);

// // setup the THREE.AnimationMixer
// const mixer2 = new THREE.AnimationMixer(plane4);
// const mixer3 = new THREE.AnimationMixer(plane4);
// const mixer10 = new THREE.AnimationMixer(plane4);
// const mixer11 = new THREE.AnimationMixer(plane4);

// // create a ClipAction and set it to play
// const clipAction2 = mixer2.clipAction(clip2);
// const clipAction3 = mixer3.clipAction(clip3);
// const clipAction10 = mixer10.clipAction(clip10);
// const clipAction11 = mixer11.clipAction(clip11);



let model0;
loader.load("graph.glb", function (gltf) {
  model0 = gltf.scene;
  markerRoot1.add(model0);
  model0.position.set(3, 0, 0.5);
  model0.scale.set(0.1, 0.1, 0.1);

  setTimeout(() => {
    model0.position.set(3, 0, 0.5);
  }, 6500);
  setTimeout(() => {
    markerRoot1.remove(model0);
  }, 16000);
  setTimeout(() => {
    markerRoot1.add(model0);
    model0.position.set(0, 0, 0.5);
  }, 49000);
  setTimeout(() => {
    model0.position.set(3, 0, 0.5);
  }, 49650);
  setTimeout(() => {
    markerRoot1.remove(model0);
  }, 65000);

  model0.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
});




const plane2geo = new THREE.PlaneGeometry(9.5, 7.5, 7.5);
const plane2texture = new THREE.TextureLoader().load("Graph.png");
const plane2Mat = new THREE.MeshBasicMaterial({
  map: plane2texture,
  side: THREE.DoubleSide,
});
const plane2 = new THREE.Mesh(plane2geo, plane2Mat);
// markerRoot1.add(plane2);
plane2.position.set(0, 10, -2.5);

// POSITION
const positionKF4 = new THREE.VectorKeyframeTrack(
  ".position",
  [0, 1, 2],
  [0, 10, -2.5, 0, 0, -2.5, 0, 0, -2.5]
);
const positionKF7 = new THREE.VectorKeyframeTrack(
  ".position",
  [0, 1, 2],
  [0, 10, -2.5, 0, 0, -2.5, 0, 0, -2.5]
);
const positionKF12 = new THREE.VectorKeyframeTrack(
  ".position",
  [0, 1, 2],
  [0, 10, -2.5, 0, 0, -2.5, 0, 0, -2.5]
);
const positionKF13 = new THREE.VectorKeyframeTrack(
  ".position",
  [0, 1, 2],
  [0, 10, -2.5, 0, 0, -2.5, 0, 0, -2.5]
);

const clip4 = new THREE.AnimationClip("Action", 50, [positionKF4]);
const clip7 = new THREE.AnimationClip("Action", 50, [positionKF7]);
const clip12 = new THREE.AnimationClip("Action", 50, [positionKF12]);
const clip13 = new THREE.AnimationClip("Action", 50, [positionKF13]);

// setup the THREE.AnimationMixer
const mixer4 = new THREE.AnimationMixer(plane2);
const mixer7 = new THREE.AnimationMixer(plane2);
const mixer12 = new THREE.AnimationMixer(plane2);
const mixer13 = new THREE.AnimationMixer(plane2);

// create a ClipAction and set it to play
const clipAction4 = mixer4.clipAction(clip4);
const clipAction7 = mixer7.clipAction(clip7);
const clipAction12 = mixer12.clipAction(clip12);
const clipAction13 = mixer13.clipAction(clip13);



// const plane5geo = new THREE.PlaneGeometry(3, 1.5, 1.5);
// const plane5texture = new THREE.TextureLoader().load("Picture4.png");
// const plane5Mat = new THREE.MeshBasicMaterial({
//   map: plane5texture,
//   side: THREE.DoubleSide,
// });

// const plane5 = new THREE.Mesh(plane5geo, plane5Mat);
// // markerRoot1.add(plane5);
// plane5.position.set(0, 0, -10);
// plane5.rotation.set(-Math.PI / 2, 0, 0);

// // POSITION
// const positionKF5 = new THREE.VectorKeyframeTrack(
//   ".position",
//   [0, 1, 2],
//   [0, 0, 10, 0, 0, 1, 0, 0, 1]
// );
// const positionKF6 = new THREE.VectorKeyframeTrack(
//   ".position",
//   [0, 1, 2],
//   [0, 0, 1, 0, 0, 10, 0, 0, 10]
// );
// const positionKF14 = new THREE.VectorKeyframeTrack(
//   ".position",
//   [0, 1, 2],
//   [0, 0, 10, 0, 0, 1, 0, 0, 1]
// );
// const positionKF15 = new THREE.VectorKeyframeTrack(
//   ".position",
//   [0, 1, 2],
//   [0, 0, 1, 0, 0, 10, 0, 0, 10]
// );

// const clip5 = new THREE.AnimationClip("Action", 50, [positionKF5]);
// const clip6 = new THREE.AnimationClip("Action", 50, [positionKF6]);
// const clip14 = new THREE.AnimationClip("Action", 50, [positionKF14]);
// const clip15 = new THREE.AnimationClip("Action", 50, [positionKF15]);

// // setup the THREE.AnimationMixer
// const mixer5 = new THREE.AnimationMixer(plane5);
// const mixer6 = new THREE.AnimationMixer(plane5);
// const mixer14 = new THREE.AnimationMixer(plane5);
// const mixer15 = new THREE.AnimationMixer(plane5);

// // create a ClipAction and set it to play
// const clipAction5 = mixer5.clipAction(clip5);
// const clipAction6 = mixer6.clipAction(clip6);
// const clipAction14 = mixer14.clipAction(clip14);
// const clipAction15 = mixer15.clipAction(clip15);

// const plane3geo = new THREE.PlaneGeometry(2.5, 1.5, 1.5);
// const plane3texture = new THREE.TextureLoader().load("Picture3.png")
// const plane3Mat = new THREE.MeshBasicMaterial({
// 	map : plane3texture,
// 	side : THREE.DoubleSide
// });
// const plane3 = new THREE.Mesh(plane3geo, plane3Mat);
// // markerRoot1.add(plane3);
// plane3.position.set(0, 0, -0.5);

function update() {
  if (arToolkitSource.ready !== false)
    arToolkitContext.update(arToolkitSource.domElement);
}

function render() {
  const delta = clock.getDelta();
  mixer.update(delta);
  mixer1.update(delta);
//   mixer2.update(delta);
//   mixer3.update(delta);
//   mixer4.update(delta);
//   mixer5.update(delta);
//   mixer6.update(delta);
  mixer7.update(delta);
  mixer8.update(delta);
  mixer9.update(delta);
//   mixer10.update(delta);
//   mixer11.update(delta);
//   mixer12.update(delta);
//   mixer13.update(delta);
//   mixer14.update(delta);
//   mixer15.update(delta);

  renderer.render(scene, camera);
}

// setTimeout(() => {
// 	markerRoot1.add(plane1);
//   }, 8000);
setTimeout(() => {
  markerRoot1.add(plane1);
  clipAction.play();
}, 6500);
// setTimeout(() => {
//   markerRoot1.add(plane4);
//   clipAction2.play();
// }, 8500);
// setTimeout(() => {
//   clipAction3.play();
// }, 15000);
// setTimeout(() => {
//   markerRoot1.remove(plane4);
// }, 16300);
setTimeout(() => {
  clipAction1.play();
}, 16500);
setTimeout(() => {
  markerRoot1.remove(plane1);
}, 17500);
setTimeout(() => {
  markerRoot1.add(plane2);
}, 18000);
setTimeout(() => {
  clipAction4.play();
}, 18000);
// setTimeout(() => {
//   markerRoot1.add(plane5);
// }, 19000);
// setTimeout(() => {
//   clipAction5.play();
// }, 19000);
// setTimeout(() => {
//   clipAction6.play();
// }, 46000);
// setTimeout(() => {
//   markerRoot1.remove(plane5);
// }, 47000);
setTimeout(() => {
  clipAction7.play();
}, 47500);
setTimeout(() => {
  markerRoot1.remove(plane2);
}, 48000);

setTimeout(() => {
  markerRoot1.add(plane1);
}, 55000);
setTimeout(() => {
  clipAction8.play();
}, 55500);
// setTimeout(() => {
//   markerRoot1.add(plane4);
//   clipAction10.play();
// }, 57500);
// setTimeout(() => {
//   clipAction11.play();
// }, 64000);
// setTimeout(() => {
//   markerRoot1.remove(plane4);
// }, 65300);
setTimeout(() => {
  clipAction9.play();
}, 65500);
setTimeout(() => {
  markerRoot1.remove(plane1);
}, 66500);
setTimeout(() => {
  markerRoot1.add(plane2);
}, 67000);
setTimeout(() => {
  clipAction12.play();
}, 67000);
// setTimeout(() => {
//   markerRoot1.add(plane5);
// }, 68000);
// setTimeout(() => {
//   clipAction13.play();
// }, 68000);
// setTimeout(() => {
//   clipAction14.play();
// }, 95000);
// setTimeout(() => {
//   markerRoot1.remove(plane5);
// }, 96000);
setTimeout(() => {
  clipAction15.play();
}, 96500);
setTimeout(() => {
  markerRoot1.remove(plane2);
}, 97000);

function animate() {
  requestAnimationFrame(animate);
  deltaTime = clock.getDelta();
  totalTime += deltaTime;
  update();
  render();
}

animate();

setTimeout(function () {
  document.getElementById("myaudio1").play();
}, 10500);

setTimeout(function () {
  document.getElementById("myaudio2").play();
}, 21500);

setTimeout(function () {
  document.getElementById("myaudio1").play();
}, 59500);

setTimeout(function () {
  document.getElementById("myaudio2").play();
}, 70500);

var vid = document.getElementById("myVideo");
vid.volume = 0.6;



setTimeout(function () {
  document.getElementById("text").style.display = "block";
}, 8500);
setTimeout(function () {
  document.getElementById("text").style.display = "none";
}, 15000);
setTimeout(function () {
  document.getElementById("text0").style.display = "block";
}, 19000);
setTimeout(function () {
  document.getElementById("text0").style.display = "none";
}, 46000);
setTimeout(function () {
  document.getElementById("text").style.display = "block";
}, 57500);
setTimeout(function () {
  document.getElementById("text").style.display = "none";
}, 65300);
setTimeout(function () {
  document.getElementById("text0").style.display = "block";
}, 68000);
setTimeout(function () {
  document.getElementById("text0").style.display = "none";
}, 95000);
