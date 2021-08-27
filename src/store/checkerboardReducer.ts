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
//  //!Check quenn passed pieces
//  const CheckQueenPassedPieces = (x:number,y:number,px:number,py:number,boardstate:Piece[]) => {
//     const change = Math.abs(x-px);
//     let qPieces:Piece[]=[];
//     let a;
//     for(let i=1;i<change;i++){
//         if(x-px>0 && y-py>0){
//             a =boardstate.find((p:any)=> p.x===px+i && p.y===py+i) ;
//                 if(a){
//                     qPieces.push(a);
//                                         }
//         }else if(x-px<0 && y-py<0){
//             a =boardstate.find((p:any)=> p.x===px-i && p.y===py-i) ;
//                 if(a){
//                     qPieces.push(a);
//                 }
//         }else if(x-px<0 && y-py>0){
//             a =boardstate.find((p:any)=> p.x===px-i && p.y===py+i) ;
//                 if(a){
//                     qPieces.push(a);
//                 }
//         }else if(x-px>0 && y-py<0){
//             a =boardstate.find((p:any)=> p.x===px+i && p.y===py-i) ;
//                 if(a){
//                     qPieces.push(a);
//                 }
//         }
                                    
//     }
//     return qPieces;
// }
export interface PiecesState{
    pieces:Piece[]
}
const initialState = {
    pieces: initialBoardState
}

interface DropAction  {type:"DROP_PIECE",payload:{
    currentPiece:Piece,
    pieces:Piece[],
    gridX:number,
    gridY:number,
    x:number,
    y:number,
    activePiece:HTMLElement,
    nearPieces:Piece[],
    prevPlayer:PlayerType,
    qPieces:Piece[]
}};
interface ResetAction {type:"RESET_PIECES",payload:{pieces:Piece[]}};

type Action = DropAction | ResetAction;

const CheckerboardReducer = (state:PiecesState=initialState,action:Action) => {
    
    switch(action.type){
        case "DROP_PIECE":
            const drop = action.payload;
            // console.log("Checekrboard reducer",drop);
            // const qPieces = CheckQueenPassedPieces(drop.x,drop.y,drop.gridX,drop.gridY,drop.pieces);
            const qPieces = drop.qPieces;

            const validMove = Referee(drop.gridX,drop.gridY,drop.x,drop.y,drop.currentPiece.type,drop.currentPiece.player,drop.pieces,drop.currentPiece,drop.nearPieces,qPieces,drop.prevPlayer);
            let updatedPieces:Piece[]=initialBoardState;
            
            if(validMove){
                updatedPieces = drop.pieces.reduce((results,piece)=>{ 
                
                const queenPiece = qPieces.find((ele:any)=>ele && ele.id===piece.id && ele.player!==drop.currentPiece.player);

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
                else if(drop.currentPiece.type===PieceTypes.NORMAL){
                    if(!(queenPiece )){
                        results.push(piece);
                        }
                    }
                    else if(drop.currentPiece.type===PieceTypes.QUEEN){
                        if(!(queenPiece)){
                            results.push(piece);
                            console.log("Queen remove")
                        }
                    }
                    return results;
                },[] as Piece[])         
            }else{
                drop.activePiece.style.position='relative';
                drop.activePiece.style.removeProperty('top');
                drop.activePiece.style.removeProperty('left');
                return {...state}
            }   
            return {...state,pieces:updatedPieces};

        case "RESET_PIECES":
            let boardState:Piece[]=[];
            for(let i=0;i<8;i++){
                if(i%2!==0){
            
                    boardState.push({image:'Images/red_circle.png',x:i,y:7,type:PieceTypes.NORMAL,player:PlayerType.RED,id:(i*2+'a')});
                    boardState.push({image:'Images/red_circle.png',x:i,y:5,type:PieceTypes.NORMAL,player:PlayerType.RED,id:(i*5+'b')});
                }
                
            }
            for(let i=0;i<8;i++){
                if(i%2===0){
                    boardState.push({image:'Images/red_circle.png',x:i,y:6,type:PieceTypes.NORMAL,player:PlayerType.RED,id:(i*6+'c')});
                }
                
            }
            //!Blue Circles
            for(let i=0;i<8;i++){
                if(i%2===0){
                    boardState.push({image:'Images/blue_circle.png',x:i,y:2,type:PieceTypes.NORMAL,player:PlayerType.BLUE,id:(i*8+'d')});
                    boardState.push({image:'Images/blue_circle.png',x:i,y:0,type:PieceTypes.NORMAL,player:PlayerType.BLUE,id:(i*9+'e')});
                }
                
            }
            for(let i=0;i<8;i++){
                if(i%2!==0){
                    boardState.push({image:'Images/blue_circle.png',x:i,y:1,type:PieceTypes.NORMAL,player:PlayerType.BLUE,id:(i*10+'f')});
                }
                
            }
            return {...state,pieces:boardState};
        default:
            return {...state};
    }
};

export default CheckerboardReducer;
