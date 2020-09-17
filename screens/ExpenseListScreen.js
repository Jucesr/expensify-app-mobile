import React, { useState, useEffect } from "react";
import {
   View,
   StyleSheet,
   TextInput,
   Text,
   TouchableOpacity,
   Button,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Feather as Icon } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import labels from "../constants/labels";
import HeaderButton from "../components/HeaderButton";
import ExpenseList from "../components/ExpensesList";
import Colors from "../constants/colors";

const ExpenseListScreen = (props) => {
   const [textFilter, setTextFilter] = useState("");
   let expenses = useSelector((state) => state.expenses).sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
   );

   if (textFilter.length > 0) {
      expenses = expenses.filter((exp) =>
         exp.description.toLowerCase().includes(textFilter.toLowerCase())
      );
   }
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
                  onChangeText={(value) => setTextFilter(value)}
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
         <ExpenseList
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
   inputContainer: {
      // borderWidth: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      width: "90%",
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
      width: "80%",
   },
   searchIcon: {
      padding: 10,
   },
   input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      // backgroundColor: "#fff",
      color: "#424242",
   },
   filterIcon: {
      // borderWidth: 1,
      padding: 10,
      marginLeft: 10,
   },
   button: {
      marginTop: 10,
      width: "95%",
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
