import {  PlayerType,Piece } from "../type";

export interface PrevPlayerState{
    prevPlayer:PlayerType|null
}

const initialPreviousPlayerState:PrevPlayerState = {
    prevPlayer:null
}

type Action = {type:"CHANGE_PREVIOUS_PLAYER",payload:{currentPiece:Piece,gridX:number,qPieces:Piece[]}}

const PreviousPlayerReducer = (state=initialPreviousPlayerState,action:Action) => {
    switch(action.type){
        case "CHANGE_PREVIOUS_PLAYER":
            console.log("PrevReducer passed pieces",action.payload.qPieces)
            let dif = Math.abs(action.payload.currentPiece.x-action.payload.gridX);
            if(dif===1){
                if(action.payload.currentPiece.player===PlayerType.BLUE){
                    return {...state,prevPlayer:PlayerType.BLUE}
                    
                }else{
                    return {...state,prevPlayer:PlayerType.RED}
                }
                
            }
            // else if(action.payload.qPieces.length===1){
            //     return {...state}
                
            // }
            else if(action.payload.qPieces.length===0){
                if(action.payload.currentPiece.player===PlayerType.BLUE){
                    return {...state,prevPlayer:PlayerType.BLUE}
                    
                }else{
                    return {...state,prevPlayer:PlayerType.RED}
                }
            }
            return state;
        default:
            return state;
    }
}

export default PreviousPlayerReducer;