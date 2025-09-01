import {RoadPath} from "./RoadPath"
import {TrafficLight} from "./TrafficLight"
import {Vehicle} from "../Vehicles/Vehicle"
import {Car} from "../Vehicles/Car"
import {Vector3, Scene, Mesh} from "@babylonjs/core"
export class TrafficLane{
    private paths: RoadPath[] = [];
    private light: TrafficLight;
    private vehicles: Vehicle[] = [];
    private scene: Scene;
    constructor(lightPos: Vector3, scene: Scene){
        this.light = this.SpawnNewTrafficLight(lightPos);
        this.scene = scene;
    }
    public AssignNewPath(points: Vector3[]): void{
        this.paths.push(new RoadPath(points))
    }
    public SpawnNewVehicle(): void{
        let pathChoice = Math.floor(Math.random() * this.paths.length);
        this.vehicles.push(new Car(this.scene, this.paths[pathChoice].curve))
    }
    private SpawnNewTrafficLight(position: Vector3): TrafficLight{
        const trafficLight = new TrafficLight(this.scene, position, position.normalize().scale(4.2));
        return trafficLight;
    }
    public Update(time: number): void{
        this.vehicles.forEach(element => {
            element.Move(time, this.light, this)
            if(element.IsDone()){
                element.DisposeOfMesh();
            }
        });
        this.vehicles = this.vehicles.filter((vehicle) => vehicle.IsDone() == false);
    }
    public VehicleInStopZone(vehicleMesh: Mesh): boolean{
        return this.vehicles.some(element => element.Intersects(vehicleMesh));
    }
}