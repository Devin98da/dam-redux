import React,{useRef,useState} from 'react';
import Tile from '../../tile/tile';
import { useSelector,useDispatch } from 'react-redux';
import './checkerboard.css';
import { RootState } from '../../store';
import {Piece,PlayerType,PieceTypes, Position} from '../../type';
import { HighlightsState } from '../../store/highlightsReducer';

const hori:any = ["1","2","3","4","5","6","7","8"];
const verti:any = ["a","b","c","d","e","f","g","h"];

const Checkerboard = () => {
    const pieces = useSelector<RootState,Piece[]>(state => state.checkerboard.pieces);
    const highlights = useSelector<RootState,HighlightsState["positions"]>(state => state.highlights.positions)
    
    console.log(highlights);
    const dispatch = useDispatch();


    const checkerBoardRef = useRef<HTMLDivElement>(null);
    const [gridX,setGridX] = useState(0);
    const [gridY,setGridY] = useState(0);
    // const [activePiece,setActivePiece] = useState<HTMLElement|null>(null);
       
    const currentPiece = pieces.find(p=>p.x===gridX && p.y===gridY);
    // console.log("CurrentPiece",currentPiece);
    // console.log("Pieces",pieces);

    //!Making positions highlights
    const makeHighlights = () => {
        dispatch({type:"MAKE_HIGHLIGHTS",payload:{currentPiece,pieces}});
    }

    //!Grabbing piece
    const grabPiece=(e:React.MouseEvent)=>{
        const element = e.target as HTMLElement;
        const checkerBoard = checkerBoardRef.current;

        if(element.classList.contains("piece") && checkerBoard){
       
            setGridX(Math.floor((e.clientX - checkerBoard.offsetLeft)/80));
            setGridY(Math.abs(Math.ceil((e.clientY - checkerBoard.offsetTop-640)/80)));

            const x = e.clientX-50;
            const y = e.clientY-50;
            element.style.position = "absolute";
            element.style.left=`${x}px`;
            element.style.top=`${y}px`;
            
            makeHighlights();

            // setActivePiece(element);

        }
    };
  

    const board = [];

    for(let j = verti.length-1;j>=0;j--){
        for(let i=0;i<hori.length;i++){
            const number = i+j+2;
            let image = undefined;

            for(const piece of pieces) {
                    if(piece.x===i && piece.y===j){
                        image=piece.image;
                    }
                };
                let a = false;
                if(highlights ){
                    const posiOne = highlights.find((el:any)=>el[0]===i && el[1]===j );
                    a = (posiOne )?true:false;
                }

            board.push(<Tile key={`${j},${i}`} image={image}number={number} movementsPoints={a}/>)
        }
    }
    return(
        <div id="checkerBoard" 
            onMouseDown={e=>{grabPiece(e)}}
            ref={checkerBoardRef}
        >
            {board}
        </div>
    )
}

export default Checkerboard;