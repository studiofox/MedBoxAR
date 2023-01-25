
    const scene = new THREE.Scene();

	const ambientLight = new THREE.AmbientLight(0xffffff, 3);
	scene.add( ambientLight );

	const drligt = new THREE.DirectionalLight(0xffffff, 2);
	scene.add( drligt );

			
	const camera = new THREE.Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	scene.add(camera);

	const canvas = document.querySelector("#canvas");

	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias : true,
		alpha: true
	});
	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	renderer.setSize( 1800, 1200 );
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top = '0px'
	renderer.domElement.style.left = '0px'
	document.body.appendChild( renderer.domElement );

	const clock = new THREE.Clock();
	let deltaTime = 0;
	let totalTime = 0;
	
	

	const arToolkitSource = new THREEx.ArToolkitSource({
		sourceType : 'webcam',
	});

	function onResize()
	{
		arToolkitSource.onResize()	
		arToolkitSource.copySizeTo(renderer.domElement)	
		if ( arToolkitContext.arController !== null )
		{
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
		}	
	}

	arToolkitSource.init(function onReady(){
		onResize()
	});

	window.addEventListener('resize', function(){
		onResize()
	});
	
	const arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: 'data/camera_para.dat',
		detectionMode: 'mono'
	});
	
	arToolkitContext.init( function onCompleted(){
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
	});

	const markerRoot1 = new THREE.Group();
	scene.add(markerRoot1);
	let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
		type: 'pattern', patternUrl: "data/kanji.patt",
	})
	
	function onProgress(xhr) { console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); }
	function onError(xhr) { console.log( 'An error happened' ); }
				







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
//   setTimeout(() => {
// 	markerRoot1.add(model);
//   }, 22000);
//   setTimeout(() => {
// 	markerRoot1.remove(model);
//   }, 31000);





  model.traverse(function(node) {
    if(node.isMesh)
    {node.castShadow = true;}
  });

// return model;

});

	



const plane1geo = new THREE.PlaneGeometry(2, 2, 2);
const plane1texture = new THREE.TextureLoader().load("Picture1.png")
const plane1Mat = new THREE.MeshBasicMaterial({
	map : plane1texture,
	side : THREE.DoubleSide
});
const plane1 = new THREE.Mesh(plane1geo, plane1Mat);
// markerRoot1.add(plane1);
plane1.position.set(10, 0, -0.5);
// plane1.scale.set(0, 0, 0);

// POSITION
const positionKF = new THREE.VectorKeyframeTrack( '.position', [ 0, 1, 2 ], [ 10, 0, -0.5, 1.2, 0, -0.5, 1.2, 0, -0.5 ] );

const positionKF1 = new THREE.VectorKeyframeTrack( '.position', [ 0, 1, 2 ], [  1.2, 0, -0.5, 10, 0, -0.5, 10, 0, -0.5] );

// // SCALE
// const scaleKF = new THREE.VectorKeyframeTrack( '.scale', [ 0, 1, 2 ], [ 0, 0, 0,1, 1, 1, 1, 1, 1, ] );


// // OPACITY
// const opacityKF = new THREE.NumberKeyframeTrack( '.material.opacity', [ 1, 1, 2 ], [ 1, 1, 2 ] );

// create an animation sequence with the tracks
// If a negative time value is passed, the duration will be calculated from the times of the passed tracks array
const clip = new THREE.AnimationClip( 'Action', 50, [ positionKF ] );
const clip1 = new THREE.AnimationClip( 'Action', 50, [ positionKF1 ] );

 
// setup the THREE.AnimationMixer
const mixer = new THREE.AnimationMixer( plane1);
const mixer1 = new THREE.AnimationMixer( plane1);
			

// create a ClipAction and set it to play
const clipAction = mixer.clipAction( clip );
const clipAction1 = mixer1.clipAction( clip1 );






const plane4geo = new THREE.PlaneGeometry(2, 1, 1.5);
const plane4texture = new THREE.TextureLoader().load("Picture5.png")
const plane4Mat = new THREE.MeshBasicMaterial({
	map : plane4texture,
	side : THREE.DoubleSide
});
const plane4 = new THREE.Mesh(plane4geo, plane4Mat);
// markerRoot1.add(plane4);
plane4.position.set(1.2, 0, 10);
plane4.rotation.set(-Math.PI/2,0,0)


// POSITION
const positionKF2 = new THREE.VectorKeyframeTrack( '.position', [ 0, 1, 2 ], [ 1.2, 0, 10, 1.2, 0, 1, 1.2, 0, 1 ] );

const positionKF3 = new THREE.VectorKeyframeTrack( '.position', [ 0, 1, 2 ], [ 1.2, 0, 1, 1.2, 0, 10, 1.2, 0, 10 ] );

