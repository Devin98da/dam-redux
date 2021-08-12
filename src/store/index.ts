import {combineReducers} from 'redux';
import CheckerPiecesReducer from './checkerboardReducer';
import HighlightsReducer from './highlightsReducer';


const reducer = combineReducers({
    checkerboard:CheckerPiecesReducer,
    highlights:HighlightsReducer
});

export default reducer;

export type RootState = ReturnType<typeof reducer>