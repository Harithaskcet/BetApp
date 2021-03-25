import * as R from 'ramda';

const getFirstVisit = state => R.propOr(false, 'isFirstVisit', state);
const getPlayers = state => R.propOr([], ['players'], state);
const getSelectedPlayers = state => R.propOr([], ['selectedPlayers'], state);
const getBetNumber = state => R.propOr(null, ['betNumber'], state);

const selectors = {
    getFirstVisit,
    getPlayers,
    getSelectedPlayers,
    getBetNumber,
};

export default selectors;