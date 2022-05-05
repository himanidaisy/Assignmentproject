import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/screens/SignIn';
import Home from './src/screens/Home Screen/Home';
import AddExpenses from './src/screens/Expenses/AddExpenses';
import FilterExpense from './src/screens/Expenses/FilterExpense';
import DrawerNav from './src/components/DrawerNav';
import Expenses from './src/screens/Expenses/Expenses';
import Settings from './src/screens/AppSettings';
import Contactus from './src/screens/Contactus';
import Aboutus from './src/screens/Aboutus';
import StatusFilter from './src/screens/Expenses/StatusFilter';
import DateFilter from './src/screens/Expenses/DateFilter';
import Custom from './src/components/DrawerContent';
import CategoryFilter from './src/screens/Expenses/CategoryFilter';
import CustomSidebarMenu from './src/components/CustomSidebarMenu';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        // initialRouteName="Drawer Nav"
        // initialRouteName="LoginScreen"

        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Drawer Nav" component={DrawerNav} />
        <Stack.Screen
          name="SignInnScreen"
          component={Login}

          // navigationOptions= ({ navigation }) => ({
          //     headerRight= MenuIcon(navigation)
          // })/>
        />
        <Stack.Screen name="HomeScreen" component={Home} />

        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Screen name="Add Expenses" component={AddExpenses} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Contactus" component={Contactus} />
        <Stack.Screen name="Aboutus" component={Aboutus} />
        <Stack.Screen name="Custom" component={Custom} />
        <Stack.Screen name="FilterExpense" component={FilterExpense} />
        <Stack.Screen name="StatusFilter" component={StatusFilter} />
        <Stack.Screen name="DateFilter" component={DateFilter} />
        <Stack.Screen name="CategoryFilter" component={CategoryFilter} />
        <Stack.Screen
          name="CustomSidebarMenu Screen"
          component={CustomSidebarMenu}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
