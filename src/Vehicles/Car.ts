import { Mesh, MeshBuilder, Scene, Curve3, Vector3, Quaternion, Axis, Scalar } from '@babylonjs/core';
import { Vehicle } from './Vehicle';

export class Car extends Vehicle {


    constructor(scene: Scene, path: Curve3) {
        const myMesh: Mesh = MeshBuilder.CreateCapsule(
            "CarMesh",
            { height: 5, radiusBottom: 2, radiusTop: 2, radius: 3, subdivisions: 10 },
            scene
        );
        myMesh.checkCollisions = false;
        super(myMesh, path, 30, 40, 10);


    }

    override Move(deltaTime: number): void {
        super.Move(deltaTime);
    }

}
