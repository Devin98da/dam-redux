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

type Action = {type:"DROP_PIECE",payload:{currentPiece:Piece,pieces:Piece[],gridX:number,gridY:number,x:number,y:number,activePiece:HTMLElement}};

const CheckerboardReducer = (state:PiecesState=initialState,action:Action) => {
    const drop = action.payload;

    switch(action.type){
        case "DROP_PIECE":
            const pieces = drop.pieces.map((p:Piece)=>{
                if(p.x===drop.gridX && p.y===drop.gridY){
                    const validMove = Referee(drop.gridX,drop.gridY,drop.x,drop.y,p.type,p.player,drop.pieces,drop.currentPiece);
                    if(validMove){
                        p.x=drop.x;
                        p.y=drop.y;
                    }else{
                        drop.activePiece.style.position='relative';
                        drop.activePiece.style.removeProperty('top');
                        drop.activePiece.style.removeProperty('left');
                    }
                }
                return p;
            })
            return {...state,pieces:pieces};

        default:
            return {...state, pieces:initialBoardState};
    }

};

export default CheckerboardReducer;
