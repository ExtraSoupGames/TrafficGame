import { Scene, Mesh, Vector3 } from '@babylonjs/core';
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader.js";
import "@babylonjs/loaders/glTF";


export class RoadModels{
    private constructor(scene: Scene, meshes: Mesh[]){
        meshes.forEach((element) => scene.addMesh(element))
    }
    static async Create(scene: Scene): Promise<RoadModels>{
        let meshes: Mesh[] = [];
        let newMesh: Mesh = await RoadModels.CreateRoadStretch(scene, 0, false, false);
        meshes.push(newMesh);
        newMesh = await RoadModels.CreateRoadStretch(scene, 0, true, false);
        meshes.push(newMesh);
        newMesh = await RoadModels.CreateRoadStretch(scene, 0, false, true);
        meshes.push(newMesh);
        newMesh = await RoadModels.CreateRoadStretch(scene, 0, true, true);
        meshes.push(newMesh);


        const result = await SceneLoader.ImportMeshAsync(
            "",              // load all meshes
            "/TrafficGame/models/",      // folder path
            "RoadJunction.glb",       // file name
            scene
        );
        const mesh = new Mesh("roadJunction", scene);
        result.meshes.forEach(m => m.parent = mesh);
        mesh.scaling = new Vector3(4, 4, 4)
        mesh.position = new Vector3(0, -0.2, 0);
        mesh.isVisible = true;
        meshes.push(mesh);
        
        return new RoadModels(scene, meshes);
    }
    private static async CreateRoadStretch(scene: Scene, offset: number, XZAligned: Boolean, oppositeSide: Boolean): Promise<Mesh>{
        let meshes: Mesh[] = [];
        for (let i = 1;i< 10;i++){
            const result = await SceneLoader.ImportMeshAsync(
                "",              // load all meshes
                "/TrafficGame/models/",      // folder path
                "RoadStraight.glb",       // file name
                scene
            );  

            const mesh = new Mesh("roadSegment", scene);
            result.meshes.forEach(m => m.parent = mesh);
            let sideMultiplier = 1;
            if(oppositeSide){
                sideMultiplier = -1;
            }
            if(XZAligned){
                mesh.position = new Vector3((i) * 8 * sideMultiplier, -0.2, offset);
                mesh.rotation = new Vector3(0, Math.PI / 2 ,0);
            }
            else{
                mesh.position = new Vector3(offset, -0.2, (i) * 8 * sideMultiplier);
            }
            mesh.scaling = new Vector3(4, 4, 4);
            mesh.isVisible = true;
            meshes.push(mesh);
        }
        const parent = new Mesh("roadSegment", scene);
        meshes.forEach(element => {
            element.parent = parent;
        });
        return parent;
    }
}