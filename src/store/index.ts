import {combineReducers} from 'redux';
import CheckerboardReducer from './checkerboardReducer';
import TileReducer from './tileReducer';

const reducer = combineReducers({
    tile:TileReducer,
    checkerboard:CheckerboardReducer
});

export default reducer;