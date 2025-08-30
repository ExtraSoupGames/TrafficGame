import { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } from "@babylonjs/core";
import {VehicleManager} from "./Vehicles/VehicleManager"
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

const scene = new Scene(engine);

const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 5, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

new HemisphericLight("light", new Vector3(0.5, 1, 0), scene);

const vehManager: VehicleManager = new VehicleManager();
engine.runRenderLoop(() => {
  vehManager.Update(1, scene)
  scene.render();
});

