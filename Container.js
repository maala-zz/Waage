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
    navigationOptions: {
      title: "Reports",
      headerLeft: null,
      headerRight: <LogOutButton onPress = { () => {AsyncStorage.setItem("isLoggedIn",0)
    
      this.props.navigation.navigate('Login', {language:"DU"})}
    } />
    }
  },
});

const Container = createAppContainer(NavigationStack);

export default Container;
