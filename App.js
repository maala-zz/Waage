/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// eslint-disable-next-line quotes
import React, { Component } from "react";
// eslint-disable-next-line quotes
//import LoginScreen from "./screens/LoginScreen";
// eslint-disable-next-line quotes
import Container from "./Container";
import SplashScreen from "./screens/SplashScreen";
import { MenuProvider } from 'react-native-popup-menu';
const App = () => {
  return (
    <MenuProvider>
        <Container />
    </MenuProvider>
    );
};
export default App;
