import * as React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  AsyncStorage
} from "react-native";
import Touchable from 'react-native-platform-touchable';
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import colors from "../config/colors";
import strings from "../config/strings";
import constants from "../config/constants";
import PositionsList from "../components/PositionsList";
import Container from "../Container";

interface State {
  userName: string;
  password: string;
  emailTouched: boolean;
  passwordTouched: boolean;
}


class LoginScreen extends React.Component<{}, State> {
  passwordInputRef = React.createRef<FormTextInput>();

   state = {
    userName: "",
    password: "",
    emailTouched: false,
    passwordTouched: false,
    language:"EN"
  };

  handleEmailChange = (userName: string) => {
    this.setState({ userName: userName });
  };

  handlePasswordChange = (password: string) => {
    this.setState({ password: password });
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleEmailBlur = () => {
    this.setState({ emailTouched: true });
  };

  handlePasswordBlur = () => {
    this.setState({ passwordTouched: true });
  };

  toggleLanguage = () =>{
    if( this.state.language == "EN" ){
      this.setState({ language: "DU" });
    }
    else{
      this.setState({ language: "EN" });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const {
      userName,
      password,
      emailTouched,
      passwordTouched
    } = this.state;
    const emailError =
      !userName && emailTouched
        ? strings.EMAIL_REQUIRED
        : undefined;
    const passwordError =
      !password && passwordTouched
        ? strings.PASSWORD_REQUIRED
        : undefined;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        // On Android the keyboard behavior is handled
        // by Android itself, so we should disable it
        // by passing `undefined`.
        behavior={constants.IS_IOS ? "padding" : undefined}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
        />
        <View style={styles.Header} >
          
        <Touchable style = {styles.changeLanguage} onPress={this.toggleLanguage}>
          <Text style={styles.changeLanguageText}>{this.state.language}</Text>
        </Touchable>
        <Text style = {styles.mainText} >
        {this.state.language == "EN" ? strings.EN_Header_TEXT : strings.DU_Header_TEXT}
          </Text>
    
        </View>
        <View style={styles.form}>
          <FormTextInput
            value={this.state.userName}
            onChangeText={this.handleEmailChange}
            onSubmitEditing={this.handleEmailSubmitPress}
            placeholder={
                this.state.language == "EN" ? strings.EN_User_Name_PLACEHOLDER : strings.DU_User_Name_PLACEHOLDER
              }
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            onBlur={this.handleEmailBlur}
            error={emailError}
            blurOnSubmit={constants.IS_IOS}
          />
          <FormTextInput
            ref={this.passwordInputRef}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={
              this.state.language == "EN" ? strings.EN_PASSWORD_PLACEHOLDER : strings.DU_PASSWORD_PLACEHOLDER
            }
            secureTextEntry={true}
            returnKeyType="done"
            onBlur={this.handlePasswordBlur}
            error={passwordError}
          />
     
         <PositionsList 
         label={
          this.state.language == "EN" ? strings.EN_CLIENT_LIST : strings.DU_CLIENT_LIST
          }
         />

          <Button
            label={  
              this.state.language == "EN" ? strings.EN_LOGIN : strings.DU_LOGIN
            }
            onPress={() => { 
              {
                console.log("Hi");
              }
              if(this.state.userName == "test" && this.state.password == "test"){
                AsyncStorage.setItem('userName', this.state.userName);
                this.setState({ 'userName': this.state.userName });
                this.setState({ 'password': this.state.password });        
                this.props.navigation.push('Table', {language:this.state.language});
              }
             } }
            disabled={userName == "" || password == ""}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  Header: {
    flex: 0.3,
    width: "90%",
    alignSelf: "auto",
    alignItems:"center",
    justifyContent:"center"
  },
  form: {
    flex: 0.7,
    justifyContent: "center",
    width: "90%",
  },

  mainText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: "lucida grande",
    justifyContent: "center",
    textAlign: "auto",
  },
  changeLanguage: {
    elevation: 2,
    position: 'absolute',
    padding: 10,
    borderRadius: 5,
    top: 15,
    width: 45,
    right: 10,
    borderWidth: 1,
  },

});

export default LoginScreen;