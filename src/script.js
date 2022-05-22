import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ky from "kyouka";


// 创建每个量子的一系列量子门
const qubitFlows = document.querySelectorAll('.qubitFlow');
var numofGates = 7
qubitFlows.forEach((qubitFlow,index) =>{
    var num = document.createElement('Div');
    num.classList.add('num');
    var number = document.createTextNode("Qubit "+1);
    num.appendChild(number);
    qubitFlow.appendChild(num);
    qubitFlow.classList.add("qubit1");
    for (var i=0; i<numofGates-1; i++){
        var node=document.createElement("Div");
        var result = document.createElement("Div");
        result.classList.add("barResult");
        node.classList.add('gate');
        node.classList.add('gate'+i);
        node.classList.add('qubit'+(index+1));
        node.appendChild(result);
        qubitFlow.appendChild(node);
    }
    var node=document.createElement("Div");
        node.classList.add('gate');
        node.classList.add('gate'+(numofGates-1));
        node.classList.add('qubit'+(index+1));
        qubitFlow.appendChild(node);
    // Delete 键
    var deleteButton = document.createElement('BUTTON');
    // deleteButton.onclick = deleteClick(this);
    var deleteText = document.createTextNode('Delete');
    deleteButton.appendChild(deleteText);
    var add = 1;
    deleteButton.value = add;
    deleteButton.addEventListener('click', function() {
    var flow = document.querySelector('.flow');
    var deleteQubit = document.querySelector('.qubit1');
    flow.removeChild(deleteQubit);
    }, false);
    deleteButton.classList.add('delete'+1);
    qubitFlow.appendChild(deleteButton);
})


// 增加量子
function addQubit(){
    var qubitFlow = document.createElement("Div");
    qubitFlow.classList.add('qubitFlow');
    var flow = document.querySelector('.flow');
    flow.appendChild(qubitFlow);
    var numofQubits = document.querySelectorAll('.qubitFlow').length;
    qubitFlow.classList.add('qubit'+numofQubits);
    var num = document.createElement('Div');
    num.classList.add('num');
    var number = document.createTextNode("Qubit "+numofQubits);
    num.appendChild(number);
    qubitFlow.appendChild(num);
    for (var i=0; i<numofGates-1; i++){
        var node=document.createElement("Div");
        var result = document.createElement("Div");
        result.classList.add("barResult");
        node.classList.add('gate');
        node.classList.add('gate'+i);
        node.classList.add('qubit'+numofQubits);
        node.appendChild(result);
        qubitFlow.appendChild(node);
    }
    var node=document.createElement("Div");
    node.classList.add('gate');
    node.classList.add('gate'+(numofGates-1));
    node.classList.add('qubit'+numofQubits);
    qubitFlow.appendChild(node);
    // Delete 键
    var deleteButton = document.createElement('BUTTON');
    var deleteText = document.createTextNode('Delete');
    deleteButton.appendChild(deleteText);
    var add = numofQubits;
    deleteButton.value = add;
    deleteButton.addEventListener('click', function() {
    flow.removeChild(qubitFlow);
    }, false);
    qubitFlow.appendChild(deleteButton);
}
window.addQubit =addQubit;

// function deleteClick(){
//     console.log("this");
//     return false;
// }
// window.deleteClick = deleteClick;

// 对量子增加量子门
const draggables = document.querySelectorAll('.draggable') 
var dragged;
// set css features when the DOM is being dragged
document.addEventListener("drag", function( event ) {
}, false);
draggables.forEach(draggable =>{
    draggable.addEventListener('dragstart', () => {
        dragged = draggable;
        console.log("dragstart");
        // draggable.classList.add('dragging');//add a class to add css features
        // the e refers to event
    })
    draggable.addEventListener('dragend', ()=>{
        dragged = [];
    })
})

var hasClass = false;
document.addEventListener("dragenter", event => {
    
    if ( event.target.classList.contains("gate") ) {
        hasClass = false;
        if (event.target.classList.contains(dragged.classList[1])){
            hasClass = true;
        }
        if (!hasClass){
            event.target.classList.add(dragged.classList[1]);
            document.addEventListener("dragleave", event => {
                if ( event.target.classList.contains("gate")&&!hasClass) {
                    event.target.classList.remove(dragged.classList[1]);
                }
            }, false);
        }
    
    }
}, false);




