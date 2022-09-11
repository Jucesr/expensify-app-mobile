//Expenses Reducer

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [
        ...state,
        action.card
      ]
    break;

    case 'REMOVE_CARD':
      return state.filter( (card) => action.id != card.id);
    break;

    case 'EDIT_CARD':
      return state.map( (card) => {
        if(card.id === action.id){
          return {
            ...card,
            ...action.updates
          };
        }else{
          return card;
        }
      });
    break;

    case 'SET_CARDS':
      return action.cards;
    break;

    default:
      return state;
  }
};
