var scene, camera, renderer, cube;
var plane;
var keyboard = {};
var player = { height:1.0}
function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth /window.innerHeight,
        // 1200/720,
        0.1,
        1000
    );
    
    // camera = new THREE.OrthographicCamera(
    //     window.innerWidth / -200,
    //     window.innerWidth / 200,
    //     window.innerHeight / 200,
    //     window.innerHeight / -200,
    //     0.1,
    //     1000
    // );

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial( { color: 0xff4444, wireframe: true } );

    // var texture= new THREE.TextureLoader().load('images/wood.jpg');
    // var material = new THREE.MeshBasicMaterial( { map: texture } );
            
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    var planeGeometry = new THREE.PlaneGeometry(10,10,10,10); 
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe:true}); 
    plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.rotation.x -= Math.PI / 2;
    scene.add( plane );

    camera.position.set(0,player.height,-5);
    camera.lookAt(new THREE.Vector3(0,player.height,0)); 

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    animate();
}

function animate(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    // cube.rotation.z += 0.008;

    if(keyboard[37]){
        camera.rotation.y += Math.PI * 0.01;
    }

    if(keyboard[39]){
        camera.rotation.y -= Math.PI * 0.01;
    }

    renderer.render(scene, camera);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}

function keyUp(event){
    keyboard[event.keyCode] = false;
}

function keyDown(event){
    keyboard[event.keyCode] = true;
}

window.addEventListener('resize',onWindowResize,false);
window.addEventListener('keydown',keyDown);
window.addEventListener('keyup',keyUp);

window.onload = init();
animate();