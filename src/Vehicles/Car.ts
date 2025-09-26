import { AbstractMesh, Mesh, MeshBuilder, Scene, Curve3, Vector3, Quaternion, Axis, Scalar } from '@babylonjs/core';
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader.js";
import "@babylonjs/loaders/glTF";
import { Vehicle } from './Vehicle';
import { TrafficLight } from '../Road/TrafficLight';
import {TrafficLane} from "../Road/TrafficLane"
export class Car extends Vehicle {


    private constructor(mesh: AbstractMesh, path: Curve3, scene: Scene) {
        super(mesh, path, 30, 40, 10, scene);
    }

    // Async factory method
    static async Create(scene: Scene, path: Curve3): Promise<Car> {
        const result = await SceneLoader.ImportMeshAsync(
            "",              // load all meshes
            "/TrafficGame/models/",      // folder path
            "Car.glb",       // file name
            scene
        );  

        const mesh = new Mesh("car", scene);
        result.meshes.forEach(m => m.parent = mesh);
        mesh.position = new Vector3(0, 0, 0);
        mesh.scaling = new Vector3(1, 1, 1);
        mesh.isVisible = true;

        return new Car(mesh, path, scene);
    }

    override Move(deltaTime: number, light: TrafficLight, lane: TrafficLane): void {
        super.Move(deltaTime, light, lane);
    }

}
