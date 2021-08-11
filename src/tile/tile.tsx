import React from 'react'
import './tile.css';
// import { useSelector,useDispatch } from 'react-redux';
// import { TileState } from '../store/tileReducer';

interface Props {
    image?: string;
    number: number;

  }
  
  const Tile=({ number, image, }: Props)=> {
    // const name = useSelector<TileState,TileState["number"]>(state => state.number)
    // const dispatch = useDispatch();

    if (number % 2 === 0) {
      return (
        <div className={`tile black-tile `}>
            {image && <div style={{backgroundImage: `url(${image})`}} className="piece" ></div>}
        </div>
      );
    } else {
      return (
        <div className="tile white-tile">
              {image && <div style={{backgroundImage: `url(${image})`}} className="piece"></div>}
  
        </div>
      );
    }
  }
  export default Tile;
