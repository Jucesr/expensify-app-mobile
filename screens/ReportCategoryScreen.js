import React, { useState, useEffect, useMemo } from "react";
import {
   ScrollView,
   View,
   Text,
   StyleSheet,
   Modal,
   TouchableHighlight,
   Dimensions,
} from "react-native";

import labels from "../constants/labels";
import Colors from "../constants/colors";
import moment from "moment";

import PieChart from "../components/PieChart";
import InputField from "../components/InputField";
import FilterButton from "../components/FilterButton";

import { useSelector } from "react-redux";

const ReportCategoryScreen = (props) => {
   const [filterActive, setFilterActive] = useState("all");
   const [modalVisible, setModalVisible] = useState(false);
   const [title, setTitle] = useState("Todo");
   const [startDate, setStartDate] = useState();
   const [endDate, setEndDate] = useState();

   const locale = useSelector((state) => state.lang.locale);
   const expenses = useSelector((state) => state.expenses);
   const dictonary = labels[locale].ReportCategoryScreen;

   useEffect(() => {
      props.navigation.setOptions({
         headerTitle: dictonary.title,
      });
   }, [locale]);

   useEffect(() => {
      if (filterActive === "all") {
         setStartDate();
         setEndDate();
      } else {
         const [unitOfTime, times] = filterActive.split(".");
         if (unitOfTime === "last") {
            const min = moment().subtract(times, "days").startOf("day");
            const max = moment().endOf("day");
            setStartDate(min);
            setEndDate(max);
         } else {
            const min = moment()
               .subtract(times, unitOfTime)
               .startOf(unitOfTime);
            const max = moment().subtract(times, unitOfTime).endOf(unitOfTime);
            setStartDate(min);
            setEndDate(max);
            console.log(min, max);
         }
      }
   }, [filterActive]);

   useEffect(() => {
      if (filterActive === "all") {
         setTitle("Todo");
      } else {
         const startString = moment(startDate).format("DD MMMM");
         const endString = moment(endDate).format("DD MMMM");

         if (startString === endString) setTitle(startString);
         else setTitle(`${startString} - ${endString}`);
      }
   }, [startDate, endDate]);

   const expensesByCategory = useMemo(() => {
      const filterExpenses =
         filterActive === "all"
            ? expenses
            : expenses.filter((expense) => {
                 return (
                    moment(expense.createdAt).isSameOrAfter(startDate) &&
                    moment(expense.createdAt).isSameOrBefore(endDate)
                 );
              });

      const categoryObject = filterExpenses.reduce((acum, item) => {
         const current = acum[item.category] ? acum[item.category] : [];
         return {
            ...acum,
            [item.category]: [...current, item],
         };
      }, {});

      // Get totals
      return Object.keys(categoryObject).map((category) => {
         const expenses = categoryObject[category];

         return {
            category_description: category,
            total: expenses.reduce((acum, item) => acum + item.amount, 0),
         };
      });
   }, [expenses, filterActive, startDate, endDate]);

   const chartData = expensesByCategory.map((category) => ({
      ...category,
      name: labels[locale].categories[category.category_description],
      color: Colors.categories[category.category_description],
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
   }));

   const setFilter = (filterName) => () => setFilterActive(filterName);

   return (
      <ScrollView>
         <FilterButton
            text={title}
            name="today"
            onPress={() => {
               setModalVisible(true);
            }}
         />
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               setModalVisible(false);
            }}
         >
            <View style={styles.centeredView}>
               <ScrollView>
                  <View style={styles.modalView}>
                     <Text style={styles.sectionTitle}>Fecha exacta</Text>
                     <View>
                        <InputField
                           label="Fecha de Inicio"
                           type="date"
                           value={startDate}
                           onChangeText={(newDate) =>
                              setStartDate(moment(newDate).startOf("day"))
                           }
                        />
                        <InputField
                           label="Fecha de Fin"
                           type="date"
                           value={endDate}
                           onChangeText={(newDate) =>
                              setEndDate(moment(newDate).endOf("day"))
                           }
                        />
                     </View>

                     <Text style={styles.sectionTitle}>Mes</Text>
                     <View style={styles.buttonContainer}>
                        <FilterButton
                           name="month.0"
                           text="Este mes"
                           active={filterActive}
                           onPress={setFilter("month.0")}
                        />
                        <FilterButton
                           name="month.1"
                           text="Hace 1 mes"
                           active={filterActive}
                           onPress={setFilter("month.1")}
                        />
                        <FilterButton
                           name="month.2"
                           text="Hace 2 meses"
                           active={filterActive}
                           onPress={setFilter("month.2")}
                        />
                        <FilterButton
                           name="month.3"
                           text="Hace 3 meses"
                           active={filterActive}
                           onPress={setFilter("month.3")}
                        />
                     </View>
                     <Text style={styles.sectionTitle}>Semana</Text>
                     <View style={styles.buttonContainer}>
                        <FilterButton
                           name="week.0"
                           text="Esta semana"
                           active={filterActive}
                           onPress={setFilter("week.0")}
                        />
                        <FilterButton
                           name="week.1"
                           text="Semana pasada"
                           active={filterActive}
                           onPress={setFilter("week.1")}
                        />
                        <FilterButton
                           name="week.2"
                           text="Hace 2 semanas"
                           active={filterActive}
                           onPress={setFilter("week.2")}
                        />
                     </View>
                     <Text style={styles.sectionTitle}>Días</Text>

                     <View style={styles.buttonContainer}>
                        <FilterButton
                           name="day.0"
                           text="Hoy"
                           active={filterActive}
                           onPress={setFilter("day.0")}
                        />

                        <FilterButton
                           name="day.1"
                           text="Ayer"
                           active={filterActive}
                           onPress={setFilter("day.1")}
                        />
                        <FilterButton
                           name="day.2"
                           text="Hace 2 días"
                           active={filterActive}
                           onPress={setFilter("day.2")}
                        />
                     </View>

                     <Text style={styles.sectionTitle}>Año</Text>

                     <View style={styles.buttonContainer}>
                        <FilterButton
                           name="year.0"
                           text="Este año"
                           active={filterActive}
                           onPress={setFilter("year.0")}
                        />
                        <FilterButton
                           name="year.1"
                           text="Hace 1 año"
                           active={filterActive}
                           onPress={setFilter("year.1")}
                        />
                        <FilterButton
                           name="year.2"
                           text="Hace 2 años"
                           active={filterActive}
                           onPress={setFilter("year.2")}
                        />
                        <FilterButton
                           name="year.3"
                           text="Hace 3 años"
                           active={filterActive}
                           onPress={setFilter("year.3")}
                        />
                     </View>

                     <TouchableHighlight
                        style={{
                           ...styles.openButton,
                           backgroundColor: "#2196F3",
                        }}
                        onPress={() => {
                           setModalVisible(!modalVisible);
                        }}
                     >
                        <Text style={styles.textStyle}>OK</Text>
                     </TouchableHighlight>
                  </View>
               </ScrollView>
            </View>
         </Modal>
         <PieChart
            data={chartData}
            accessor="total"
            absolute={false}
            noDataMessage={dictonary.noDataMessage}
         />

         <View style={styles.buttonContainer}>
            <FilterButton
               name="all"
               text="Todo"
               active={filterActive}
               onPress={setFilter("all")}
            />
            <FilterButton
               name="year.0"
               text="Este año"
               active={filterActive}
               onPress={setFilter("year.0")}
            />
            <FilterButton
               name="month.1"
               text="Mes pasado"
               active={filterActive}
               onPress={setFilter("month.1")}
            />
            <FilterButton
               name="month.0"
               text="Este mes"
               active={filterActive}
               onPress={setFilter("month.0")}
            />
            <FilterButton
               name="week.1"
               text="Semana pasada"
               active={filterActive}
               onPress={setFilter("week.1")}
            />
            <FilterButton
               name="week.0"
               text="Esta semana"
               active={filterActive}
               onPress={setFilter("week.0")}
            />
            <FilterButton
               name="day.1"
               text="Ayer"
               active={filterActive}
               onPress={setFilter("day.1")}
            />
            <FilterButton
               name="day.0"
               text="Hoy"
               active={filterActive}
               onPress={setFilter("day.0")}
            />
            <FilterButton
               name="last.7"
               text="Últimos 7 días"
               active={filterActive}
               onPress={setFilter("last.7")}
            />
            <FilterButton
               name="last.15"
               text="Últimos 15 días"
               active={filterActive}
               onPress={setFilter("last.15")}
            />
            <FilterButton
               name="last.30"
               text="Últimos 30 días"
               active={filterActive}
               onPress={setFilter("last.30")}
            />
            <FilterButton
               name="ver.mas"
               text="Ver más"
               onPress={() => {
                  setModalVisible(true);
               }}
            />
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   buttonContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignContent: "center",
      justifyContent: "center",
   },

   sectionTitle: {
      fontWeight: "bold",
      fontSize: 16,
   },
   centeredView: {
      // flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   modalView: {
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
      // margin: 20,
      backgroundColor: "white",
      // borderRadius: 20,
      padding: 15,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   openButton: {
      marginTop: 20,
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
   },
   textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
   },
   modalText: {
      marginBottom: 15,
      textAlign: "center",
   },
});

export const screenOptions = (navData) => {
   return {
      headerTitle: labels.es.ReportCategoryScreen.title,
   };
};

export default ReportCategoryScreen;
