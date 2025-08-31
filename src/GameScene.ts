import {RoadPath} from './Road/RoadPath'
import {RandomNumberBlock, Vector3} from "@babylonjs/core"
import {Vehicle} from './Vehicles/Vehicle'
import {Car} from './Vehicles/Car'
import {Scene} from "@babylonjs/core"
export class GameScene{
    paths: RoadPath[] = []
    private vehicles: Vehicle[] = []
    private vehicleSpawnTimer: number = 0
    private scene: Scene;
    constructor(scene: Scene){
        this.scene = scene;
        this.paths.push(new RoadPath([new Vector3(-10, 0, 0), new Vector3(10, 0 ,0)]));
        this.paths.push(new RoadPath([new Vector3(10, 0, 5), new Vector3(-10, 0 ,5)]));
        this.paths.push(new RoadPath([new Vector3(10, 0, 5), new Vector3(0, 0, 5), new Vector3(0, 0, 15)]));
    }

    private SpawnNewVehicle(): void{
        let pathChoice = Math.floor(Math.random() * this.paths.length);
        this.vehicles.push(new Car(this.scene, this.paths[pathChoice].curve))
    }

    public Update(time: number): void{
        this.vehicleSpawnTimer += time;
        if(this.vehicleSpawnTimer > 1){
            this.SpawnNewVehicle()
            this.vehicleSpawnTimer -= 1;
        }

        this.vehicles.forEach(element => {
            element.Move(time)
            if(element.IsDone()){
                element.DisposeOfMesh();
            }
        });
        this.vehicles = this.vehicles.filter((vehicle) => vehicle.IsDone() == false);
    }
}