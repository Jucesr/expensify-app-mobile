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
import ReportScreen, {
   screenOptions as ReportsScreenOptions,
} from "../screens/ReportsScreen";
import ReportMonthScreen, {
   screenOptions as ReportMonthScreenOptions,
} from "../screens/ReportMonthScreen";
import ReportCategoryScreen, {
   screenOptions as ReportCategoryScreenOptions,
} from "../screens/ReportCategoryScreen";
import ReportPaymentMethodScreen, {
   screenOptions as ReportPaymentMethodScreenOptions,
} from "../screens/ReportPaymentMethodScreen";

import Colors from "../constants/colors";

import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const ExpenseStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ReportStack = createStackNavigator();
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

const ReportNavigator = () => {
   return (
      <ReportStack.Navigator screenOptions={defaultNavOptions}>
         <ReportStack.Screen
            name="ReportsScreen"
            component={ReportScreen}
            options={ReportsScreenOptions}
         />
         <ReportStack.Screen
            name="ReportMonthScreen"
            component={ReportMonthScreen}
            options={ReportMonthScreenOptions}
         />
         <ReportStack.Screen
            name="ReportCategoryScreen"
            component={ReportCategoryScreen}
            options={ReportCategoryScreenOptions}
         />
         <ReportStack.Screen
            name="ReportPaymentMethodScreen"
            component={ReportPaymentMethodScreen}
            options={ReportPaymentMethodScreenOptions}
         />
      </ReportStack.Navigator>
   );
};
const ProfileNavigator = () => {
   return (
      <ProfileStack.Navigator screenOptions={defaultNavOptions}>
         <ProfileStack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={ProfileScreenOptions}
         />
      </ProfileStack.Navigator>
   );
};

const MainNavigator = (props) => {
   const { t } = useTranslation();
   return (
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
               title: t("Tabs.expenses"),
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
            component={ReportNavigator}
            options={{
               title: t("Tabs.reports"),
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
               title: t("Tabs.profile"),
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
   );
};

export default MainNavigator;
