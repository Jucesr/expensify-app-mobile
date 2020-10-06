import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import Colors from "../constants/colors";

import {
   Ionicons,
   MaterialCommunityIcons,
   MaterialIcons,
} from "@expo/vector-icons";

const ReportsScreen = (props) => {
   const { t } = useTranslation();
   useEffect(() => {
      props.navigation.setOptions({
         headerTitle: t("ReportsScreen.title"),
      });
   }, [t]);
   return (
      <View style={styles}>
         <ReportCard
            icon="md-calendar"
            title={t("ReportsScreen.byMonth")}
            onPress={() => {
               props.navigation.navigate("ReportMonthScreen");
            }}
         />
         <ReportCard
            iconType="materialComunity"
            icon="food"
            title={t("ReportsScreen.byCategory")}
            onPress={() => {
               props.navigation.navigate("ReportCategoryScreen");
            }}
         />
         <ReportCard
            iconType="material"
            icon="payment"
            title={t("ReportsScreen.byPaymentMethod")}
            onPress={() => {
               props.navigation.navigate("ReportPaymentMethodScreen");
            }}
         />
      </View>
   );
};

const ReportCard = ({
   title,
   icon,
   iconType = "ioninc",
   size = 45,
   onPress,
}) => {
   return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
         <View style={styles.reportCard}>
            <View style={styles.reportCardIconContainer}>
               {iconType === "ioninc" && (
                  <Ionicons
                     style={styles.reportCardIcon}
                     name={icon}
                     size={size}
                     color={Colors.primary}
                  />
               )}
               {iconType === "material" && (
                  <MaterialIcons
                     style={styles.reportCardIcon}
                     name={icon}
                     size={size}
                     color={Colors.primary}
                  />
               )}
               {iconType === "materialComunity" && (
                  <MaterialCommunityIcons
                     style={styles.reportCardIcon}
                     name={icon}
                     size={size}
                     color={Colors.primary}
                  />
               )}
            </View>

            <View style={styles.reportCardTitleContainer}>
               <Text style={styles.reportCardTitle}>{title}</Text>
            </View>
         </View>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   reportCard: {
      borderWidth: 2,
      borderRadius: 15,
      borderColor: Colors.borderColor,
      backgroundColor: Colors.darkGray,
      marginHorizontal: 20,
      marginVertical: 15,
      flexDirection: "row",
   },
   reportCardIconContainer: {
      padding: 15,
      minWidth: 80,
      alignItems: "center",
      justifyContent: "center",
   },
   reportCardTitleContainer: {
      flex: 1,
      justifyContent: "center",
   },
   reportCardTitle: {
      marginRight: 10,
      color: Colors.primary,
      fontFamily: "roboto-bold",
      fontSize: 18,
   },
});

export const screenOptions = (navData) => {
   return {};
};

export default ReportsScreen;
