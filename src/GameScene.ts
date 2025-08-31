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

    }

    private SpawnNewVehicle(): void{
        let pathChoice = Math.floor(Math.random() * this.paths.length);
        this.vehicles.push(new Car(this.scene, this.paths[pathChoice].curve))
    }

    public Update(time: number): void{
        this.vehicleSpawnTimer += time;
        if(this.vehicleSpawnTimer > 0.1){
            this.SpawnNewVehicle()
            this.vehicleSpawnTimer -= 0.1;
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