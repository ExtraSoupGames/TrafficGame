import {GameScene} from "./GameScene"
export class WarningTracker{
    private warningCount: number = 0;
    private game: GameScene;
    constructor(game: GameScene){
        this.game = game;
    }
    public RegisterWarning(){
        this.warningCount += 1;
    }
    public UnRegiserWarning(){
        this.warningCount -= 1;
        if(this.warningCount == 0){

        }
    }
    public Reset(){
        this.warningCount = 0;
    }
    public GetDesiredOpacity(): number{
        if(this.warningCount > 0){
            return 0.2;
        }
        return 0;
    }
}