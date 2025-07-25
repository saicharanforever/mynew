import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';

interface HyperspeedProps {
  effectOptions?: {
    onSpeedUp?: () => void;
    onSlowDown?: () => void;
    distortion?: string;
    length?: number;
    roadWidth?: number;
    islandWidth?: number;
    lanesPerRoad?: number;
    fov?: number;
    fovSpeedUp?: number;
    speedUp?: number;
    carLightsFade?: number;
    totalSideLightSticks?: number;
    lightPairsPerRoadWay?: number;
    shoulderLinesWidthPercentage?: number;
    brokenLinesWidthPercentage?: number;
    brokenLinesLengthPercentage?: number;
    lightStickWidth?: [number, number];
    lightStickHeight?: [number, number];
    movingAwaySpeed?: [number, number];
    movingCloserSpeed?: [number, number];
    carLightsLength?: [number, number];
    carLightsRadius?: [number, number];
    carWidthPercentage?: [number, number];
    carShiftX?: [number, number];
    carFloorSeparation?: [number, number];
    colors?: {
      roadColor?: number;
      islandColor?: number;
      background?: number;
      shoulderLines?: number;
      brokenLines?: number;
      leftCars?: number[];
      rightCars?: number[];
      sticks?: number;
    };
  };
}

const Hyperspeed = ({ effectOptions = {
  onSpeedUp: () => { },
  onSlowDown: () => { },
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
    rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
    sticks: 0x03B3C3,
  }
} }: HyperspeedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up previous instance
    if (appRef.current) {
      appRef.current.dispose();
    }

    const container = containerRef.current;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    let nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;

    const turbulentUniforms = {
      uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
      uAmp: { value: new THREE.Vector4(25, 5, 10, 10) }
    };

    const distortions = {
      turbulentDistortion: {
        uniforms: turbulentUniforms,
        getDistortion: `
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          #define PI 3.14159265358979
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,
              nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z
            );
          }
        `,
        getJS: (progress: number, time: number) => {
          let movementProgressFix = 0.02;
          let uFreq = turbulentUniforms.uFreq.value;
          let uAmp = turbulentUniforms.uAmp.value;
          let distortion = new THREE.Vector3(
            Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
            Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
            nsin(progress * Math.PI * uFreq.y + time) * uAmp.y -
            nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,
            nsin(progress * Math.PI * uFreq.z + time) * uAmp.z -
            nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z
          );
          let lookAtAmp = new THREE.Vector3(2, 2, 2);
          let lookAtOffset = new THREE.Vector3(0, 0, -5);
          return distortion.multiply(lookAtAmp).add(lookAtOffset);
        }
      }
    };

    class App {
      private scene: THREE.Scene;
      private camera: THREE.PerspectiveCamera;
      private renderer: THREE.WebGLRenderer;
      private composer: EffectComposer;
      private leftCarLights: THREE.InstancedMesh;
      private rightCarLights: THREE.InstancedMesh;
      private leftSticks: THREE.InstancedMesh;
      private rightSticks: THREE.InstancedMesh;
      private road!: THREE.Mesh;
      private islandLeft!: THREE.Mesh;
      private islandRight!: THREE.Mesh;
      private leftRoadWay!: THREE.Mesh;
      private rightRoadWay!: THREE.Mesh;
      private time = 0;
      private speed = 0;
      private targetSpeed = 0;
      private mouse = new THREE.Vector2();
      private speedUpTarget = 0;
      private speedUp = 0;
      private timeOffset = 0;

      constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(effectOptions.fov || 90, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setClearColor(effectOptions.colors?.background || 0x000000, 0.8);
        container.appendChild(this.renderer.domElement);

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        
        const bloomEffect = new BloomEffect({
          intensity: 0.4,
          luminanceThreshold: 0.15,
          luminanceSmoothing: 0.9,
          mipmapBlur: true,
          resolutionScale: 0.5
        });
        
        this.composer.addPass(new EffectPass(this.camera, bloomEffect, new SMAAEffect({
          preset: SMAAPreset.HIGH,
          edgeDetectionMode: 1
        })));

        this.init();
        this.createCarLights();
        this.createLightSticks();
        this.render();
        this.onResize();

        window.addEventListener('resize', this.onResize.bind(this));
      }

      init() {
        const options = effectOptions;
        const roadWidth = options.roadWidth || 9;
        const islandWidth = options.islandWidth || 2;
        const lanesPerRoad = options.lanesPerRoad || 3;

        const roadGeometry = new THREE.PlaneGeometry(roadWidth, options.length || 200);
        const roadMaterial = new THREE.MeshLambertMaterial({ color: options.colors?.roadColor || 0x101010 });
        this.road = new THREE.Mesh(roadGeometry, roadMaterial);
        this.road.rotation.x = -Math.PI / 2;
        this.road.position.z = -(options.length || 200) / 2;
        this.scene.add(this.road);

        // Add camera position
        this.camera.position.y = 8;
        this.camera.position.z = -5;
        this.camera.lookAt(0, 0, -50);

        // Add basic lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(-1, 1, 1);
        this.scene.add(directionalLight);
      }

      createCarLights() {
        const options = effectOptions;
        const curve = this.curve();
        
        const leftGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
        const rightGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
        
        const leftMaterial = new THREE.MeshBasicMaterial({ color: 0xff0040 });
        const rightMaterial = new THREE.MeshBasicMaterial({ color: 0x0080ff });
        
        this.leftCarLights = new THREE.InstancedMesh(leftGeometry, leftMaterial, 100);
        this.rightCarLights = new THREE.InstancedMesh(rightGeometry, rightMaterial, 100);
        
        this.scene.add(this.leftCarLights);
        this.scene.add(this.rightCarLights);

        // Position car lights
        for (let i = 0; i < 100; i++) {
          const progress = i / 100;
          const position = curve.getPointAt(progress);
          
          const matrix = new THREE.Matrix4();
          matrix.setPosition(position.x - 2, position.y + 0.1, position.z);
          this.leftCarLights.setMatrixAt(i, matrix);
          
          matrix.setPosition(position.x + 2, position.y + 0.1, position.z);
          this.rightCarLights.setMatrixAt(i, matrix);
        }
        
        this.leftCarLights.instanceMatrix.needsUpdate = true;
        this.rightCarLights.instanceMatrix.needsUpdate = true;
      }

      createLightSticks() {
        const stickGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8);
        const stickMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        
        this.leftSticks = new THREE.InstancedMesh(stickGeometry, stickMaterial, 50);
        this.rightSticks = new THREE.InstancedMesh(stickGeometry, stickMaterial, 50);
        
        this.scene.add(this.leftSticks);
        this.scene.add(this.rightSticks);

        for (let i = 0; i < 50; i++) {
          const z = -i * 8;
          
          const matrix = new THREE.Matrix4();
          matrix.setPosition(-6, 0.75, z);
          this.leftSticks.setMatrixAt(i, matrix);
          
          matrix.setPosition(6, 0.75, z);
          this.rightSticks.setMatrixAt(i, matrix);
        }
        
        this.leftSticks.instanceMatrix.needsUpdate = true;
        this.rightSticks.instanceMatrix.needsUpdate = true;
      }

      curve() {
        const points = [];
        const length = effectOptions.length || 200;
        for (let i = 0; i <= 100; i++) {
          const progress = i / 100;
          const z = -progress * length;
          points.push(new THREE.Vector3(0, 0, z));
        }
        return new THREE.CatmullRomCurve3(points);
      }

      onResize() {
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.composer.setSize(width, height);
      }

      render() {
        this.time += 0.016;
        
        // Animate car lights
        if (this.leftCarLights && this.rightCarLights) {
          for (let i = 0; i < 100; i++) {
            const matrix = new THREE.Matrix4();
            const z = ((-this.time * 50 + i * 4) % 400) - 200;
            
            matrix.setPosition(-2, 0.1, z);
            this.leftCarLights.setMatrixAt(i, matrix);
            
            matrix.setPosition(2, 0.1, z);
            this.rightCarLights.setMatrixAt(i, matrix);
          }
          this.leftCarLights.instanceMatrix.needsUpdate = true;
          this.rightCarLights.instanceMatrix.needsUpdate = true;
        }

        // Animate light sticks
        if (this.leftSticks && this.rightSticks) {
          for (let i = 0; i < 50; i++) {
            const matrix = new THREE.Matrix4();
            const z = ((-this.time * 30 + i * 8) % 400) - 200;
            
            matrix.setPosition(-6, 0.75, z);
            this.leftSticks.setMatrixAt(i, matrix);
            
            matrix.setPosition(6, 0.75, z);
            this.rightSticks.setMatrixAt(i, matrix);
          }
          this.leftSticks.instanceMatrix.needsUpdate = true;
          this.rightSticks.instanceMatrix.needsUpdate = true;
        }

        this.composer.render();
        requestAnimationFrame(this.render.bind(this));
      }

      dispose() {
        window.removeEventListener('resize', this.onResize.bind(this));
        this.renderer.dispose();
        if (this.composer) {
          this.composer.dispose();
        }
      }
    }

    appRef.current = new App();

    return () => {
      if (appRef.current) {
        appRef.current.dispose();
      }
    };
  }, [effectOptions]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        opacity: 0.6
      }} 
    />
  );
};

export default Hyperspeed;