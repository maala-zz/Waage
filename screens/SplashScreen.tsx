import * as React from "react";
import {
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import * as Progress from 'react-native-progress';
import colors from "../config/colors";
import Container from "../Container";
import LoginScreen from "./LoginScreen";
import ItemsTable from "./ItemsTable";
interface State {
    IsLoggedIn: boolean;
  }

class SplashScreen extends React.Component<{}, State> {

    state = {
        isLoggedIn: false,
        dataLoaded:false
      };

    componentWillMount(){
        console.log("Hi Yoah");
        AsyncStorage.getItem('isLoggedIn').then((value) =>{
               this.setState({dataLoaded:true});
               this.props.navigation.pop();
               if( value == null || value == 0 ){
                this.props.navigation.navigate('Login', {language:"DU"});
               }
               else
                this.props.navigation.navigate('Table', {language:"DU"});  
           }
        );
    }

    render(){
        if( this.state.dataLoaded == false )
                 return(
                     <View style = {styles.container}>
                    <Progress.Circle
                    size={52}
                    progress={0.5}
                    unfilledColor="#fff"
                    color="#ff457f"
                    thickness={4}
                    borderWidth={0}>
                    </Progress.Circle>
                    </View>);
        else 
                return null ;
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center"
    }
  });
  
export default SplashScreen ;