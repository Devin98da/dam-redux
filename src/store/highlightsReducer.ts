import {Piece,PieceTypes,PlayerType, Position} from '../type';

export interface HighlightsState{
    // currentPiece:Piece|null;
    positions:Position[];
    // pieces:Piece[]
}
const initialHighlightsState = {
    positions:[]
}

interface MakeHighlightsAction  {
    type:"MAKE_HIGHLIGHTS",
    payload:{currentPiece:Piece,pieces:Piece[],nearPieces:Piece[]}
};
interface RemoveHighlightsAction {
    type:"REMOVE_HIGHLIGHTS",
    
};
type Action = MakeHighlightsAction|RemoveHighlightsAction;

const HighlightsReducer = (state:HighlightsState=initialHighlightsState,action:Action) => {
    
    switch(action.type){
        case "MAKE_HIGHLIGHTS":
            let grabPiece = action.payload.currentPiece;
            let  movingPositions :any=[]; 
            
            if(grabPiece && action.payload.currentPiece.type===PieceTypes.NORMAL){
                const checkerDirection = (grabPiece?.player===PlayerType.BLUE)?1:-1;
                const mPositions = [[-2,2],[2,2],[-2,-2],[2,-2],[-1,checkerDirection],[1,checkerDirection]];   
            
                for(let i=0;i<mPositions.length;i++){
                let  a:number[] = [mPositions[i][0]+grabPiece.x,mPositions[i][1]+grabPiece.y];
                    // const opoPiece = action.payload.pieces.find((p:any)=>{
                    // if(action.payload.nearPieces[i] ){
                        movingPositions.push(a);
                    // }
                    // })
                    
                }
            }else if(grabPiece && action.payload.currentPiece.type===PieceTypes.QUEEN){
                for(let i=1;i<8;i++){
                    let  a:number[] = [grabPiece.x+i,grabPiece.y+i];
                    let  b:number[] = [grabPiece.x-i,grabPiece.y-i];
                    let  c:number[] = [grabPiece.x+i,grabPiece.y-i];
                    let  d:number[] = [grabPiece.x-i,grabPiece.y+i];

                    movingPositions.push(a,b,c,d);

                }
            }
            
            return {...state,positions:movingPositions}  
        case "REMOVE_HIGHLIGHTS":
            console.log(state)
            return {...state,position:[]}
        default:
            return state;
    }
}

export default HighlightsReducer;