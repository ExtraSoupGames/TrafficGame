import { Engine, Scene, UniversalCamera, HemisphericLight, MeshBuilder, Vector3 } from "@babylonjs/core";
import {VehicleManager} from "./Vehicles/VehicleManager"
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

const scene = new Scene(engine);

const camera = new UniversalCamera("main", new Vector3(15, 15, 15), scene);
camera.setTarget(new Vector3(0,0,0))
new HemisphericLight("light", new Vector3(0.5, 1, 0), scene);

const vehManager: VehicleManager = new VehicleManager();
engine.runRenderLoop(() => {
  vehManager.Update(1, scene)
  scene.render();
});

