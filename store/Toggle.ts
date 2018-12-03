const TOGGLE_ON: string = 'TOGGLE_ON';
const _toggleOn = () => ({ type: TOGGLE_ON })
export const toggleOn = () => dispatch => dispatch(_toggleOn());

const toggleReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_ON:
      return true
    default:
      return state;
  };
};

export default toggleReducer;
