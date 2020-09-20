const defaultState = {
   locale: "es",
};

export default (state = defaultState, action) => {
   switch (action.type) {
      case "SET_LANGUAGE":
         return {
            ...state,
            locale: action.locale,
         };
         break;

      default:
         return state;
   }
};
