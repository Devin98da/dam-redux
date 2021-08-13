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

const Referee = (px:number,py:number,x:number,y:number,type:PieceTypes,player:PlayerType,boardstate:Piece[],currentPiece:Piece) => {
    
    if(currentPiece){
        // if(previousPlayer!==currentPiece?.player){
            const checkerDirection = (player===PlayerType.BLUE)?1:-1;
            if(type===PieceTypes.NORMAL){
                if(py<=8 && py>=0){
                    if((y-py===1*checkerDirection) && (x-px===1 || x-px===-1)){
                         if(!CanMoveOnAnotherChecker(x,y,boardstate) ){     
                            return true;
                    }
                    // }else if(x-px===2 && y-py===2 && topRightAttack){
                    }else if(x-px===2 && y-py===2 ){

                        console.log("rihht attack");
    
                        if(!CanMoveOnAnotherChecker(x,y,boardstate) ){
                                // setTopRightAttack(false);
                                // setPreviousPlayer(null);
                                return true;
                            }
                    // }else if(x-px===-2 && y-py===2 && topLefttAttack){
                    }else if(x-px===-2 && y-py===2 ){

                        console.log("left attack");
                        if(!CanMoveOnAnotherChecker(x,y,boardstate) ){
                                // setTopLeftAttack(false);
                                return true;
                            }
                    // }else if(x-px===-2 && y-py===-2 && bottomLeftAttack){
                    }else if(x-px===-2 && y-py===-2 ){

                        console.log("bottom left attack");
                        if(!CanMoveOnAnotherChecker(x,y,boardstate) ){
                                // setBottomLeftAttack(false);
                                return true;
                            }
                    // }else if(x-px===2 && y-py===-2 && bottomRightAttack){
                    }else if(x-px===2 && y-py===-2 ){

                        console.log("bottom right attack");
    
                        if(!CanMoveOnAnotherChecker(x,y,boardstate) ){
                                // setBottomRightAttack(false);
                                return true;
                            }
                    }
                }
                return false;
            }
    }
}

export default Referee;