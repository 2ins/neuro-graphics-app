import React, { Component } from "react";
import * as THREE from "three";
import * as d3 from "d3";
var OrbitControls = require("three-orbit-controls")(THREE);

export class ThreeScene extends Component {
  componentDidMount() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xcccccc);

    //renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //document.body.appendChild(renderer.domElement);
    this.mount.appendChild(this.renderer.domElement);

    //camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(10400, 200, 0);

    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 100;
    this.controls.maxDistance = 500;
    this.controls.maxPolarAngle = Math.PI / 2;

    // world
    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true
    });
    var counter = 0;

    d3.csv(
      "neuron.1.csv",
      function(d) {
        return {
          x: +d.x,
          y: +d.y,
          z: +d.z,
          radius: +d.radius,
          type: +d.type,
          parent: +d.parent
        };
      },
      function(data) {
        data.forEach(function(d) {
          if (counter == 0) {
            var sphereGeometry = new THREE.SphereGeometry(
              Math.log(d.radius),
              32,
              32
            );
          } else {
            var sphereGeometry = new THREE.SphereGeometry(d.radius, 8, 6);
          }

          var geometry = new THREE.BufferGeometry().fromGeometry(
            sphereGeometry
          );
          var mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = d.x / 3;
          mesh.position.y = d.y / 3;
          mesh.position.z = d.z / 3;
          mesh.updateMatrix();
          mesh.matrixAutoUpdate = true;
          this.scene.add(mesh);
          counter++;
        });
      }
    );

    var sphereGeometry2 = new THREE.SphereGeometry(5, 100, 310);
    var geometry2 = new THREE.BufferGeometry().fromGeometry(sphereGeometry2);

    var material2 = new THREE.MeshPhongMaterial({
      color: 0xf44242,
      flatShading: true
    });
    var mesh = new THREE.Mesh(geometry2, material2);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;

    mesh.updateMatrix();
    mesh.matrixAutoUpdate = true;
    this.scene.add(mesh);

    // lights
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    this.scene.add(light);

    var light = new THREE.DirectionalLight(0x002288);
    light.position.set(-1, -1, -1);
    this.scene.add(light);

    var light = new THREE.AmbientLight(0x222222);
    this.scene.add(light);

    // this.window.addEventListener("resize", this.onWindowResize, false);
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  onWindowResize = () => {
    this.camera.aspect = this.window.innerWidth / this.window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
    this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        style={{ width: "400px", height: "400px" }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
