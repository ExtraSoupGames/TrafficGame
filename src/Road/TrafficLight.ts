import {Vector3, ActionManager, Mesh, MeshBuilder, Scene, ExecuteCodeAction, StandardMaterial, Color3} from "@babylonjs/core"
export class TrafficLight{
    isRed: boolean = false;
    mesh: Mesh;
    stopZone: Mesh;
    constructor(scene: Scene, position: Vector3, direction: Vector3) {
        this.mesh = this.createLightMesh(scene, position);
        this.addClickHandler(scene);

        this.stopZone = this.createStopZone(scene, position, direction);
        this.stopZone.parent = this.mesh;
        this.UpdateColour();
    }

    private createLightMesh(scene: Scene, position: Vector3): Mesh {
        const mesh = MeshBuilder.CreateBox("trafficLight", { size: 1 }, scene);
        mesh.position = position.add(new Vector3(0, 2, 0));

        const mat = new StandardMaterial("mat", scene);
        mesh.material = mat;

        return mesh;
    }

    private addClickHandler(scene: Scene): void {
        this.mesh.actionManager = new ActionManager(scene);
        this.mesh.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnPickTrigger, () => this.OnClick())
        );
    }

    private createStopZone(scene: Scene, position: Vector3, direction: Vector3): Mesh {
        const zone = MeshBuilder.CreateBox("stopZone", {
            width: 3,
            height: 1,
            depth: 3,
        }, scene);

        zone.isVisible = false; //change to true for debugging
        zone.checkCollisions = false;
        zone.position = position.add(direction);

        return zone; //TODO change stopzone logic to not depend on vehicle mesh size
    }
    OnClick(): void{
        this.isRed = !this.isRed;
        this.UpdateColour();
    }
    UpdateColour(): void{
        let mat = this.mesh.material as StandardMaterial;
        mat.diffuseColor = this.isRed ? Color3.Red() : Color3.Green();
        mat.emissiveColor = this.isRed ? Color3.Red() : Color3.Green();
    }
    GetZone(): Mesh{
        return this.stopZone;
    }
}