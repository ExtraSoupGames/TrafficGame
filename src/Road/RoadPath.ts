import {Curve3, Vector3} from "@babylonjs/core"
export class RoadPath{
    curve: Curve3;

    constructor(points: Vector3[]){
        this.curve = this.ConstructCurveFromPoints(points);
    }

    ConstructCurveFromPoints(points: Vector3[]): Curve3{
        let newCurve = Curve3.CreateCatmullRomSpline(points, 500, false);
        return newCurve;
    }
}