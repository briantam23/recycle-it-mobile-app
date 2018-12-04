const TOGGLE_ON: string = 'TOGGLE_ON';
const _toggleOn = () => ({ type: TOGGLE_ON })
export const toggleOn = () => dispatch => dispatch(_toggleOn());

const TOGGLE_OFF: string = 'TOGGLE_OFF';
const _toggleOff = () => ({ type: TOGGLE_OFF });
export const toggleOff = () => dispatch => dispatch(_toggleOff());

const toggleReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_ON:
      return true;
    case TOGGLE_OFF:
      return false;
    default:
      return state;
  };
};

export default toggleReducer;