document.addEventListener("dragover", function( event ) {
    // prevent default to allow drop
    event.preventDefault();
}, false);
document.addEventListener("drop", function( event ) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if ( event.target.classList.contains("gate") ) {
        event.target.classList.remove(event.target.classList[3]);
        console.log(event.target.classList);
        event.target.classList.add(dragged.classList[1]);
    }
  
}, false);




// bloch球
//|------------------------|
//|-------- Canvas --------|
//|------------------------|

const canvas = document.querySelector("canvas.bloch");

//|------------------------|
//|-------- Sizes ---------|
//|------------------------|
const sizes = {
  width: 400,
  height: 400,
};


//|------------------------|
//|-------- Scene ---------|
//|------------------------|
const scene = new THREE.Scene();

//|------------------------|
//|-------- Object --------|
//|------------------------|
const mesh = new THREE.Mesh(
  new THREE.SphereGeometry( 15, 32, 16 ),
  new THREE.MeshBasicMaterial({ color: 0xff7b00, wireframe:true })
//   new THREE.MeshDepthMaterial()
);
scene.add(mesh);


//坐标轴辅助
var axes = new THREE.AxesHelper(10);
scene.add(axes);

const material = new THREE.LineBasicMaterial({
	color: 0x0000ff
});

const points = [];
points.push( new THREE.Vector3( 0, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 10 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry, material );
scene.add( line );
//|------------------------|
//|-------- Camera --------|
//|------------------------|
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
); // field of view , width and height radio, near, far

camera.position.z = 40;
camera.lookAt(mesh.position);
scene.add(camera);

//|------------------------|
//|------- Controls -------|
//|------------------------|
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// the camera is looking at the center of the scene by default. change the target property
// controls.target.y = 2
// controls.update()

//|------------------------|
//|------- Renderer -------|
//|------------------------|
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

//|------------------------|
//|-------- Animate -------|
//|------------------------|

const tick = () => {

  // Update Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();






// matrix可视化

/** 
 * canva
 */
const canvas_matrix = document.querySelector("canvas.matrix");

/**
 * sizes and settings
 */
const sizes_matrix = {
    width: 400,
    height: 400,
  };
const plane_size = 40;

const numofMatrix = 3;

const boxSize = 7;
  /**
   * scene
   */
const scene_matrix = new THREE.Scene();


/**
 * meshes
 */

var boxes = {};
for (var i=1; i<=numofMatrix; i++){
    for (var j=1; j<=numofMatrix;j++){
        var space = plane_size/(numofMatrix-1)
        var name = "box" + i+j;
        var height = ky.randomNumberInRange(-0.5, 0.5) * 20;
        console.log(height);
        var box = new THREE.Mesh(
            new THREE.BoxBufferGeometry(boxSize,10+height,boxSize),
            new THREE.MeshBasicMaterial({ color: 0xff7b00 })
        ) 
        boxes[name] = box;
        box.position.x = -plane_size/2+boxSize/2+(plane_size-boxSize)/(numofMatrix-1)*(i-1);
        box.position.z = -plane_size/2+boxSize/2+(plane_size-boxSize)/(numofMatrix-1)*(j-1);
        box.position.y += (10+height)/2;

        console.log(boxes);
        scene_matrix.add(box);
    }
}

const plane = new THREE.Mesh(
    new THREE.BoxBufferGeometry(plane_size,1,plane_size),
    new THREE.MeshBasicMaterial({ color: 0x7f3e05 })
)
// plane.rotation.x = -Math.PI/2;
scene_matrix.add(plane);
/**
 * axes
 */
var axes = new THREE.AxesHelper(10);
scene_matrix.add(axes);

/**
 * camera
 */
const camera_matrix = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
); // field of view , width and height radio, near, far
  
camera_matrix.position.z = 40;
camera_matrix.lookAt(plane.position);
scene_matrix.add(camera_matrix);

/**
 * controls
 */
const controls_matrix = new OrbitControls(camera_matrix, canvas_matrix);
controls_matrix.enableDamping = true;

/**
 * renderer
 */
const renderer_matrix = new THREE.WebGLRenderer({
canvas: canvas_matrix,
});
renderer_matrix.setSize(sizes_matrix.width, sizes_matrix.height);

const tick_matrix = () => {

// Update Controls
controls_matrix.update();

// Render
renderer_matrix.render(scene_matrix, camera_matrix);

// Call tick again on the next frame
window.requestAnimationFrame(tick_matrix);
};

tick_matrix();