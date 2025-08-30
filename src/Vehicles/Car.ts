import { Mesh } from '@babylonjs/core';
import {Vehicle} from './Vehicle'
class Car extends Vehicle{
    move(): void {
        throw new Error('Method not implemented.');
    }
    constructor(){
        const myMesh: Mesh = new Mesh("CarMesh");
        super(myMesh)
    }

}