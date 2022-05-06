import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";



// 创建每个量子的一系列量子门
const qubitFlows = document.querySelectorAll('.qubitFlow');
var numofGates = 7
qubitFlows.forEach((qubitFlow,index) =>{
    var num = document.createElement('Div');
    num.classList.add('num');
    var number = document.createTextNode("Qubit "+1);
    num.appendChild(number);
    qubitFlow.appendChild(num);
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
    // var deleteButton = document.createElement('BUTTON');
    // var deleteText = document.createTextNode('Delete');
    // deleteButton.appendChild(t)
})


// 增加量子
function addQubit(){
    var qubitFlow = document.createElement("Div");
    qubitFlow.classList.add('qubitFlow');
    var flow = document.querySelector('.flow');
    flow.appendChild(qubitFlow);
    var numofQubits = document.querySelectorAll('.qubitFlow').length;
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
}
window.addQubit =addQubit;

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

// //|------------------------|
// //|-------- Cursor --------|
// //|------------------------|
// const cursor = {
//   x: 0,
//   y: 0
// };

// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -(event.clientY / sizes.height - 0.5);
// });

//|------------------------|
//|-------- Scene ---------|
//|------------------------|
const scene = new THREE.Scene();

//|------------------------|
//|-------- Object --------|
//|------------------------|
const mesh = new THREE.Mesh(
  new THREE.SphereGeometry( 15, 32, 16 ),
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe:true })
);
scene.add(mesh);

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
