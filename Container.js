import React, { Component } from 'react';
import { AsyncStorage } from "react-native";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ItemsTable from "./screens/ItemsTable";
import LoginScreen from './screens/LoginScreen';
import SplashScreen from "./screens/SplashScreen";
import LogOutButton from "./components/LogOutButton";
const NavigationStack = createStackNavigator({

  Main: {
    screen: SplashScreen
  },

  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: "Sign In"
    }
  },

  Table: {
    screen: ItemsTable,
    
    navigationOptions: ({ navigation }) => ({
      title: "Reports",
      headerLeft: null,
      headerRight: <LogOutButton onPress = { () => { 
      AsyncStorage.removeItem("isLoggedIn").then(() => {
        navigation.navigate('Login', {language:"DU"})
      })
      }} />
    })
  },
});

const Container = createAppContainer(NavigationStack);

export default Container;
