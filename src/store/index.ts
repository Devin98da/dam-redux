import {combineReducers} from 'redux';
import CheckerPiecesReducer from './checkerboardReducer';
import HighlightsReducer from './highlightsReducer';
import PreviousPlayerReducer from './previouPlayerReducer';
import WinnerReducer from './winner';


const reducer = combineReducers({
    checkerboard:CheckerPiecesReducer,
    highlights:HighlightsReducer,
    winner:WinnerReducer,
    previousPlayer:PreviousPlayerReducer
});

export default reducer;

export type RootState = ReturnType<typeof reducer>