import { Mesh, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';
import {Vehicle} from './Vehicle'
export class Car extends Vehicle{
    Move(): void {
        this.mesh.position.z += 0.1;
    }
    constructor(scene: Scene){
        const myMesh: Mesh = MeshBuilder.CreateCapsule("CarMesh", {height: 5, radiusBottom: 2, radiusTop: 2, radius: 3, subdivisions: 10}, scene);
        super(myMesh)
        this.mesh.position.z = -20
    }

    IsDone(): boolean{
        return this.mesh.position.z > 20;
    }

    DisposeOfMesh(): void{
        this.mesh.dispose();
    }

}