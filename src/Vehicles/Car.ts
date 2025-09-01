import { Mesh, MeshBuilder, Scene, Curve3, Vector3, Quaternion, Axis, Scalar } from '@babylonjs/core';
import { Vehicle } from './Vehicle';
import { TrafficLight } from '../Road/TrafficLight';
import {TrafficLane} from "../Road/TrafficLane"
export class Car extends Vehicle {


    constructor(scene: Scene, path: Curve3) {
        const myMesh: Mesh = MeshBuilder.CreateCapsule(
            "CarMesh",
            { height: 5, radiusBottom: 2, radiusTop: 2, radius: 3, subdivisions: 10 },
            scene
        );
        myMesh.checkCollisions = false;
        super(myMesh, path, 30, 40, 10, scene);


    }

    override Move(deltaTime: number, light: TrafficLight, lane: TrafficLane): void {
        super.Move(deltaTime, light, lane);
    }

}
