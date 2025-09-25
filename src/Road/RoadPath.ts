import {Curve3, Vector3} from "@babylonjs/core"
export class RoadPath{
    curve: Curve3;

    constructor(points: Vector3[]){
        this.curve = this.ConstructCurveFromPoints(points);
    }

    ConstructCurveFromPoints(points: Vector3[]): Curve3{
        if(points.length === 3){
            const turnValue = 0.85;
            const [start, turn, end] = points;

            // 1. Straight segment from start to turn (shorten slightly to make room for curve)
            const dirToTurn = turn.subtract(start);
            const curveStart = start.add(dirToTurn.scale(turnValue)); // shorten 0.2 units before turn
            const firstSegment = Curve3.CreateCatmullRomSpline([start, curveStart], 20);

            // 2. Straight segment from turn to end (shorten slightly to make room for curve)
            const dirFromTurn = end.subtract(turn);
            const curveEnd = turn.add(dirFromTurn.scale(turnValue)); // start curve a bit away from turn
            const lastSegment = Curve3.CreateCatmullRomSpline([curveEnd, end], 20);

            // 3. Small curve at the turn
            const cornerCurve = Curve3.CreateQuadraticBezier(curveStart, turn, curveEnd, 10);

            // 4. Combine the three curves
            let fullCurve = firstSegment.continue(cornerCurve);
            fullCurve = fullCurve.continue(lastSegment);

            return fullCurve;
        }
        else{
            let newCurve = Curve3.CreateCatmullRomSpline(points, 500, false);
            return newCurve;
        }
    }
}