import React, { useState, useEffect, useMemo } from "react";
import {
   View,
   StyleSheet,
   TextInput,
   Text,
   TouchableOpacity,
   Dimensions,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Feather as Icon } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/stack";
import moment from "moment";

import { setExpenses } from "../store/actions/expenses";
import { useSelector, useDispatch } from "react-redux";

import labels from "../constants/labels";
import HeaderButton from "../components/HeaderButton";
import ExpenseList from "../components/ExpensesList";
import Colors from "../constants/colors";
import navigation from "../constants/navigation";

import { formatValue } from "../utils/index";

const HEIGTH = {
   searchBar: {
      box: 43,
      margin: 10,
   },
   messageContainer: {
      box: 30,
   },
};

const ExpenseListScreen = (props) => {
   const headerHeight = useHeaderHeight();
   const [textFilter, setTextFilter] = useState("");
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setExpenses());
   }, []);
   let expenses = useSelector((state) => {
      const filters = state.filters;

      const expenses = state.expenses.filter((expense) => {
         let isValid = true;
         if (
            moment(expense.createdAt).isBefore(filters.startDate) ||
            moment(expense.createdAt).isAfter(filters.endDate)
         ) {
            isValid = false;
         }

         if (
            !filters.categories[expense.category] &&
            expense.category !== undefined
         ) {
            isValid = false;
         }
         if (
            !filters.paymentMethods[expense.payment_method] &&
            expense.payment_method !== undefined
         ) {
            isValid = false;
         }

         return isValid;
      });

      const sortProp = filters.sortBy === "date" ? "createdAt" : "amount";
      return expenses.sort((a, b) => (a[sortProp] < b[sortProp] ? 1 : -1));
   });

   if (textFilter.length > 0) {
      expenses = expenses.filter((exp) =>
         exp.description.toLowerCase().includes(textFilter.toLowerCase())
      );
   }

   const expenseTotal = useMemo(() => {
      return expenses.reduce((sum, expense) => sum + expense.amount, 0);
   }, [textFilter, expenses]);

   const changeTextFilterHandler = (value) => {
      setTextFilter(value);
   };

   // Calculate List Height

   const tableListHeight =
      Dimensions.get("window").height -
      headerHeight -
      HEIGTH.searchBar.box -
      HEIGTH.searchBar.margin * 2 -
      HEIGTH.messageContainer.box -
      navigation.BOTTOM_TAB_HEIGHT;

   return (
      <View style={styles.screen}>
         <View style={styles.inputContainer}>
            <View style={styles.searchSection}>
               <Icon
                  style={styles.searchIcon}
                  name="search"
                  size={20}
                  color="#000"
               />
               <TextInput
                  style={styles.input}
                  placeholder={
                     labels.es.ExpenseListScreen.searchInputPlaceholder
                  }
                  onChangeText={changeTextFilterHandler}
                  value={textFilter}
                  underlineColorAndroid="transparent"
               />
            </View>
            <TouchableOpacity
               activeOpacity={0.6}
               onPress={() => {
                  props.navigation.navigate("ExpenseFilter");
               }}
            >
               <Icon
                  style={styles.filterIcon}
                  name="filter"
                  size={24}
                  color="#000"
               />
            </TouchableOpacity>
         </View>
         {expenses.length > 0 && (
            <View style={styles.messageContainer}>
               <Text style={styles.message}>
                  Viendo <Text style={styles.bold}>{expenses.length}</Text>{" "}
                  gastos, un total de{" "}
                  <Text style={styles.bold}>
                     {formatValue("currency", expenseTotal / 100)}
                  </Text>
               </Text>
            </View>
         )}
         <ExpenseList
            height={tableListHeight}
            expenses={expenses}
            locale={"es"}
            onItemPress={(expense) => {
               props.navigation.navigate("ExpenseForm", {
                  expense: expense,
               });
            }}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
   },
   messageContainer: {
      height: HEIGTH.messageContainer.box,
      width: "95%",
   },
   message: {
      fontSize: 16,
      textAlign: "left",
   },
   bold: {
      fontWeight: "bold",
   },
   inputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: HEIGTH.searchBar.margin,
      height: HEIGTH.searchBar.box,
      width: "95%",
   },
   searchSection: {
      // flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.gray,
      borderColor: "#D2D2D2",
      borderWidth: 1,
      borderRadius: 10,
      width: "85%",
   },
   searchIcon: {
      paddingHorizontal: 10,
      paddingVertical: 5,
   },
   input: {
      flex: 1,
      paddingTop: 5,
      paddingRight: 10,
      paddingBottom: 5,
      paddingLeft: 0,
      // backgroundColor: "#fff",
      color: "#424242",
   },
   filterIcon: {
      // borderWidth: 1,
      paddingHorizontal: 10,
      marginLeft: 10,
      // width: "20%",
   },
});

export const screenOptions = (navData) => {
   return {
      headerTitle: labels.es.ExpenseListScreen.title,
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
               title="Menu"
               iconName="md-add"
               onPress={() => {
                  navData.navigation.navigate("ExpenseForm");
               }}
            />
         </HeaderButtons>
      ),
   };
};

export default ExpenseListScreen;
