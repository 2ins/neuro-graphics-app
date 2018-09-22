import React, { Component } from "react";
import * as THREE from "three";
import * as d3 from "d3";
import { csv } from "d3-request";
import * as d3Scale from "d3-scale";

var OrbitControls = require("three-orbit-controls")(THREE);

export class ThreeScene1 extends Component {
  componentDidMount() {
    this.scene = new THREE.Scene();
    //this.scene.background = new THREE.Color(0xcccccc);

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

    var group = new THREE.Group();
    var counter = 0;
    var pivot;

    csv("neuron.1.csv", (error, data) => {
      this.data = data.map(d => ({
        x: +d.x,
        y: +d.y,
        z: +d.z,
        radius: +d.radius,
        type: +d.type,
        parent: +d.parent
      }));

      var colorScale = d3Scale
        .scaleOrdinal()
        .domain([1, 2, 3, 4, 5])
        .range(["red", "green", "blue", "yellow", "orange"]);

      var colorExt = d3.extent(data, function(d) {
        return d.type;
      });
      colorScale.domain(colorExt);

      data.forEach(d => {
        console.log("colore: " + colorScale(d.type));

        var material = new THREE.MeshPhongMaterial({
          color: colorScale(d.type),
          flatShading: true
        });

        if (counter == 0) {
          var sphereGeometry = new THREE.SphereGeometry(
            Math.log(d.radius),
            32,
            32
          );
        } else {
          var sphereGeometry = new THREE.SphereGeometry(
            Math.log(d.radius),
            8,
            6
          );
        }

        //   var geometry = new THREE.BufferGeometry().fromGeometry(sphereGeometry);
        var mesh = new THREE.Mesh(sphereGeometry, material);
        mesh.position.set(d.x, d.y, d.z);

        mesh.updateMatrix();
        mesh.matrixAutoUpdate = true;
        group.add(mesh);

        counter++;
      });

      new THREE.Box3()
        .setFromObject(group)
        .getCenter(group.position)
        .multiplyScalar(-1);

      this.scene.add(group);
    });

    // lights
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    this.scene.add(light);

    var light = new THREE.DirectionalLight(0x002288);
    light.position.set(-1, -1, -1);
    this.scene.add(light);

    var light = new THREE.AmbientLight(0x222222);
    this.scene.add(light);

    this.start();
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
    this.scene.rotation.y += 0.01;
    this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  changeSomething = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
    this.scene.rotation.y += 0.01;
    this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
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
