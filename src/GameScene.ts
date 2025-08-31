import {RoadPath} from './Road/RoadPath'
import {RandomNumberBlock, Vector3} from "@babylonjs/core"
import {Vehicle} from './Vehicles/Vehicle'
import {Car} from './Vehicles/Car'
import { TrafficLight } from './Road/TrafficLight'
import {Scene} from "@babylonjs/core"
export class GameScene{
    paths: RoadPath[] = []
    private vehicles: Vehicle[] = []
    private lights: TrafficLight[] = []
    private vehicleSpawnTimer: number = 0
    private scene: Scene;
    constructor(scene: Scene){
        this.scene = scene;
        //straight paths
        this.paths.push(new RoadPath([new Vector3(-20, 0, 2), new Vector3(20, 0 ,2)]));
        this.paths.push(new RoadPath([new Vector3(20, 0, -2), new Vector3(-20, 0 ,-2)]));
        this.paths.push(new RoadPath([new Vector3(2, 0, 20), new Vector3(2, 0 ,-20)]));
        this.paths.push(new RoadPath([new Vector3(-2, 0, -20), new Vector3(-2, 0 ,20)]));
        //curved paths
        this.paths.push(new RoadPath([new Vector3(-20, 0, 2), new Vector3(2, 0, 2), new Vector3(2, 0, -20)]))
        this.paths.push(new RoadPath([new Vector3(-20, 0, 2), new Vector3(-2, 0, 2), new Vector3(-2, 0, 20)]))
        this.paths.push(new RoadPath([new Vector3(20, 0, -2), new Vector3(2, 0, -2), new Vector3(2, 0, -20)]))
        this.paths.push(new RoadPath([new Vector3(20, 0, -2), new Vector3(-2, 0, -2), new Vector3(-2, 0, 20)]))
        this.paths.push(new RoadPath([new Vector3(2, 0, 20), new Vector3(2, 0, -2), new Vector3(-20, 0, -2)]))
        this.paths.push(new RoadPath([new Vector3(2, 0, 20), new Vector3(2, 0, 2), new Vector3(20, 0, 2)]))
        this.paths.push(new RoadPath([new Vector3(-2, 0, -20), new Vector3(-2, 0, 2), new Vector3(-20, 0, -2)]))
        this.paths.push(new RoadPath([new Vector3(-2, 0, -20), new Vector3(-2, 0, -2), new Vector3(20, 0, 2)]))
        this.SpawnNewTrafficLight(new Vector3(0, 0, 6));
        this.SpawnNewTrafficLight(new Vector3(0, 0, -6));
        this.SpawnNewTrafficLight(new Vector3(6, 0, 0));
        this.SpawnNewTrafficLight(new Vector3(-6, 0, 0));
    }

    private SpawnNewVehicle(): void{
        let pathChoice = Math.floor(Math.random() * this.paths.length);
        this.vehicles.push(new Car(this.scene, this.paths[pathChoice].curve))
    }
    private SpawnNewTrafficLight(position: Vector3): void{
        const trafficLight = new TrafficLight(this.scene, position, position.normalize().scale(4.2));
        this.lights.push(trafficLight);
    }

    public Update(time: number): void{
        this.vehicleSpawnTimer += time;
        if(this.vehicleSpawnTimer > 5){
            this.SpawnNewVehicle()
            this.vehicleSpawnTimer -= 5;
        }

        this.vehicles.forEach(element => {
            element.Move(time, this.lights)
            if(element.IsDone()){
                element.DisposeOfMesh();
            }
        });
        this.vehicles = this.vehicles.filter((vehicle) => vehicle.IsDone() == false);
    }
}