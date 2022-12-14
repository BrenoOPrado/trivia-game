import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  questions: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actionTypes.PLAY:
    return ({
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
      assertions: 0,
      score: 0,
    });
  case actionTypes.ADD_SCORE:
    return ({
      ...state,
      score: state.score + action.score,
    });
  case actionTypes.ADD_ASSERTIONS:
    return ({
      ...state,
      assertions: state.assertions + 1,
    });
  default:
    return state;
  }
};

export default player;
