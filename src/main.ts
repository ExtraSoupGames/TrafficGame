import { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } from "@babylonjs/core";
import {Car} from "./Vehicles/Car"
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

const scene = new Scene(engine);

const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 5, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

new HemisphericLight("light", new Vector3(0.5, 1, 0), scene);

const car = new Car(scene)
engine.runRenderLoop(() => {
  scene.render();
});

