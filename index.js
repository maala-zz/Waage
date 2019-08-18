/**
 * @format
 */

// eslint-disable-next-line prettier/prettier
import {AppRegistry} from 'react-native';
// eslint-disable-next-line quotes
import App from "./App";
// eslint-disable-next-line quotes
import { name as appName } from "./app.json";
AppRegistry.registerComponent(appName, () => App);
