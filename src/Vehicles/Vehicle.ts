import {Mesh, Vector3} from "@babylonjs/core"
export abstract class Vehicle{
    position: Vector3 = new Vector3
    target: Vector3 = new Vector3
    abstract Move(): void;
    protected mesh: Mesh;

    constructor(vehicleMesh: Mesh){
        this.mesh = vehicleMesh;
    }

    abstract IsDone(): boolean;

    abstract DisposeOfMesh(): void;
}