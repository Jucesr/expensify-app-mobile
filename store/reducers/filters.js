import moment from "moment";
import categories from "../../constants/categories";
import paymentMethods from "../../constants/paymentMethods";

const categoryInitialState = categories.reduce((acum, key) => {
   return {
      ...acum,
      [key]: true,
   };
}, {});

const paymentMethodInitialState = paymentMethods.reduce((acum, key) => {
   return {
      ...acum,
      [key]: true,
   };
}, {});

const filterReducerDefaultState = {
   sortBy: "date",
   startDate: moment().startOf("month"),
   endDate: moment().endOf("month"),
   categories: categoryInitialState,
   paymentMethods: paymentMethodInitialState,
};

export default (state = filterReducerDefaultState, action) => {
   switch (action.type) {
      case "SET_FILTERS":
         return action.filters;

      default:
         return state;
   }
};
