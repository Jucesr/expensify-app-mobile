import moment from "moment";
import labels from "../../constants/labels";

const categoryInitialState = Object.keys(labels.es.categories).reduce(
   (acum, key) => {
      return {
         ...acum,
         [key]: true,
      };
   },
   {}
);

const paymentMethodInitialState = Object.keys(labels.es.payment_methods).reduce(
   (acum, key) => {
      return {
         ...acum,
         [key]: true,
      };
   },
   {}
);

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
