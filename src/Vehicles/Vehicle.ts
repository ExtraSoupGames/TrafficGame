import {Mesh, Curve3, Vector3, Scalar, Quaternion, Axis} from "@babylonjs/core"
import {TrafficLight} from '../Road/TrafficLight'

export abstract class Vehicle{

    private points: Vector3[];
    private segLen: number[] = [];
    private cumLen: number[] = [];
    private totalLen: number = 0;

    private distance: number = 0;
    private velocity: number = 0;
    private acceleration: number;
    private deaccelaration: number;
    private maxSpeed: number;

    protected mesh: Mesh;

    constructor(vehicleMesh: Mesh, path: Curve3, acceleration: number, deacceleration: number, maxSpeed: number){
        this.mesh = vehicleMesh;
        this.acceleration = acceleration;
        this.deaccelaration = deacceleration;
        this.maxSpeed = maxSpeed;
        this.points = path.getPoints();

        this.cumLen = [0];
        for (let i = 1; i < this.points.length; i++) {
            const d = Vector3.Distance(this.points[i - 1], this.points[i]);
            this.segLen.push(d);
            this.totalLen += d;
            this.cumLen.push(this.totalLen);
        }

        this.mesh.position.copyFrom(this.points[0]);
    }

    Move(deltaTime: number, lights: TrafficLight[]): void{

        if(this.ShouldGo(lights)){
            this.velocity += this.acceleration * deltaTime;
        }
        else{
            this.velocity -= this.deaccelaration * deltaTime;
        }
        this.velocity = Math.max(0, this.velocity);
        this.velocity = Math.min(this.maxSpeed, this.velocity)

        this.distance = Math.min(this.distance + this.velocity * deltaTime, this.totalLen);

        const pos = this.pointAtDistance(this.distance);
        this.mesh.position.copyFrom(pos);

        const posAhead = this.pointAtDistance(Math.min(this.distance + 0.5, this.totalLen));
        const forward = posAhead.subtract(pos).normalize();
        this.mesh.rotationQuaternion = Quaternion.FromLookDirectionLH(Axis.Y.scale(-1), forward);

    }

    private pointAtDistance(s: number): Vector3 {
        s = Scalar.Clamp(s, 0, this.totalLen);

        // Binary search to find segment
        let lo = 0, hi = this.cumLen.length - 1;
        while (lo < hi - 1) {
            const mid = (lo + hi) >> 1;
            if (this.cumLen[mid] <= s) lo = mid;
            else hi = mid;
        }

        const i = lo;
        const segD = this.segLen[i] || 1e-6;
        const t = (s - this.cumLen[i]) / segD;
        return Vector3.Lerp(this.points[i], this.points[i + 1], t);
    }

    IsDone(): boolean {
        return this.distance >= this.totalLen;
    }

    DisposeOfMesh(): void {
        this.mesh.dispose();
    }
    
    ShouldGo(lights: TrafficLight[]): boolean{
        for (const light of lights) {
            const zone = light.GetZone();
            if (this.mesh.intersectsMesh(zone, false)) {
                if (light.isRed) {
                    return false;
                }
            }
        }  
        return true;  
    }
}