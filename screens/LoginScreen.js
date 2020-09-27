import React, { useState, useEffect } from "react";
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   ActivityIndicator,
   Modal,
   YellowBox,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Svg, { Circle } from "react-native-svg";

import * as Google from "expo-google-app-auth";
import Colors from "../constants/colors";
import labels from "../constants/labels";
import { Feather } from "@expo/vector-icons";

import { firebase } from "../firebase/firebase";

import Constants from "expo-constants";

YellowBox.ignoreWarnings(["Setting a timer"]);

// Actions
import { startLogin, login } from "../store/actions/auth";

const LoginScreen = (props) => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      // Store is user is always null otherwise it won't render this Screen
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
         // detaching the listener
         if (user) {
            setIsLoading(true);
            dispatch(login(user));
         }
      });
      return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting.
   }, []);

   const signInWithGoogleAsync = async () => {
      setIsLoading(true);
      try {
         const result = await Google.logInAsync({
            behavior: "web",
            androidClientId: Constants.manifest.extra.googleAndroidClientId,
            androidStandaloneAppClientId:
               Constants.manifest.extra.googleAndroidClientId,
            scopes: ["profile", "email"],
         });
         if (result.type === "success") {
            await dispatch(startLogin(result));
            return result.accessToken;
         } else {
            setIsLoading(false);
            return { cancelled: true };
         }
      } catch (e) {
         setIsLoading(false);
         return { error: true };
      }
   };

   return (
      <View style={styles.screen}>
         <Modal
            animationType="slide"
            transparent={true}
            visible={isLoading}
            style={styles.modal}
         >
            <View style={styles.centeredView}>
               <ActivityIndicator
                  size="large"
                  color="white"
                  style={styles.loader}
               />
            </View>
         </Modal>
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
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   loader: {
      // backgroundColor: "red",
      backgroundColor: "rgba(52, 52, 52, 0.7)",
      height: "100%",
      width: "100%",
   },
});

export default LoginScreen;
