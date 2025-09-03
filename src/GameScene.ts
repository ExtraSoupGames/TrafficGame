import {RoadPath} from './Road/RoadPath'
import {Mesh, Vector3} from "@babylonjs/core"
import {Vehicle} from './Vehicles/Vehicle'
import {Car} from './Vehicles/Car'
import { TrafficLane } from './Road/TrafficLane'
import {Scene} from "@babylonjs/core"
export class GameScene{
    private lanes: TrafficLane[] = [];
    private vehicles: Vehicle[] = []
    private vehicleSpawnTimer: number = 0
    private scene: Scene;
    constructor(scene: Scene){
        this.scene = scene;
        this.lanes.push(new TrafficLane(new Vector3(0, 0, 6), scene));
        this.lanes.push(new TrafficLane(new Vector3(0, 0, -6), scene));
        this.lanes.push(new TrafficLane(new Vector3(6, 0, 0), scene));
        this.lanes.push(new TrafficLane(new Vector3(-6, 0, 0), scene));
        //straight paths
        this.lanes[3].AssignNewPath([new Vector3(-20, 0, 2), new Vector3(20, 0 ,2)]);
        this.lanes[2].AssignNewPath([new Vector3(20, 0, -2), new Vector3(-20, 0 ,-2)]);
        this.lanes[1].AssignNewPath([new Vector3(-2, 0, -20), new Vector3(-2, 0 ,20)]);
        this.lanes[0].AssignNewPath([new Vector3(2, 0, 20), new Vector3(2, 0 ,-20)]);
        //curved paths
        this.lanes[0].AssignNewPath([new Vector3(2, 0, 20), new Vector3(2, 0, -2), new Vector3(-20, 0, -2)]);
        this.lanes[0].AssignNewPath([new Vector3(2, 0, 20), new Vector3(2, 0, 2), new Vector3(20, 0, 2)]);
        this.lanes[1].AssignNewPath([new Vector3(-2, 0, -20), new Vector3(-2, 0, -2), new Vector3(-20, 0, -2)]);
        this.lanes[1].AssignNewPath([new Vector3(-2, 0, -20), new Vector3(-2, 0, 2), new Vector3(20, 0, 2)]);
    }

    public Update(time: number): void{
        this.vehicleSpawnTimer += time;
        if(this.vehicleSpawnTimer > 5){
            this.lanes.forEach(element => {element.SpawnNewVehicle()});
            this.vehicleSpawnTimer -= 3;
        }
        this.lanes.forEach(element => {element.Update(time)});
    }
}