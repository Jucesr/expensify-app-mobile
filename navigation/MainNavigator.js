import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ExpenseListScreen, {
   screenOptions as ExpenseListScreenOptions,
} from "../screens/ExpenseListScreen";
import ExpenseFormScreen, {
   screenOptions as ExpenseFormScreenOptions,
} from "../screens/ExpenseFormScreen";
import ExpenseFilterScreen, {
   screenOptions as ExpenseFilterScreenOptions,
} from "../screens/ExpenseFilterScreen";
import ProfileScreen, {
   screenOptions as ProfileScreenOptions,
} from "../screens/ProfileScreen";

import Colors from "../constants/colors";

import { FontAwesome } from "@expo/vector-icons";

const ExpenseStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AppNavigator = createBottomTabNavigator();

const isOS = Platform.OS === "ios";

const defaultNavOptions = {
   headerStyle: {
      backgroundColor: isOS ? "" : Colors.primary,
   },
   headerTintColor: isOS ? Colors.primary : "white",
};

const ExpenseNavigator = () => {
   return (
      <ExpenseStack.Navigator screenOptions={defaultNavOptions}>
         <ExpenseStack.Screen
            name="ExpenseList"
            component={ExpenseListScreen}
            options={ExpenseListScreenOptions}
         />
         <ExpenseStack.Screen
            name="ExpenseForm"
            component={ExpenseFormScreen}
            options={ExpenseFormScreenOptions}
         />
         <ExpenseStack.Screen
            name="ExpenseFilter"
            component={ExpenseFilterScreen}
            options={ExpenseFilterScreenOptions}
         />
      </ExpenseStack.Navigator>
   );
};

const ReportScreen = () => {
   return (
      <View>
         <Text>Texto</Text>
      </View>
   );
};
const ProfileNavigator = () => {
   return (
      <ProfileStack.Navigator screenOptions={defaultNavOptions}>
         <ExpenseStack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={ProfileScreenOptions}
         />
      </ProfileStack.Navigator>
   );
};

const MainNavigator = (props) => {
   return (
      <NavigationContainer>
         <AppNavigator.Navigator
            tabBarOptions={{
               activeTintColor: "white",
               tabStyle: {
                  backgroundColor: Colors.primary,
                  // paddingBottom: 10,
               },
               labelStyle: {
                  // fontFamily: "montserrat-bold",
                  // fontSize: 14,
               },
            }}
         >
            <AppNavigator.Screen
               name="Expenses"
               component={ExpenseNavigator}
               options={{
                  title: "GASTOS",
                  tabBarIcon: (tabInfo) => {
                     return (
                        <FontAwesome
                           name="dollar"
                           size={tabInfo.size}
                           color={tabInfo.color}
                        />
                     );
                  },
               }}
            ></AppNavigator.Screen>
            <AppNavigator.Screen
               name="Reports"
               component={ReportScreen}
               options={{
                  title: "REPORTES",
                  tabBarIcon: (tabInfo) => {
                     return (
                        <FontAwesome
                           name="bar-chart"
                           size={tabInfo.size}
                           color={tabInfo.color}
                        />
                     );
                  },
               }}
            ></AppNavigator.Screen>
            <AppNavigator.Screen
               name="Profile"
               component={ProfileNavigator}
               options={{
                  title: "PERFIL",
                  tabBarIcon: (tabInfo) => {
                     return (
                        <FontAwesome
                           name="user-circle-o"
                           size={tabInfo.size}
                           color={tabInfo.color}
                        />
                     );
                  },
               }}
            ></AppNavigator.Screen>
         </AppNavigator.Navigator>
      </NavigationContainer>
   );
};

export default MainNavigator;
