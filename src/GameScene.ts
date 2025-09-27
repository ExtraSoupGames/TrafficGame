import {RoadPath} from './Road/RoadPath'
import {Mesh, Vector3} from "@babylonjs/core"
import {Vehicle} from './Vehicles/Vehicle'
import {Car} from './Vehicles/Car'
import { TrafficLane } from './Road/TrafficLane'
import {RoadModels} from "./Road/RoadModels"
import {BackgroundScene} from "./BackgroundScene"
import {Scene, UniversalCamera, DirectionalLight, HemisphericLight, } from "@babylonjs/core"
import {Rectangle, AdvancedDynamicTexture, TextBlock, Control} from "@babylonjs/gui"
export class GameScene{
    private score: number = 0;
    private scoreText: TextBlock | null = null;
    private introAlpha: number = 1;
    private lanes: TrafficLane[] = [];
    private vehicles: Vehicle[] = []
    private vehicleSpawnTimer: number = 3
    private scene: Scene;
    private fadeOverlay: Rectangle | null = null;
    private gui: AdvancedDynamicTexture | null = null;
    constructor(scene: Scene){
        this.scene = scene;
        this.SetUpLighting(scene);
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
        this.CreateScoreCounter();
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
        this.score += time;
        if(this.scoreText){
            this.scoreText.text = `Score: ${Math.round(this.score).toString().padStart(2, "0")}`;
        }
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
    private CreateScoreCounter(): void {
        if (!this.gui) {
            this.gui = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        }

        const scoreContainer = new Rectangle();
        scoreContainer.widthInPixels = 300;
        scoreContainer.heightInPixels = 80;
        scoreContainer.background = "rgba(0,0,0,0.5)";
        scoreContainer.cornerRadius = 10;
        scoreContainer.thickness = 0;
        scoreContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        scoreContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        scoreContainer.paddingTopInPixels = 20;
        scoreContainer.paddingRightInPixels = 20;

        this.scoreText = new TextBlock();
        this.scoreText.text = `Score: ${Math.round(this.score).toString().padStart(2, "0")}`;
        this.scoreText.color = "white";
        this.scoreText.fontSize = 36;
        this.scoreText.fontFamily = "Consolas, monospace"; // fixes digit width
        this.scoreText.width = "100%";
        this.scoreText.height = "100%";
        this.scoreText.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.scoreText.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        this.scoreText.resizeToFit = false; // prevent auto-resize


        scoreContainer.addControl(this.scoreText);
        this.gui.addControl(scoreContainer);
    }


    private CheckForCollisions(): boolean{
        let vehicles = this.lanes.map(lane => lane.GetAllVehicles()).flat();
        return vehicles.some(v => v.CollisionCheck(vehicles));
    }
    private EndGame(): void{
        this.scene.dispose(); 
        const newScene = new Scene(this.scene.getEngine());
        const camera = new UniversalCamera("main", new Vector3(15, 15, 15), newScene);
        camera.setTarget(new Vector3(0,0,0));
        this.SetUpLighting(newScene);
        this.scene = newScene;
        this.PopulateScene();
        this.ResetGame(newScene);
    }
    private ResetGame(newScene: Scene): void{
        this.lanes.forEach(lane => lane.Reset(newScene));
        this.introAlpha = 1;
        this.score = 0;
    }
    public GetScene(): Scene {
        return this.scene;
    }   
    private SetUpLighting(newScene: Scene): void{
        let sunLight = new DirectionalLight("sunLight", new Vector3(0.5, -1, 0), newScene);
        let ambientLight = new HemisphericLight("ambientLight", new Vector3(1, 1, 1), newScene);
        ambientLight.intensity = 0.3;

    }
}