import {
    setfirstVisit,
    setPlayerAction,
    setSelectedPlayerAction,
    setBetNumberAction,
} from './actions'

const setFirstVisitOperation = dispatch => (payload) => {
    dispatch(setfirstVisit(payload));
};

const setPlayers = dispatch => () => {
    dispatch(setPlayerAction());
};

const setSelectedPlayers = dispatch => payload => {
    dispatch(setSelectedPlayerAction(payload));
};

const setBetNumber = dispatch => payload => {
    dispatch(setBetNumberAction(payload));
};
const operations = {
    setFirstVisitOperation,
    setPlayers,
    setSelectedPlayers,
    setBetNumber
};

export default operations;