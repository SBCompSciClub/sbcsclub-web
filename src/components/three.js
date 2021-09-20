import * as THREE from 'three/build/three.module.js';
import React, { Component } from "react";
/*import {
  CSS3DRenderer,
  CSS3DSprite,
} from "../three.js-master/examples/jsm/renderers/CSS3DRenderer.js";*/
import TWEEN from "@tweenjs/tween.js";
import "./three.css"


import Cookies from "universal-cookie";
const cookies = new Cookies();


export default class three extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {


    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    // sets renderer background color
    document.getElementById("container").appendChild(renderer.domElement);
    


    const radius = 750;
    const radiusX = 1200;


    const size = 9;

    const geometry = new THREE.SphereGeometry(size);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
      metalness: 0,
      roughness: 1,
    });
    const material2 = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      flatShading: true,
      metalness: 0,
      roughness: 1,
    });

    let step = 2 * Math.PI / (50)
    let maxR = 2 * Math.PI


    
    let objects = [];
    let positions = [];
    let object;

    let object_x, object_y, object_z;
    let camera_x, camera_y, camera_z;


    /*

    for(let alpha = 0; alpha <= 2 * Math.PI; alpha+=step){
      for(let phi = 0 ; phi <= maxR; phi+=step){

        
        object = new THREE.Mesh(geometry, material)


        object_x = radius * Math.cos(alpha) * Math.cos(phi)
        object_y = radius * Math.sin(alpha) * Math.cos(phi)
        object_z = radius * Math.sin(phi)


        object.position.set(object_x, object_y, object_z)


        objects.push(object)
        positions.push(object_x, object_y, object_z)
        

        scene.add(object)
      }
    }*/

    

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2000;

    let rings = 20;


    
    for(let j = 0; j < 20; j++){
    for(let i = 0; i < rings; i++){

        object = new THREE.Mesh(geometry, material)

        object.position.set((i-rings/2)*100, 0, 0)

        scene.add(object)

        objects.push(object)
        positions.push((i-rings/2)*100, 0, 0)

      }

    }
    const particlesTotal = objects.length;

   
  

    for (let i = 0; i < objects.length; i++) {
      positions.push(
          Math.random() * 6000 - 3000,
          Math.random() * 6000 - 3000,
          Math.random() * 6000 - 3000
      );
    }

    

    // resize canvas on resize window
    window.addEventListener("resize", () => {
      let width = window.innerWidth;
      let height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });


    // ambient light
    var ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // point light
    var pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, -10);
    scene.add(pointLight);



    const changePhase = new Event('changePhase');


    window.addEventListener("changePhase", (e) => {
      transition()
      
    })
    let phase = 1;
    let current = 0;
    let l = 0;


    let p = radiusX - (radiusX - radius) / 2 + 500;
    


    
    function transition(duration = 500) {



      const offset = current * particlesTotal * 3;


          for ( let i = 0, j = offset; i < particlesTotal; i ++, j += 3 ) {

              const object = objects[ i ];

              new TWEEN.Tween( object.position )
                  .to( {
                      x: positions[ j ],
                      y: positions[ j + 1 ],
                      z: positions[ j + 2 ]
                  }, duration )
                  .easing( TWEEN.Easing.Exponential.InOut )
                  .start();

          }

    }

    camera.lookAt(0,0,0)



    let phase1 = 0;
    let sigscale=800;
    let theta2 = 0;
    let theta = 0;
    let theta_rate = 0;
    let finishedanim = false;
    let firstanimation = true;
    let angle = 0;
    let position_theta = 0;

    setTimeout(() => {
      

      for ( let i = 0; i < particlesTotal; i ++) {

        const object = objects[ i ];


        let x = positions[i*3]

        let y = sigscale * 1/(1+ Math.exp(-x/100)) - sigscale/2

        new TWEEN.Tween( object.position )
            .to( {
                x: positions[ i*3],
                y: y,
                z: positions[ i*3 +2],
            }, 200+i )
            .easing( TWEEN.Easing.Exponential.Out )
            .start();
        

      }
  }, 1000);
    
    const animate = function () {
      requestAnimationFrame(animate);


      if(objects[objects.length-1].position.y >= 390 && phase1==0){
        phase1 = 1;
      }

      
      if(theta_rate > 1 && phase1 != 2){
        phase1 = 2;
        positions.splice(0, 1200)


        /*for(let i = 0; i < 10; i++){
          for(let j = 0; j < 5; j++){
            for(let k = 0; k < 8; k++){
              positions.push(i * 100 - 500, j * 100 - 250, k * 100 - 400)
            }
          }
        }*/

        current = 0;
        transition(600)


        setTimeout(() => {
          for(let i = 0; i < objects.length; i++){
            let th = 2 * Math.PI * Math.random()  
            let ph = Math.acos(2 * Math.random() - 1)
    
      
            let x = 1000 *  Math.cos(th) * Math.sin(ph)
            let y =  1000 *  Math.sin(th) * Math.sin(ph)
            let z =  1000 *  Math.cos(ph);
      
            positions.push(x,y,z)
          }
          
          current = 1;

          positions.reverse()
          finishedanim = true;

          const event = new CustomEvent("finishedAnimation")
          window.dispatchEvent(event)

        }, 400)
        
      }


      

      if(phase1 == 1){

        for(let i = 0; i < objects.length; i++){
          let position = objects[i].position;
          let x = position.x, y = position.y;
          let oangle = Math.atan(y/x)
          let distance = Math.hypot(x,y)

          let extra = 0;

          extra=i%20;
          extra /= (2 * Math.PI / 20)
          objects[i].position.x = distance * Math.cos(oangle + theta + extra)
          objects[i].position.y = distance * Math.sin(oangle + theta + extra)
        }

        theta+=theta_rate;
        theta_rate+=0.015;
      }


      if(Math.abs(objects[objects.length - 1].position.x - positions[1197]) < 0.001 && positions[1197] != 900){
        firstanimation = false
        
        document.getElementsByTagName("html")[0].classList.remove("disabled");
        document.getElementsByTagName("html")[0].classList.add("enabled");
      }


      
      
      if(window.scrollY > 0 && current == 0 && finishedanim){
        current = 1
        
        transition(firstanimation ? 2000 : 500)
        
        firstanimation = false
      } else if(window.scrollY == 0 && current == 1 && finishedanim){
        current = 0
        transition(firstanimation ? 2000 : 500)
        
        renderer.setClearColor(0x000000)
      }


      if(finishedanim == true){
      //if(true){
        /*
        camera.position.z = 2000 * Math.sin(position_theta)
        camera.position.x = 2000 * Math.cos(position_theta)
        camera.position.y = 1500 * Math.sin(position_theta)*/

        camera.position.y = 2000 * Math.sin(position_theta)
        camera.position.x = 2000 * Math.cos(position_theta)
      }


      position_theta += 0.01;
      camera.lookAt(0,0,0)
      
      if(current == 1 && l < 85){
        l+=3;
      }
      if(current == 0 && l > 0){
        l-=3;
      }

      let color = new THREE.Color();
      color.setHSL(0,0,l/100)
      renderer.setClearColor(color);

      let color2 = new THREE.Color();
      color2.setHSL(0,0,100-l/100);
      for(let i = 0; i < objects.length; i++){

        objects[i].material.color.setHSL(0,0,1-l/100)
      }

      TWEEN.update();

      renderer.render(scene, camera);
    };
    animate();

  }

  render() {
    return <div id="container"></div>;
  }
}
