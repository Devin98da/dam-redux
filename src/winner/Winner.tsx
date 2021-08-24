import { RootState } from '../store';
import { WinnerState } from '../store/winner';
import { useSelector,useDispatch } from 'react-redux';
import "./Winner.css";
import { Piece } from '../type';




const Winner = () => {

const dispatch =useDispatch();
const pieces = useSelector<RootState,Piece[]>(state => state.checkerboard.pieces);

const onClickHandeler = () => {
    dispatch({type:"RESET_PIECES",payload:{pieces:pieces}});
    dispatch({type:"RESET_WINNER"});
}

    const winner = useSelector<RootState,WinnerState>(state => state.winner);
    return (
        <div className="winner">
            <h4>Winner is <span>{winner.winner}</span></h4>
            <button onClick={onClickHandeler}>{winner.winner===""?"Reset":"Play Again"}</button>
        </div>
    )
}

export default Winner
