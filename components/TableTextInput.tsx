import * as React from "react";
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import colors from "../config/colors";

type Props = TextInputProps;

class TableTextInput extends React.Component<Props> {
  textInputRef = React.createRef<TextInput>();
  state = {
    editable:false
  }
  focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  };

  render() {
    const { style, ...otherProps } = this.props;
    return (
      <TouchableOpacity onPress = { () => this.setState({editable:true}) } >
      <TextInput
        keyboardType='numeric'
        onEndEditing ={
          () => {
            this.setState({editable:false});
          }
        }
        editable={this.state.editable}
        ref={this.textInputRef}
        selectionColor={colors.DODGER_BLUE}
        style={[styles.textInput, style]}
        {...otherProps}
      />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: colors.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontWeight:"bold",
    alignItems:"center",
    alignContent:"center",
    textAlign:"center"
  }
});

export default TableTextInput;