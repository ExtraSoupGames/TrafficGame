import { Scene, Mesh, Vector3, MeshBuilder, StandardMaterial, Color3 } from '@babylonjs/core';
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader.js";
import "@babylonjs/loaders/glTF";


export class BackgroundScene{
    private constructor(scene: Scene, meshes: Mesh[]){
        meshes.forEach((element) => scene.addMesh(element))
    }
    static async Create(scene: Scene): Promise<BackgroundScene>{
        let meshes: Mesh[] = [];


        const result = await SceneLoader.ImportMeshAsync(
            "",              // load all meshes
            "/TrafficGame/models/",      // folder path
            "Bench.glb",       // file name
            scene
        );
        const mesh = new Mesh("bench", scene);
        result.meshes.forEach(m => m.parent = mesh);
        mesh.scaling = new Vector3(1, 1, 1)
        mesh.position = new Vector3(7, 0.1, 7);
        mesh.isVisible = true;
        meshes.push(mesh);

        const result2 = await SceneLoader.ImportMeshAsync(
            "",              // load all meshes
            "/TrafficGame/models/",      // folder path
            "Tree.glb",       // file name
            scene
        );
        const mesh2 = new Mesh("tree", scene);
        result2.meshes.forEach(m => m.parent = mesh2);
        mesh2.scaling = new Vector3(0.01, 0.01, 0.01)
        mesh2.position = new Vector3(-7, 0.1, -7);
        mesh2.isVisible = true;
        meshes.push(mesh2);

        const ground = MeshBuilder.CreatePlane("ground", {size: 100, sideOrientation: Mesh.DOUBLESIDE  }, scene);
        ground.rotation = new Vector3(-Math.PI / 2, 0 ,0);
        const mat = new StandardMaterial("mat", scene);
        ground.material = mat;
        mat.diffuseColor = new Color3(0.3, 0.6, 0.3);
        
        return new BackgroundScene(scene, meshes);
    }
}