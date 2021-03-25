
import {
    first,
    setPlayers,
    setBetNumber,
    setSelectedPlayers,
    setPlayersList,
} from './types';

const reducer = (state={}, action) => {
    switch(action.type) {
        case first:  { 
            return { ...state, isFirstVisit:  true } ;
        }
        case setPlayersList: {
            return {
                ...state,
                players: action.payload,
            };
        }
        case setBetNumber: {
            return {
                ...state,
                betNumber: action.payload,
            };
        }
        case setSelectedPlayers: {
            return {
                ...state,
                selectedPlayers: action.payload,
            };
        }
        default: return state;
    }
}

export default reducer;