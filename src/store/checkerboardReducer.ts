import {Piece,PlayerType,PieceTypes} from '../type';
import Referee from '../referee/Referee';

const initialBoardState:Piece[]=[];

//!RED Circles
for(let i=0;i<8;i++){
    if(i%2!==0){

        initialBoardState.push({image:'Images/red_circle.png',x:i,y:7,type:PieceTypes.NORMAL,player:PlayerType.RED,id:(i*2+'a')});
        initialBoardState.push({image:'Images/red_circle.png',x:i,y:5,type:PieceTypes.NORMAL,player:PlayerType.RED,id:(i*5+'b')});
    }
    
}
for(let i=0;i<8;i++){
    if(i%2===0){
        initialBoardState.push({image:'Images/red_circle.png',x:i,y:6,type:PieceTypes.NORMAL,player:PlayerType.RED,id:(i*6+'c')});
    }
    
}
//!Blue Circles
for(let i=0;i<8;i++){
    if(i%2===0){
        initialBoardState.push({image:'Images/blue_circle.png',x:i,y:2,type:PieceTypes.NORMAL,player:PlayerType.BLUE,id:(i*8+'d')});
        initialBoardState.push({image:'Images/blue_circle.png',x:i,y:0,type:PieceTypes.NORMAL,player:PlayerType.BLUE,id:(i*9+'e')});
    }
    
}
for(let i=0;i<8;i++){
    if(i%2!==0){
        initialBoardState.push({image:'Images/blue_circle.png',x:i,y:1,type:PieceTypes.NORMAL,player:PlayerType.BLUE,id:(i*10+'f')});
    }
    
}

export interface PiecesState{
    pieces:Piece[]
}
const initialState = {
    pieces: initialBoardState
}

interface DropAction  {type:"DROP_PIECE",payload:{currentPiece:Piece,pieces:Piece[],gridX:number,gridY:number,x:number,y:number,activePiece:HTMLElement,nearPieces:Piece[]}};
interface ResetAction {type:"RESET_PIECES"};

type Action = DropAction | ResetAction;

const CheckerboardReducer = (state:PiecesState=initialState,action:Action) => {
    let updatedPieces:Piece[]=initialBoardState;
  
    switch(action.type){
        
        case "DROP_PIECE":
            const drop = action.payload;
            const validMove = Referee(drop.gridX,drop.gridY,drop.x,drop.y,drop.currentPiece.type,drop.currentPiece.player,drop.pieces,drop.currentPiece,drop.nearPieces);
            // let updatedPieces:Piece[]=initialBoardState;
            if(validMove){
                    updatedPieces = drop.pieces.reduce((results,piece)=>{ 
                        const nearPiece = drop.nearPieces.find((ele:any)=>ele && ele.id===piece.id &&ele.player!==drop.currentPiece.player && Math.abs(drop.x-drop.currentPiece.x)!==1);
                        if(piece.x===drop.currentPiece.x && piece.y===drop.currentPiece.y ){
                            piece.x=drop.x;
                            piece.y=drop.y;
                            if((drop.currentPiece.y===7 && drop.currentPiece.player===PlayerType.BLUE) || (drop.currentPiece.y===0 && drop.currentPiece.player===PlayerType.RED) ){
                                drop.currentPiece.type=PieceTypes.QUEEN;
                                if(drop.currentPiece.player===PlayerType.BLUE){
                                    drop.currentPiece.image="Images/blue_queen.png";
                                }else{
                                    drop.currentPiece.image="Images/red_queen.png";
                                }
                            }
                        results.push(piece);
                        }
                        else if(!(nearPiece )){
                            results.push(piece);
                        }
                        return results;
                    },[] as Piece[])
            return {...state,pieces:updatedPieces};
            }else{
                drop.activePiece.style.position='relative';
                drop.activePiece.style.removeProperty('top');
                drop.activePiece.style.removeProperty('left');
                return {...state,pieces:updatedPieces};
            }
        case "RESET_PIECES":
            console.log("Reset checkerBoardReducer.tsx");

            return {...state,pieces:initialBoardState};
        default:
            return {...state};
    }
};

export default CheckerboardReducer;
