import React, { useState, useEffect } from "react";
import {
   View,
   Text,
   StyleSheet,
   Image,
   Button,
   TouchableOpacity,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { startLogout } from "../store/actions/auth";

import labels from "../constants/labels";
import Colors from "../constants/colors";

const ProfileScreen = (props) => {
   const user = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   const signOutHandler = () => {
      dispatch(startLogout());
   };

   return (
      <View style={styles}>
         <View style={styles.userInfoContainer}>
            <Image
               source={{
                  uri: user.photoURL,
               }}
               style={styles.image}
            />
            <View style={styles.usernameContainer}>
               <Text style={styles.username}>{user.displayName}</Text>

               <TouchableOpacity activeOpacity={0.6} onPress={signOutHandler}>
                  <View style={styles.button}>
                     <Text style={styles.buttonText}>
                        {labels.es.ProfileScreen.signOut}
                     </Text>
                  </View>
               </TouchableOpacity>
            </View>
         </View>
         <View></View>
      </View>
   );
};

const styles = StyleSheet.create({
   image: {
      width: 100,
      height: 100,
   },
   button: {
      backgroundColor: Colors.blue,
      color: "white",
      borderRadius: 7,
      alignItems: "center",
   },
   buttonText: {
      color: "white",
      fontWeight: "bold",
   },
   userInfoContainer: {
      flexDirection: "row",
      backgroundColor: Colors.gray,
      padding: 30,
   },
   usernameContainer: {
      // borderWidth: 1,
      marginLeft: 20,
      paddingVertical: 20,
      justifyContent: "space-around",
   },
   username: {
      fontFamily: "roboto",
      color: Colors.primary,
      fontSize: 20,
      // fontWeight: "bold",
   },
});

export const screenOptions = (navData) => {
   return {
      headerTitle: labels.es.ProfileScreen.title,
   };
};

export default ProfileScreen;
