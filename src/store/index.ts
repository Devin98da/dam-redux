import {combineReducers} from 'redux';
import CheckerboardReducer from './checkerboardReducer';

const reducer = combineReducers({
    checkerboard:CheckerboardReducer
});

export default reducer;

export type RootState = ReturnType<typeof reducer>