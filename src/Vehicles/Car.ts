import { Mesh, MeshBuilder, Scene } from '@babylonjs/core';
import {Vehicle} from './Vehicle'
export class Car extends Vehicle{
    move(): void {
        throw new Error('Method not implemented.');
    }
    constructor(scene: Scene){
        const myMesh: Mesh = MeshBuilder.CreateCapsule("CarMesh", {height: 5, radiusBottom: 2, radiusTop: 2, radius: 3, subdivisions: 10}, scene);
        myMesh.rotation.x = 90;
        super(myMesh)
    }

}