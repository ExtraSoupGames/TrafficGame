import { Mesh, MeshBuilder, Scene } from '@babylonjs/core';
import {Vehicle} from './Vehicle'
export class Car extends Vehicle{
    move(): void {
        throw new Error('Method not implemented.');
    }
    constructor(scene: Scene){
        const myMesh: Mesh = MeshBuilder.CreateCapsule("CarMesh", {height: 1}, scene);
        super(myMesh)
    }

}