
const defaultState = {
  locale: '',
  dictionary: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return{
        ...state,
        locale: action.locale,
        dictionary: action.dictionary
      }
    break;

    default:
      return state

  }
};

// lang.loginButton['es']
