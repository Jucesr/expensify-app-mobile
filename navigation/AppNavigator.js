import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";

const AppNavigator = (props) => {
   const isAuth = useSelector((state) => !!state.auth.uid);
   return (
      <NavigationContainer>
         {isAuth ? <MainNavigator /> : <LoginScreen />}
      </NavigationContainer>
   );
};

const styles = StyleSheet.create({});

export default AppNavigator;
