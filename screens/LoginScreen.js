import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Svg, { Circle } from "react-native-svg";

import * as Google from "expo-google-app-auth";
import Colors from "../constants/colors";
import labels from "../constants/labels";
import { Feather } from "@expo/vector-icons";

// Actions
import { startLogin } from "../store/actions/auth";

const LoginScreen = (props) => {
   const dispatch = useDispatch();

   const signInWithGoogleAsync = async () => {
      try {
         const result = await Google.logInAsync({
            behavior: "web",
            androidClientId:
               "651061411468-1b0l72ckasbeo9hcfl03vh4mvs33fmsh.apps.googleusercontent.com",
            scopes: ["profile", "email"],
         });
         if (result.type === "success") {
            await dispatch(startLogin(result));
            return result.accessToken;
         } else {
            return { cancelled: true };
         }
      } catch (e) {
         return { error: true };
      }
   };

   return (
      <View style={styles.screen}>
         <View style={styles.svgContainer}>
            <Svg
               height="100%"
               width="100%"
               viewBox="0 0 100 100"
               strokeWidth={1}
               // stroke="red"
            >
               <Circle
                  cx="50"
                  cy="-45"
                  r="140"
                  // stroke="blue"
                  strokeWidth="2.5"
                  fill="#F7F7F7"
               />
            </Svg>
         </View>

         <View style={styles.container}>
            <Text style={styles.title}>Expensify</Text>
            <Text style={styles.slogan}>{labels.es.LoginScreen.slogan}</Text>
            <Button onPress={signInWithGoogleAsync}>
               {labels.es.LoginScreen.button}
            </Button>
         </View>
      </View>
   );
};

const Button = (props) => {
   return (
      <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
         <View style={styles.button}>
            <Feather name="mail" size={24} color="white" />
            <Text style={styles.buttonText}>{props.children}</Text>
         </View>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
   },
   svgContainer: {
      height: "20%",
      // borderWidth: 1,
      width: "100%",
   },
   container: {
      flex: 1,
      justifyContent: "space-between",
      paddingVertical: 40,
      alignItems: "center",
      // borderWidth: 1,
      height: "80%",
   },
   title: {
      color: Colors.primary,
      fontFamily: "roboto",
      fontWeight: "bold",
      fontSize: 30,
   },
   slogan: {
      color: Colors.primary,
      fontFamily: "montserrat",
      fontSize: 16,
      paddingHorizontal: 40,
      textAlign: "center",
   },
   button: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: Colors.red,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 10,
      width: "80%",
   },
   buttonText: {
      color: "white",
      fontSize: 18,
   },
});

export default LoginScreen;
