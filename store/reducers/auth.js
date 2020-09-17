export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        displayName: action.displayName,
        photoURL: action.photoURL
      };
    break;

    case 'LOGOUT':
      return {};
    break;
    default:
      return state;
  }
};
