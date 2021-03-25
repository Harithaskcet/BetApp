import {
    first,
    setPlayers,
    setSelectedPlayers,
    setBetNumber,
} from './types';

const setfirstVisit = (payload) => ({
    type: first,
    payload,
});

const setPlayerAction = (payload) => ({
    type: setPlayers,
    payload,
});

const setSelectedPlayerAction = () => ({
    type: setSelectedPlayers,
});

const setBetNumberAction = (payload) => ({
    type: setBetNumber,
    payload,
});

export {
    setfirstVisit,
    setPlayerAction,
    setSelectedPlayerAction,
    setBetNumberAction,
};