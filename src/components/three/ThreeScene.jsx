import React, { Component } from "react";
import * as THREE from "three";
import * as d3 from "d3";
import { csv } from "d3-request";
import * as d3Scale from "d3-scale";
import * as dat from "dat.gui";
import "./Container.css";

var OrbitControls = require("three-orbit-controls")(THREE);

export class ThreeScene extends Component {
  componentDidMount() {
    this.optimizer = { scale: 0, counter: 0 };

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

    this.group = new THREE.Group();

    this.dataSet = {};

    csv("neuron.1.csv", (error, data) => {
      this.data = data.map(d => ({
        x: +d.x,
        y: +d.y,
        z: +d.z,
        radius: +d.radius,
        type: +d.type,
        parent: +d.parent
      }));
      this.dataSet = data;
      this.metodone(this.dataSet);
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

    console.log(this.group.children.length);

    this.start();
  }

  metodone(dataCsv) {
    var counter = 0;
    var colorScale = d3Scale
      .scaleOrdinal()
      .domain([1, 2, 3, 4, 5])
      .range(["red", "green", "blue", "yellow", "orange"]);
    var colorExt = d3.extent(dataCsv, function(d) {
      return d.type;
    });
    colorScale.domain(colorExt);
    dataCsv.forEach(d => {
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
        var sphereGeometry = new THREE.SphereGeometry(Math.log(d.radius), 8, 6);
      }
      //   var geometry = new THREE.BufferGeometry().fromGeometry(sphereGeometry);
      if (counter % 10 == 0) {
        var mesh = new THREE.Mesh(sphereGeometry, material);
        mesh.position.set(d.x, d.y, d.z);
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = true;
        this.group.add(mesh);
      }

      counter++;
    });
    new THREE.Box3()
      .setFromObject(this.group)
      .getCenter(this.group.position)
      .multiplyScalar(-1);

    this.scene.add(this.group);
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

    if (this.optimizer.counter === 10) {
      this.optimizer.counter = 0;

      if (this.optimizer.scale !== this.props.state.options.scale) {
        console.log("in 1");
        for (var i = 0; i < this.group.children.length; i++) {
          console.log("in 2");
          this.group.children[i].scale.setX(this.props.state.options.scale);
          this.group.children[i].scale.setY(this.props.state.options.scale);
          this.group.children[i].scale.setZ(this.props.state.options.scale);
          this.optimizer.scale = this.props.state.options.scale;
        }
      }
    }
    this.optimizer.counter++;
    this.scene.rotation.x += this.props.state.options.velx;
    this.scene.rotation.y += this.props.state.options.vely;

    if (this.props.state.reload == 1) {
      //this.metodone(this.dataSet);
      //this.group.center();

      this.props.changeMethod();
    }

    this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  doSomething = () => {
    console.log("doSomething");
  };

  // DAT.GUI Related Stuff

  render() {
    return (
      <div
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }

  /*var gui = new dat.GUI({});
   // console.log("GUI :" + gui);
   // gui.domElement.id = "my-gui-container";

    //this.mount.childNodes[0].appendChild(gui.domElement);

    console.log("mount: " + this.mount.childNodes[0]);

    var velocity = gui.addFolder("Velocity");
    velocity
      .add(this.options, "velx", -0.2, 0.2)
      .name("X")
      .listen();
    velocity
      .add(this.options, "vely", -0.2, 0.2)
      .name("Y")
      .listen();
    velocity.open();
    */
}
