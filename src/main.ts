import { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

const scene = new Scene(engine);

const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 5, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

new HemisphericLight("light", new Vector3(0, 1, 0), scene);

const box = MeshBuilder.CreateBox("box", { size: 1 }, scene);

engine.runRenderLoop(() => {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  scene.render();
});

window.addEventListener("resize", () => engine.resize());
