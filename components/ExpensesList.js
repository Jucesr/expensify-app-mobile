import React, {useState, useEffect, useCallback} from 'react';
import {
   View,
   StyleSheet,
   Text,
   Button,
   FlatList,
   TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

import Colors from '../constants/colors';
import {formatValue} from '../utils/index';

import {useDispatch} from 'react-redux';
import {setExpenses} from '../store/actions/expenses';
import {setCategories} from '../store/actions/categories';
import {setCards} from '../store/actions/cards';

import EmptyState from '../components/EmpyState';

const OFFSET_VALUE = 5;

const ExpensesList = (props) => {
   const {expenses, locale} = props;

   const [offset, setOffset] = useState(OFFSET_VALUE);
   const [isRefreshing, setIsRefreshing] = useState(false);
   const dispatch = useDispatch();
   const {t} = useTranslation();

   const expensesToRender = expenses.slice(0, offset);

   const loadExpenses = useCallback(async () => {
      setIsRefreshing(true);
      try {
         await dispatch(setExpenses());
         await dispatch(setCategories());
         await dispatch(setCards());
      } catch (err) {
         console.log(err);
         //   setError(err.message);
      }
      setIsRefreshing(false);
   }, [dispatch]);

   const tableHeaderHeight = 70;
   const tableBodyHeight = props.height - tableHeaderHeight;

   return (
      <View style={styles.table}>
         <View style={styles.tableHeader}>
            <Text style={styles.tableColumnText}>
               {t('ExpenseListScreen.expenseColTitle')}
            </Text>
            <Text style={styles.tableColumnText}>
               {t('ExpenseListScreen.amountColTitle')}
            </Text>
         </View>
         {expenses.length === 0 ? (
            <EmptyState text="No hay gastos" icon="dollar" />
         ) : (
            <FlatList
               onRefresh={loadExpenses}
               refreshing={isRefreshing}
               style={{
                  ...styles.tableBody,
                  height: tableBodyHeight,
               }}
               data={expensesToRender}
               keyExtractor={(item) => item.id}
               renderItem={({item: expense}) => (
                  <TouchableOpacity
                     activeOpacity={0.6}
                     onPress={() => {
                        props.onItemPress(expense);
                     }}
                  >
                     <View style={styles.tableBodyItem}>
                        <View style={styles.itemPart}>
                           <Text style={styles.description}>
                              {expense.description}
                           </Text>
                           <Text style={styles.category}>
                              {t(`categories.${expense.category}`)}
                           </Text>
                           <Text style={styles.date}>
                              {moment(expense.createdAt)
                                 // .locale(locale)
                                 .format('MMMM Do , YYYY')}
                           </Text>
                        </View>
                        <View style={styles.tableBodyItemRight}>
                           <Text style={styles.amount}>
                              {formatValue('currency', expense.amount / 100)}
                           </Text>
                           <Text style={styles.paymentMethod}>
                              {t(`payment_methods.${expense.payment_method}`)}
                           </Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               )}
               ListFooterComponent={() =>
                  offset < expenses.length && (
                     <View style={styles.button}>
                        <Button
                           color={Colors.blue}
                           title={t('ExpenseListScreen.loadMore')}
                           onPress={() => {
                              setOffset(offset + OFFSET_VALUE);
                           }}
                        />
                     </View>
                  )
               }
            />
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   table: {
      // flex: 1,
      width: '95%',
   },
   tableHeader: {
      borderWidth: 1,
      borderColor: Colors.grayBorder,
      flexDirection: 'row',
      backgroundColor: Colors.gray,
      justifyContent: 'space-between',
      padding: 10,
      height: 50,
   },
   tableColumnText: {
      color: Colors.primary,
      fontWeight: 'bold',
      fontSize: 18,
      fontFamily: 'roboto',
   },
   tableBody: {
      borderWidth: 1,
      borderColor: Colors.grayBorder,
      borderTopWidth: 0,
      // height: "100%", // TODO: FIX THIS. This is the height
   },
   tableBodyItem: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: Colors.grayBorder,
   },
   description: {
      textAlign: 'left',
      fontFamily: 'roboto-bold',
      fontSize: 16,
   },
   category: {
      textAlign: 'left',
      fontFamily: 'roboto',
      fontSize: 14,
   },
   date: {
      textAlign: 'left',
      fontFamily: 'roboto-blackitalic',
      color: Colors.grayBorder,
      fontSize: 14,
   },
   amount: {
      fontSize: 16,
      textAlign: 'right',
      fontFamily: 'roboto-bold',
   },
   paymentMethod: {
      textAlign: 'right',
      fontFamily: 'roboto',
      fontSize: 14,
   },
});

export default ExpensesList;
