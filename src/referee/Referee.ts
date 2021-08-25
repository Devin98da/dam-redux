import {Piece,PlayerType,PieceTypes} from '../type';


//!Can move over another checker
const CanMoveOnAnotherChecker = (x:number,y:number,boardstate:Piece[]):boolean => {
    const piece = boardstate.find(p=>p.x===x && p.y===y);
    if(piece){
        return true;
    }else{
        return false;
    }
}
//!CAn move over pieces for queen
const CheckQueenMovements = (x:number,y:number,boardState:Piece[],currentPiece:Piece)=>{
    for(let i=0;i<6;i++){
        const piece = boardState.find(p=>p.x===x+i && p.y===y-i);
        console.log("Piece",piece)
        if(piece?.player===currentPiece.player){
            return true;
        }else{
            return false;
        }
    }
   
}
const Referee = (px:number,py:number,x:number,y:number,type:PieceTypes,player:PlayerType,boardstate:Piece[],currentPiece:Piece,nearPieces:Piece[],queenPieces:Piece[]) => {
    
    if(currentPiece){
        // if(previousPlayer!==currentPiece?.player){
            const checkerDirection = (player===PlayerType.BLUE)?1:-1;
            if(type===PieceTypes.NORMAL){
                if(py<=8 && py>=0){
                    if((y-py===1*checkerDirection) && (x-px===1 || x-px===-1)){
                         if(!CanMoveOnAnotherChecker(x,y,boardstate) ){     
                            return true;
                    }
                    }else if(x-px===2 && y-py===2 && nearPieces[1]&& nearPieces[1].player!==currentPiece.player){

                        console.log("rihht attack");
    
                        if(!CanMoveOnAnotherChecker(x,y,boardstate) ){
                                return true;
                            }
                    }else if(x-px===-2 && y-py===2 && nearPieces[0]&& nearPieces[0].player!==currentPiece.player){

                        console.log("left attack");
                        if(!CanMoveOnAnotherChecker(x,y,boardstate) ){
                                return true;
                            }
                    }else if(x-px===-2 && y-py===-2 && nearPieces[2]&& nearPieces[2].player!==currentPiece.player){

                        console.log("bottom left attack");
                        if(!CanMoveOnAnotherChecker(x,y,boardstate) ){
                                return true;
                            }
                    }else if(x-px===2 && y-py===-2 && nearPieces[3]&& nearPieces[3].player!==currentPiece.player){
                        console.log("bottom right attack");
    
                        if(!CanMoveOnAnotherChecker(x,y,boardstate) ){
                                return true;
                            }
                    }
                }
                return false;
            }else{
                if(py<=8 && py>=0){
                    for(let i=1;i<8;i++){
                        // if(x > grabPosition.x && y > grabPosition.y) {
                            let topRightPassedPosition = {x:currentPiece.x+i , y:currentPiece.y+i};
                            let topRightPieces = boardstate.find(p=>(p.x===topRightPassedPosition.x && p.y===topRightPassedPosition.y))
                        
                                    // console.log("before",px,py)
                                    // console.log("after",x,y)
                                    let qPiece;
                                    if(queenPieces){
                                        //  qPiece = queenPieces.find((p:any)=>p && p.player===currentPiece.player);
                                        // console.log("Q piece",qPiece);
                                    }
                                    if((y-py===i || y-py===-i) && (x-px===i || x-px===-i)){
                                        if(!CanMoveOnAnotherChecker(x,y,boardstate)){  
                                                    return true;
                                    }
                                // }
                            }
                        // }
                    }
                }
            }
    }
}

export default Referee;

