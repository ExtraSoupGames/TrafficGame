import { Engine, Scene, UniversalCamera, HemisphericLight, MeshBuilder, Vector3 } from "@babylonjs/core";
import {GameScene} from "./GameScene"
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

const scene = new Scene(engine);

const camera = new UniversalCamera("main", new Vector3(15, 15, 15), scene);
camera.setTarget(new Vector3(0,0,0))
new HemisphericLight("light", new Vector3(0.5, 1, 0), scene);

window.addEventListener("resize", () => {
    engine.resize();
});

const game: GameScene = new GameScene(scene)
engine.runRenderLoop(() => {
  const deltaTime = engine.getDeltaTime() / 1000;
  game.Update(deltaTime)
  game.GetScene().render();
});

