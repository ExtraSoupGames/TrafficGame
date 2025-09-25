import {RoadPath} from './Road/RoadPath'
import {Mesh, Vector3} from "@babylonjs/core"
import {Vehicle} from './Vehicles/Vehicle'
import {Car} from './Vehicles/Car'
import { TrafficLane } from './Road/TrafficLane'
import {RoadModels} from "./Road/RoadModels"
import {Scene} from "@babylonjs/core"
export class GameScene{
    private lanes: TrafficLane[] = [];
    private vehicles: Vehicle[] = []
    private vehicleSpawnTimer: number = 3
    private scene: Scene;
    constructor(scene: Scene){
        this.scene = scene;
        this.lanes.push(new TrafficLane(new Vector3(0, 0, 6), scene));
        this.lanes.push(new TrafficLane(new Vector3(0, 0, -6), scene));
        this.lanes.push(new TrafficLane(new Vector3(6, 0, 0), scene));
        this.lanes.push(new TrafficLane(new Vector3(-6, 0, 0), scene));
        let roadOffset = 1.5;
        //straight paths
        this.lanes[3].AssignNewPath([new Vector3(-20, 0, roadOffset), new Vector3(20, 0 ,roadOffset)]);
        this.lanes[2].AssignNewPath([new Vector3(20, 0, -roadOffset), new Vector3(-20, 0 ,-roadOffset)]);
        this.lanes[1].AssignNewPath([new Vector3(-roadOffset, 0, -20), new Vector3(-roadOffset, 0 ,20)]);
        this.lanes[0].AssignNewPath([new Vector3(roadOffset, 0, 20), new Vector3(roadOffset, 0 ,-20)]);
        //curved paths
        this.lanes[0].AssignNewPath([new Vector3(roadOffset, 0, 20), new Vector3(roadOffset, 0, -roadOffset), new Vector3(-20, 0, -roadOffset)]);
        this.lanes[0].AssignNewPath([new Vector3(roadOffset, 0, 20), new Vector3(roadOffset, 0, roadOffset), new Vector3(20, 0, roadOffset)]);
        this.lanes[1].AssignNewPath([new Vector3(-roadOffset, 0, -20), new Vector3(-roadOffset, 0, -roadOffset), new Vector3(-20, 0, -roadOffset)]);
        this.lanes[1].AssignNewPath([new Vector3(-roadOffset, 0, -20), new Vector3(-roadOffset, 0, roadOffset), new Vector3(20, 0, roadOffset)]);


        //new roadmodel testing
        let r = RoadModels.Create(scene);
    }

    public Update(time: number): void{
        this.vehicleSpawnTimer += time;
        if(this.vehicleSpawnTimer > 3){
            this.lanes.forEach(element => {element.SpawnNewVehicle()});
            this.vehicleSpawnTimer -= 3;
        }
        this.lanes.forEach(element => {element.Update(time)});
    }
}