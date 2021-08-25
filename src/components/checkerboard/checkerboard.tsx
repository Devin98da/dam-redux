import React,{useRef,useState} from 'react';
import Tile from '../../tile/tile';
import { useSelector,useDispatch } from 'react-redux';
import './checkerboard.css';
import { RootState } from '../../store';
import {Piece,PlayerType,PieceTypes, Position} from '../../type';
import { HighlightsState } from '../../store/highlightsReducer';
import { PiecesState } from '../../store/checkerboardReducer';
import { WinnerState } from '../../store/winner';
import Referee from '../../referee/Referee';

const hori:any = ["1","2","3","4","5","6","7","8"];
const verti:any = ["a","b","c","d","e","f","g","h"];

const Checkerboard = () => {
    const pieces = useSelector<RootState,Piece[]>(state => state.checkerboard.pieces);
    const highlights = useSelector<RootState,HighlightsState["positions"]>(state => state.highlights.positions);
    const winner = useSelector<RootState,WinnerState>(state => state.winner);
    // console.log(winner);
    // console.log(pieces);
    const dispatch = useDispatch();

    const checkerBoardRef = useRef<HTMLDivElement>(null);
    const [gridX,setGridX] = useState<number|null>(null);
    const [gridY,setGridY] = useState<number|null>(null);
    const [nearPieces,setNearPieces] = useState<any>([]);
    const [queenPieces,setQueenPieces] = useState<any>([]);

    const [activePiece,setActivePiece] = useState<HTMLElement|null>(null);
    //!Checke near pieces
    const NearPieces = (currentPiece:Piece) => {
        const checkerDirection = (currentPiece?.player===PlayerType.BLUE)?1:-1;
    
        const fPieces = [[-1,1],[1,1],[-1,-1],[1,-1]];
        let nearPiecesPositions:any = [];
        let a:number[];
        let nPieces = [];
        let p;
        for(let i=0;i<4;i++){
                if(currentPiece){
                a = [fPieces[i][0]+currentPiece.x,fPieces[i][1]+currentPiece.y];
                nearPiecesPositions.push(a);
                p = pieces.find(p=>p.x===nearPiecesPositions[i][0] && p.y===nearPiecesPositions[i][1]);
                nPieces.push(p);
                }
            }
        // console.log("Near Pieces",nPieces);
        if(nPieces){
            setNearPieces(nPieces);
        }

        const qPieces = [
            [1,1],[2,2],[3,3],[4,4],[5,5],[6,6],
            [-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],
            [-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],
            [1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6]

        ];
        let nearQueenPositions:any = [];
        let b:number[];
        let queenPieces = [];
        let piece;
        if(currentPiece.type===PieceTypes.QUEEN){
            for(let i=0;i<qPieces.length;i++){
                if(currentPiece){
                    b = [qPieces[i][0]+currentPiece.x,qPieces[i][1]+currentPiece.y];
                    
                    nearQueenPositions.push(b);
                    piece= pieces.find(p=>p.x===nearQueenPositions[i][0] && p.y===nearQueenPositions[i][1]);
                    // if(piece){
                        queenPieces.push(piece);
                    // }
                }
            }
            console.log("Queen Pieces positions,",nearQueenPositions);
            console.log("Queen Pieces ,",queenPieces);
            if(queenPieces){
                setQueenPieces(queenPieces);
            }
        }
    }
    //!Making positions highlights
    const makeHighlights = (gridX:number,gridY:number) => {
        const currentPiece = pieces.find(p=>p.x===gridX && p.y===gridY);
        dispatch({type:"MAKE_HIGHLIGHTS",payload:{currentPiece,pieces,nearPieces}});
        if(currentPiece){
            NearPieces(currentPiece);
        }
    }
    //!Grabbing piece
    const grabPiece=(e:React.MouseEvent)=>{
        const element = e.target as HTMLElement;
        const checkerBoard = checkerBoardRef.current;

        if(element.classList.contains("piece") && checkerBoard){
            const gridX=(Math.floor((e.clientX - checkerBoard.offsetLeft)/80));
            const  gridY = (Math.abs(Math.ceil((e.clientY - checkerBoard.offsetTop-640)/80)));
            setGridX(gridX);
            setGridY(gridY);
            const x = e.clientX-50;
            const y = e.clientY-50;
            element.style.position = "absolute";
            element.style.left=`${x}px`;
            element.style.top=`${y}px`;
            
            makeHighlights(gridX,gridY);
            setActivePiece(element);

        }
    };

  //!Moving a Piece
    const movePiece=(e:React.MouseEvent)=>{
    const checkerBoard = checkerBoardRef.current;

        if(activePiece && checkerBoard){
            const minX = checkerBoard.offsetLeft;
            const minY = checkerBoard.offsetTop;
            const maxX = checkerBoard.offsetLeft + checkerBoard.clientWidth - 75;
            const maxY = checkerBoard.offsetTop + checkerBoard.clientHeight - 75;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = "absolute";
       
            if(x<minX){
                activePiece.style.left=`${minX}px`;
            }else if(x>maxX){
                activePiece.style.left=`${maxX}px`;
            }else{
                activePiece.style.left=`${x}px`;
            }

            if(y<minY){
                activePiece.style.top=`${minY}px`;
            }else if(y>maxY){
                activePiece.style.top=`${maxY}px`;
            }else{
                activePiece.style.top=`${y}px`;
            }
        }
    }
    //!Dropping piece
    const dropPiece = (e:React.MouseEvent) => {
        const checkerBoard = checkerBoardRef.current;
    
        const currentPiece = pieces.find(p=>p.x===gridX && p.y===gridY);
        if(activePiece && checkerBoard ){
            const x = Math.floor((e.clientX - checkerBoard.offsetLeft)/80);
            const y = Math.abs(Math.ceil((e.clientY - checkerBoard.offsetTop-640)/80));
            

            if(currentPiece?.x===x){
                activePiece.style.position='relative';
                activePiece.style.removeProperty('top');
                activePiece.style.removeProperty('left');
            }else{
                dispatch({type:"DROP_PIECE",payload:{currentPiece,pieces,gridX,gridY,x,y,activePiece,nearPieces,queenPieces}})
            }
            // dispatch({type:"DROP_PIECE",payload:{currentPiece,pieces,gridX,gridY,x,y,activePiece,nearPieces}})
            dispatch({type:"CHOOSE_WINNER",payload:{pieces:pieces}});
        }
        setActivePiece(null);
    }
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
                const exPiece = pieces.find(p=>p.x===i && p.y===j);
                if(exPiece  ){
                    a=false;
                }
                
            board.push(<Tile key={`${j},${i}`} image={image} number={number} movementsPoints={a}/>)
        }
    }
    return(
        <div id="checkerBoard" 
            onMouseDown={e=>grabPiece(e)}
            onMouseMove={e=>movePiece(e)} 
            onMouseUp = {e=>dropPiece(e)}
            ref={checkerBoardRef}
        >
            {board}
        </div>
    )
}

export default Checkerboard;