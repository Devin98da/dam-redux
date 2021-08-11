import Tile from '../../tile/tile';
import { useSelector,useDispatch } from 'react-redux';
import './checkerboard.css';
import { CheckerboardState } from '../../store/checkerboardReducer';

const hori:any = ["1","2","3","4","5","6","7","8"];
const verti:any = ["a","b","c","d","e","f","g","h"];

const Checkerboard = () => {

    const pieces = useSelector<CheckerboardState,CheckerboardState["pieces"]>(state => state.pieces)
    console.log(pieces);
    const board = [];

    for(let j = verti.length-1;j>=0;j--){
        for(let i=0;i<hori.length;i++){
            const number = i+j+2;
            let image = undefined;

            if(pieces){
                pieces.forEach(piece => {
                    if(piece.x===i && piece.y===j){
                        image=piece.image;
                    }
                });
            }
            board.push(<Tile key={`${j},${i}`} image={image}number={number} />)
        }
    }
    return(
        <div id="checkerBoard" >
            {board}
        </div>
    )
}

export default Checkerboard;