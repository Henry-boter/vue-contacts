<!--suppress ALL -->
<template>
    <div id="container"></div>
</template>
<script>
  import * as THREE from "three";
  import { CSS3DRenderer, CSS3DObject } from 'three-css3drenderer';
  // import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
  // import MTLLoader from  'three-mtl-loader';
  // import OBJLoader from  'three-obj-loader';
  // import { CSS2DRenderer, CSS2DObject } from 'three-css2drender';

  const OrbitControls = require('three-orbit-controls')(THREE);
  import pano_r from '../../assets/carImage/font/pano_r.jpg'
  import pano_l from '../../assets/carImage/font/pano_l.jpg'
  import pano_u from '../../assets/carImage/font/pano_u.jpg'
  import pano_d from '../../assets/carImage/font/pano_d.jpg'
  import pano_f from '../../assets/carImage/font/pano_f.jpg'
  import pano_b from '../../assets/carImage/font/pano_b.jpg'
  var touchX, touchY;
  export default {
    name: "threeMap",
    data() {
      return {
        scene: '',
        labelRenderer: '',
        light: '',
        camera: '',
        controls: '',
        renderer: '',
        geometry: '',
        material: '',
        cube: '',
        fov: 60,
        biaozhudiv: '',
        img: '',
        biaozhuLabel: '',
        lon: 90,
        lat: 0
      }
    },
    mounted() {
      this.init();
      this.animate();
    },
    created() {
      this.target = new THREE.Vector3();
    },
    // destroyed(){
    //   console.log("实例已经被销毁");
    // },
    methods: {
      init() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        this.scene = new THREE.Scene();

        var sides = [
          {
            // url: 'https://github.com/mrdoob/three.js/blob/master/examples/textures/cube/Bridge2/posx.jpg',
            //url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/Bridge2/posx.jpg',
            // url: '../../../static/carImage/font/pano_r.jpg',
            // url: '../../assets/carImage/font/pano_r.jpg',
            url: pano_r,
            position: [ - 1024, 0, 0 ],
            rotation: [ 0, Math.PI / 2, 0 ]
          },
          {
            // url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/Bridge2/negx.jpg',
            // url: '../../../static/carImage/font/pano_r.jpg',
            // url: '../../../static/carImage/font/pano_l.jpg',
            // url: '../../assets/carImage/font/pano_l.jpg',
            url: pano_l,
            position: [ 1024, 0, 0 ],
            rotation: [ 0, - Math.PI / 2, 0 ]
          },
          {
            //url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/Bridge2/posy.jpg',
            // url: '../../../static/carImage/font/pano_u.jpg',
            // url: '../../assets/carImage/font/pano_u.jpg',
            url: pano_u,
            position: [ 0, 1024, 0 ],
            rotation: [ Math.PI / 2, 0, Math.PI ]
          },
          {
            //  url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/Bridge2/negy.jpg',
            // url: '../../../static/carImage/font/pano_d.jpg',
            // url: '../../assets/carImage/font/pano_d.jpg',
            url: pano_d,
            position: [ 0, - 1024, 0 ],
            rotation: [ - Math.PI / 2, 0, Math.PI ]
          },
          {
            //url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/Bridge2/posz.jpg',
            // url: '../../../static/carImage/font/pano_f.jpg',
            // url: '../../assets/carImage/font/pano_f.jpg',
            url: pano_f,
            position: [ 0, 0, 1024 ],
            rotation: [ 0, Math.PI, 0 ]
          },
          {
            // url: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/Bridge2/negz.jpg',
            // url: '../../../static/carImage/font/pano_b.jpg',
            // url: '../../assets/carImage/font/pano_b.jpg',
            url: pano_b,
            position: [ 0, 0, - 1024 ],
            rotation: [ 0, 0, 0 ]
          }
        ];

        for (var i = 0; i < sides.length; i++) {

          var side = sides[ i ];

          var element = document.createElement('img');
          element.width = 2053; // 2 pixels extra to close the gap.
          element.src = side.url;

          var object = new CSS3DObject(element);
          object.position.fromArray(side.position);
          object.rotation.fromArray(side.rotation);
          this.scene.add(object);
        }

        this.renderer = new CSS3DRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        const container = document.getElementById('container');
        container.appendChild(this.renderer.domElement);

        //

        document.addEventListener('mousedown', this.onDocumentMouseDown, false);
        document.addEventListener('wheel', this.onDocumentMouseWheel, false);

        document.addEventListener('touchstart', this.onDocumentTouchStart, false);
        document.addEventListener('touchmove', this.onDocumentTouchMove, false);

        window.addEventListener('resize', this.onWindowResize, false);
      },
      onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      },
      onDocumentMouseDown(event) {
        // event.preventDefault();
        document.addEventListener('mousemove', this.onDocumentMouseMove, false);
        document.addEventListener('mouseup', this.onDocumentMouseUp, false);
      },
      onDocumentMouseMove(event) {
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        this.lon -= movementX * 0.1;
        this.lat += movementY * 0.1;
      },
      onDocumentMouseUp() {
        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
      },
      onDocumentMouseWheel(event) {
        var fov = this.camera.fov + event.deltaY * 0.05;
        this.camera.fov = THREE.MathUtils.clamp(fov, 10, 75);
        this.camera.updateProjectionMatrix();
      },
      onDocumentTouchStart(event) {
        // event.preventDefault();
        var touch = event.touches[ 0 ];
        touchX = touch.screenX;
        touchY = touch.screenY;
      },
      onDocumentTouchMove(event) {
        // event.preventDefault();
        var touch = event.touches[ 0 ];
        this.lon -= (touch.screenX - touchX) * 0.1;
        this.lat += (touch.screenY - touchY) * 0.1;
        touchX = touch.screenX;
        touchY = touch.screenY;
      },
      animate() {
        requestAnimationFrame(this.animate);

        this.lon += 0.1;
        this.lat = Math.max(- 85, Math.min(85, this.lat));
        this.phi = THREE.MathUtils.degToRad(90 - this.lat);
        this.theta = THREE.MathUtils.degToRad(this.lon);

        this.target.x = Math.sin(this.phi) * Math.cos(this.theta);
        this.target.y = Math.cos(this.phi);
        this.target.z = Math.sin(this.phi) * Math.sin(this.theta);

        this.camera.lookAt(this.target);

        this.renderer.render(this.scene, this.camera);

      }
    }
  }
</script>
