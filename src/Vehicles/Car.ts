import { Mesh, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';
import {Vehicle} from './Vehicle'
export class Car extends Vehicle{
    private lifetime: number;
    Move(): void {
        this.lifetime += 1;
        this.mesh.position.z += 0.1;
    }
    constructor(scene: Scene){
        const myMesh: Mesh = MeshBuilder.CreateCapsule("CarMesh", {height: 5, radiusBottom: 2, radiusTop: 2, radius: 3, subdivisions: 10}, scene);
        myMesh.rotation.x = 90;
        super(myMesh)
        this.lifetime = 0;
    }

    IsDone(): boolean{
        return this.lifetime > 200;
    }

    DisposeOfMesh(): void{
        this.mesh.dispose();
    }

}