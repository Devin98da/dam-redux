import {Piece,PlayerType, Position} from '../type';

export interface HighlightsState{
    // currentPiece:Piece|null;
    positions:Position[];
    // pieces:Piece[]
}
const initialHighlightsState = {
    positions:[]
}


type Action = {type:"MAKE_HIGHLIGHTS",payload:{currentPiece:Piece,pieces:Piece[]}}

const HighlightsReducer = (state:HighlightsState=initialHighlightsState,action:Action) => {
    
    switch(action.type){
        case "MAKE_HIGHLIGHTS":
            let grabPiece = action.payload.currentPiece;
            let  movingPositions :any=[]; 
            if(grabPiece){
                const checkerDirection = (grabPiece?.player===PlayerType.BLUE)?1:-1;
                const mPositions = [[-2,2],[2,2],[-2,-2],[2,-2],[-1,checkerDirection],[1,checkerDirection]];   
            
                for(let i=0;i<mPositions.length;i++){
                let  a:number[] = [mPositions[i][0]+grabPiece.x,mPositions[i][1]+grabPiece.y];
                    // const opoPiece = action.payload.pieces.find((p:any)=>{
                        
                    // })
                    
                    movingPositions.push(a);
                }
            }
            
            return {...state,positions:movingPositions}            
        default:
            return state;
    }
}

export default HighlightsReducer;