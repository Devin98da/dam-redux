import {Piece,PlayerType,PieceTypes} from '../type';

const initialBoardState:Piece[]=[];

//!RED Circles
for(let i=0;i<8;i++){
    if(i%2!==0){
        initialBoardState.push({image:'Assets/Images/red_circle.png',x:i,y:7,type:PieceTypes.NORMAL,player:PlayerType.RED,id:(i*2+'a')});
        initialBoardState.push({image:'Assets/Images/red_circle.png',x:i,y:5,type:PieceTypes.NORMAL,player:PlayerType.RED,id:(i*5+'b')});
    }
    
}
for(let i=0;i<8;i++){
    if(i%2===0){
        initialBoardState.push({image:'Assets/Images/red_circle.png',x:i,y:6,type:PieceTypes.NORMAL,player:PlayerType.RED,id:(i*6+'c')});
    }
    
}
//!Blue Circles
for(let i=0;i<8;i++){
    if(i%2===0){
        initialBoardState.push({image:'Assets/Images/blue_circle.png',x:i,y:2,type:PieceTypes.NORMAL,player:PlayerType.BLUE,id:(i*8+'d')});
        initialBoardState.push({image:'Assets/Images/blue_circle.png',x:i,y:0,type:PieceTypes.NORMAL,player:PlayerType.BLUE,id:(i*9+'e')});

    }
    
}
for(let i=0;i<8;i++){
    if(i%2!==0){
        initialBoardState.push({image:'Assets/Images/blue_circle.png',x:i,y:1,type:PieceTypes.NORMAL,player:PlayerType.BLUE,id:(i*10+'f')});
    }
    
}

export interface CheckerboardState{
    pieces:Piece[]
}
const initialState = {
    pieces:[]
}
// type Action = {type:"ADD_Number",payload:number};

const CheckerboardReducer = (state:CheckerboardState=initialState) => {
    return state.pieces=initialBoardState;
};

export default CheckerboardReducer;