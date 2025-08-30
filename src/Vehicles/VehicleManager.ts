import {Vehicle} from './Vehicle'
import {Car} from './Car'
import {Scene} from "@babylonjs/core"

export class VehicleManager{
    private vehicles: Vehicle[] = []
    private vehicleSpawnTimer: number = 0

    private SpawnNewVehicle(scene: Scene): void{
        this.vehicles.push(new Car(scene))
    }

    public Update(time: number, scene: Scene): void{
        this.vehicleSpawnTimer += time;
        if(this.vehicleSpawnTimer > 100){
            this.SpawnNewVehicle(scene)
            this.vehicleSpawnTimer -= 100;
        }

        this.vehicles.forEach(element => {
            element.Move()
            if(element.IsDone()){
                element.DisposeOfMesh();
            }
        });
        this.vehicles = this.vehicles.filter((vehicle) => vehicle.IsDone() == false);
    }
}