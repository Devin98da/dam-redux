import {  PlayerType } from "../type";

export interface PrevPlayerState{
    prevPlayer:PlayerType
}

const initialPreviousPlayerState:PrevPlayerState = {
    prevPlayer:PlayerType.RED
}

type Action = {type:"CHANGE_PREVIOUS_PLAYER",payload:PlayerType}

const PreviousPlayerReducer = (state=initialPreviousPlayerState,action:Action) => {

    switch(action.type){
        case "CHANGE_PREVIOUS_PLAYER":
            if(action.payload===PlayerType.RED){
                return {...state,prevPlayer:PlayerType.RED}
                
            }else{
                return {...state,prevPlayer:PlayerType.BLUE}
            }
        default:
            return state;
    }
}

export default PreviousPlayerReducer;