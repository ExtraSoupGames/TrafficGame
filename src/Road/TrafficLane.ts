import {RoadPath} from "./RoadPath"
import {TrafficLight} from "./TrafficLight"
import {Vehicle} from "../Vehicles/Vehicle"
import {Car} from "../Vehicles/Car"
import {Vector3, Scene, AbstractMesh} from "@babylonjs/core"
import {WarningTracker} from "../WarningTracker"
export class TrafficLane{
    private paths: RoadPath[] = [];
    private light: TrafficLight;
    private vehicles: Vehicle[] = [];
    private scene: Scene;
    private registeredAsWarning: boolean = false;
    private warningTracker: WarningTracker;
    constructor(lightPos: Vector3, scene: Scene, warningTracker: WarningTracker){
        this.light = this.SpawnNewTrafficLight(lightPos);
        this.scene = scene;
        this.warningTracker = warningTracker;
    }
    public AssignNewPath(points: Vector3[]): void{
        this.paths.push(new RoadPath(points))
    }
    public async SpawnNewVehicle(): Promise<void>{
        let pathChoice = Math.floor(Math.random() * this.paths.length);
        const newCar = await Car.Create(this.scene, this.paths[pathChoice].curve);
        this.vehicles.push(newCar);
        if(this.vehicles.length > 5){
            if(!this.registeredAsWarning){
                this.warningTracker.RegisterWarning();
            }
            this.registeredAsWarning =  true;
        }
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
                this.CheckForWarningDissapear();
            }
        });

        this.vehicles = this.vehicles.filter((vehicle) => vehicle.IsDone() == false);
    }
    private CheckForWarningDissapear(){
        if(this.vehicles.length <= 5){
            if(this.registeredAsWarning){
                this.warningTracker.UnRegiserWarning();
            }
            this.registeredAsWarning = false;
        }
    }
    public VehicleInStopZone(vehicleMesh: AbstractMesh): boolean{
        return this.vehicles.some(element => element.Intersects(vehicleMesh));
    }
    public GetAllVehicles(): Vehicle[]{
        return this.vehicles;
    }
    public Reset(newScene: Scene): void{
        this.scene = newScene;
        this.vehicles = [];
    }
}