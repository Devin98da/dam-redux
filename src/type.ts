export enum PlayerType{
    BLUE,
    RED
}

export enum PieceTypes{
    NORMAL,
    QUEEN
}

export interface Piece {
    id:string;
    image:string;
    x:number;
    y:number;
    type:PieceTypes;
    player:PlayerType;
    
}
export interface Position {
    x:number,
    y:number
}
