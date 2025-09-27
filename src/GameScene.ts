import {RoadPath} from './Road/RoadPath'
import {Mesh, Vector3} from "@babylonjs/core"
import {Vehicle} from './Vehicles/Vehicle'
import {Car} from './Vehicles/Car'
import { TrafficLane } from './Road/TrafficLane'
import {RoadModels} from "./Road/RoadModels"
import {BackgroundScene} from "./BackgroundScene"
import {Scene, UniversalCamera, HemisphericLight} from "@babylonjs/core"
import {Rectangle, AdvancedDynamicTexture} from "@babylonjs/gui"
export class GameScene{
    private introAlpha: number = 1;
    private lanes: TrafficLane[] = [];
    private vehicles: Vehicle[] = []
    private vehicleSpawnTimer: number = 3
    private scene: Scene;
    private fadeOverlay: Rectangle | null = null;
    private gui: AdvancedDynamicTexture | null = null;
    constructor(scene: Scene){
        this.scene = scene;
        this.PopulateScene();
    }
    private PopulateScene(){
        this.lanes = [];
        this.lanes.push(new TrafficLane(new Vector3(0, 0, 6), this.scene));
        this.lanes.push(new TrafficLane(new Vector3(0, 0, -6), this.scene));
        this.lanes.push(new TrafficLane(new Vector3(6, 0, 0), this.scene));
        this.lanes.push(new TrafficLane(new Vector3(-6, 0, 0), this.scene));
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


        let r = RoadModels.Create(this.scene);
        this.CreateFadeOverlay();
        let b = BackgroundScene.Create(this.scene);
    }

    public Update(time: number): void{
        this.vehicleSpawnTimer += time;
        if(this.vehicleSpawnTimer > 3){
            this.lanes.forEach(element => {element.SpawnNewVehicle()});
            this.vehicleSpawnTimer -= 3;
        }
        this.lanes.forEach(element => {element.Update(time)});
        if(this.CheckForCollisions()){
            this.EndGame();
        }
        this.UpdateIntro(time);
    }
    private UpdateIntro(time: number): void{
        if(this.introAlpha > 0){
            this.introAlpha -= time / 2;
            if(this.introAlpha < 0){
                this.introAlpha = 0;
            }
        }
        if(this.fadeOverlay){
            this.fadeOverlay.alpha = this.introAlpha;
        }
    }
    private CreateFadeOverlay(): void {
        if (this.gui) {
            this.gui.dispose();
        }
        this.gui = AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.fadeOverlay = new Rectangle();
        this.fadeOverlay.width = "100%";
        this.fadeOverlay.height = "100%";
        this.fadeOverlay.background = "black";
        this.fadeOverlay.alpha = 1; // start opaque
        this.gui.addControl(this.fadeOverlay);
    }
    private CheckForCollisions(): boolean{
        let vehicles = this.lanes.map(lane => lane.GetAllVehicles()).flat();
        return vehicles.some(v => v.CollisionCheck(vehicles));
    }
    private EndGame(): void{
        this.scene.dispose(); 
        const newScene = new Scene(this.scene.getEngine());
        const camera = new UniversalCamera("main", new Vector3(15, 15, 15), newScene);
        camera.setTarget(new Vector3(0,0,0))
        new HemisphericLight("light", new Vector3(0.5, 1, 0), newScene);
        this.scene = newScene;
        this.PopulateScene();
        this.ResetGame(newScene);
    }
    private ResetGame(newScene: Scene): void{
        this.lanes.forEach(lane => lane.Reset(newScene));
        this.introAlpha = 1;
    }
    public GetScene(): Scene {
        return this.scene;
    }   
}