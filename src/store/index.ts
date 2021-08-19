import {combineReducers} from 'redux';
import CheckerPiecesReducer from './checkerboardReducer';
import HighlightsReducer from './highlightsReducer';
import WinnerReducer from './winner';


const reducer = combineReducers({
    checkerboard:CheckerPiecesReducer,
    highlights:HighlightsReducer,
    winner:WinnerReducer
});

export default reducer;

export type RootState = ReturnType<typeof reducer>