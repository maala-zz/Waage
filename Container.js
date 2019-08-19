import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ItemsTable from "./screens/ItemsTable";
import LoginScreen from './screens/LoginScreen';

const NavigationStack = createStackNavigator({
  Main: {
    screen: LoginScreen,
    navigationOptions: {
      title: "Sign In"
    }
    },
    Table: {
    screen: ItemsTable,
    navigationOptions: {
      title: "Reports"
    }
    },
});

const Container = createAppContainer(NavigationStack);

export default Container;
