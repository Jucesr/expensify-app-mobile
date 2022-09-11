//Expenses Reducer

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [
        ...state,
        action.category
      ]
    break;

    case 'REMOVE_CATEGORY':
      return state.filter( (category) => action.id != category.id);
    break;

    case 'EDIT_CATEGORY':
      return state.map( (category) => {
        if(category.id === action.id){
          return {
            ...category,
            ...action.updates
          };
        }else{
          return category;
        }
      });
    break;

    case 'SET_CATEGORIES':
      return action.categories;
    break;

    default:
      return state;
  }
};
