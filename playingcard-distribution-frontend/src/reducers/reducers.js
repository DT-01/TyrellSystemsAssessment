import {combineReducers} from 'redux';
import {GET_PLAYERHANDS, SET_PLAYERHANDS, getPlayerHands, setPlayerHands} from '../actions/actions';

const playerHandReducer = (state = {playerHandsList:[]}, action) => {
    switch(action.type){
        case GET_PLAYERHANDS:
            return {...state};
        case SET_PLAYERHANDS:
            return {...state, ...{playerHandsList: action.payload.playerHandsList}}
        default: 
            return state;
    }

}

 const rootReducer = combineReducers({
    playerHands: playerHandReducer
})
export default rootReducer;