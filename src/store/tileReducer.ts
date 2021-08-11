export interface TileState  {
    number:number
}

const initialState = {
    number:0
};
type Action = {type:"ADD_Number",payload:number};


const TileReducer = (state:TileState=initialState,action:Action)=>{
    if(action.type==="ADD_Number"){
        return state.number=action.payload;
    }
    return state;
}

export default TileReducer;