import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import labels from "../constants/labels";
const ExpenseFilterScreen = (props) => {
   return (
      <View style={styles}>
         <Text>ExpenseFilterScreen</Text>
      </View>
   );
};

const styles = StyleSheet.create({});

export const screenOptions = (navData) => {
   return {
      headerTitle: labels.es.ExpenseFilterScreen.title,
   };
};

export default ExpenseFilterScreen;