const clip2 = new THREE.AnimationClip( 'Action', 50, [ positionKF2 ] );
const clip3 = new THREE.AnimationClip( 'Action', 50, [ positionKF3 ] );

 // setup the THREE.AnimationMixer
const mixer2 = new THREE.AnimationMixer( plane4);
const mixer3 = new THREE.AnimationMixer( plane4);
			
// create a ClipAction and set it to play
const clipAction2 = mixer2.clipAction( clip2 );
const clipAction3 = mixer3.clipAction( clip3 );





const plane2geo = new THREE.PlaneGeometry(2.5, 1.5, 1.5);
const plane2texture = new THREE.TextureLoader().load("Picture2.png")
const plane2Mat = new THREE.MeshBasicMaterial({
	map : plane2texture,
	side : THREE.DoubleSide
});
const plane2 = new THREE.Mesh(plane2geo, plane2Mat);
// markerRoot1.add(plane2);
plane2.position.set(0, 0, -0.5);

const plane5geo = new THREE.PlaneGeometry(3, 1.5, 1.5);
const plane5texture = new THREE.TextureLoader().load("Picture4.png")
const plane5Mat = new THREE.MeshBasicMaterial({
	map : plane5texture,
	side : THREE.DoubleSide
});
const plane5 = new THREE.Mesh(plane5geo, plane5Mat);
// markerRoot1.add(plane5);
plane5.position.set(0, 0, 1.2);
plane5.rotation.set(-Math.PI/2,0,0)



const plane3geo = new THREE.PlaneGeometry(2.5, 1.5, 1.5);
const plane3texture = new THREE.TextureLoader().load("Picture3.png")
const plane3Mat = new THREE.MeshBasicMaterial({
	map : plane3texture,
	side : THREE.DoubleSide
});
const plane3 = new THREE.Mesh(plane3geo, plane3Mat);
// markerRoot1.add(plane3);
plane3.position.set(0, 0, -0.5);



function update()
{
	if ( arToolkitSource.ready !== false )
		arToolkitContext.update( arToolkitSource.domElement );
}


function render()
{
    if ( mixer ) {

	const delta = clock.getDelta();
	mixer.update( delta );
	mixer1.update( delta );
	mixer2.update( delta );
	mixer3.update( delta );

	}

	renderer.render( scene, camera );
}

// setTimeout(() => {
// 	markerRoot1.add(plane1);
//   }, 8000);
  setTimeout(() => {
	markerRoot1.add(plane1);
	clipAction.play();
  }, 6500);
  setTimeout(() => {
	markerRoot1.add(plane4);
	clipAction2.play();
  }, 8500);
  setTimeout(() => {
	clipAction3.play();
  }, 15000);
  setTimeout(() => {
	markerRoot1.remove(plane4);
  }, 16000);
  setTimeout(() => {
	clipAction1.play();
  }, 17000);
  setTimeout(() => {
	markerRoot1.remove(plane1);
  }, 18000);
//   setTimeout(() => {
// 	markerRoot1.add(plane2);
//   }, 17000);
//   setTimeout(() => {
// 	markerRoot1.add(plane5);
//   }, 18000);
//   setTimeout(() => {
// 	markerRoot1.remove(plane5);
//   }, 43500);
//   setTimeout(() => {
// 	markerRoot1.remove(plane2);
//   }, 45000);
//   setTimeout(() => {
// 	markerRoot1.add(plane3);
//   }, 46000);
//   setTimeout(() => {
// 	markerRoot1.remove(plane3);
//   }, 56000);
//   setTimeout(() => {
// 	markerRoot1.add(plane1);
//   }, 27000);
//   setTimeout(() => {
// 	markerRoot1.add(plane4);
//   }, 28500);
//   setTimeout(() => {
// 	markerRoot1.remove(plane4);
//   }, 30500);
//   setTimeout(() => {
// 	markerRoot1.remove(plane1);
//   }, 31000);
//   setTimeout(() => {
// 	markerRoot1.add(plane2);
//   }, 32000);
//   setTimeout(() => {
// 	markerRoot1.remove(plane2);
//   }, 36000);
//   setTimeout(() => {
// 	markerRoot1.add(plane3);
//   }, 37000);
//   setTimeout(() => {
// 	markerRoot1.remove(plane3);
//   }, 41000);





function animate()
{
	requestAnimationFrame(animate);
	deltaTime = clock.getDelta();
	totalTime += deltaTime;
	update();
	render();
}


animate();

	setTimeout(function(){
		document.getElementById("myaudio1").play();
		}, 10500)

		setTimeout(function(){
			document.getElementById("myaudio2").play();
			}, 18500)