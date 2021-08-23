import { Piece,PlayerType } from "../type";

export interface WinnerState {
    winner:string
}
const InitialWinnerState = {
    winner:''
}
type Action = {type:"CHOOSE_WINNER",payload:{pieces:Piece[]}}

const WinnerReducer = (state:WinnerState=InitialWinnerState,action:Action) => {
    
    let winner:string='';
    switch(action.type){
        case "CHOOSE_WINNER":
            if(action.payload.pieces){
                const blues = action.payload.pieces.filter((p:any)=>p.player===PlayerType.BLUE);
                const reds = action.payload.pieces.filter((p:any)=>p.player===PlayerType.RED);
                if(blues.length===0){
                    console.log("Red player won");
                    winner="Red"
                }else if(reds.length===0){
                    console.log("Blue player won");
                    winner="Blue";
                }
            }
        return {...state,winner:winner}  

        default:
            return state;
    }
}

export default WinnerReducer
