import {Piece,PlayerType,PieceTypes} from '../type';

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
// type Action = {type:"ADD_Number",payload:number};

const CheckerPiecesReducer = (state:PiecesState=initialState): PiecesState => {
    return {...state, pieces:initialBoardState};
}

export default CheckerPiecesReducer;