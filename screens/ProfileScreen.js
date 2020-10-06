import React, { useState, useMemo, useEffect } from "react";
import {
   View,
   Text,
   StyleSheet,
   Image,
   Button,
   TouchableOpacity,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { startLogout } from "../store/actions/auth";
import { setLanguage } from "../store/actions/lang";

import Colors from "../constants/colors";
import InputField from "../components/InputField";
import { formatValue } from "../utils";
import languages from "../constants/languages";

const ProfileScreen = (props) => {
   const user = useSelector((state) => state.auth);
   const expenses = useSelector((state) => state.expenses);
   const dispatch = useDispatch();
   const { t } = useTranslation();

   const locale = useSelector((state) => state.lang.locale);

   const expenseTotal = useMemo(() => {
      return expenses.reduce((sum, expense) => sum + expense.amount, 0);
   }, [expenses]);

   const signOutHandler = () => {
      dispatch(startLogout());
   };

   useEffect(() => {
      props.navigation.setOptions({
         headerTitle: t("ProfileScreen.title"),
      });
   }, [t]);

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
                        {t("ProfileScreen.signOut")}
                     </Text>
                  </View>
               </TouchableOpacity>
            </View>
         </View>
         <View style={styles.boxContainer}>
            <View style={styles.box}>
               <Text style={styles.boxTitle}>
                  {formatValue("currency", expenseTotal / 100)}
               </Text>
               <Text style={styles.boxContent}>
                  {t("ProfileScreen.expenseTotalMessage")}
               </Text>
            </View>
            <View style={styles.box}>
               <Text style={styles.boxTitle}>{expenses.length}</Text>
               <Text style={styles.boxContent}>
                  {t("ProfileScreen.expenseCountMessage")}
               </Text>
            </View>
         </View>
         <View>
            <InputField
               label={t("ProfileScreen.inputText")}
               type="select"
               options={languages.map((lan) => ({
                  label: t(`languages.${lan}`),
                  value: lan,
               }))}
               value={locale}
               onChangeText={(value) => {
                  dispatch(setLanguage(value));
               }}
            />
         </View>
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
      backgroundColor: Colors.darkGray,
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
   boxContainer: {
      flexDirection: "row",
   },
   box: {
      borderWidth: 1,
      borderColor: Colors.borderColor,
      flex: 1,
      padding: 20,
   },
   boxTitle: {
      fontFamily: "roboto-bold",
      color: Colors.primary,
      fontSize: 18,
      textAlign: "center",
   },
   boxContent: {
      fontFamily: "roboto",
      color: Colors.grayBorder,
      fontWeight: "bold",
      textAlign: "center",
   },
});

export const screenOptions = (navData) => {
   return {};
};

export default ProfileScreen;
