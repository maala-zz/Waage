import * as React from "react";
import { StyleSheet, Picker,View,Text } from "react-native";
import colors from "../config/colors";
const camps = require('../camps.json');
interface State {
}
interface Props {
    label: string;
    isDialog: boolean
  }
class PositionsList extends React.Component<Props, State>{
   
    state = {pos: '',isDialog:false || this.props.isDialog}
    updatePos = (pos) => {
       this.setState({ pos: pos })
    }

    render() {
      const { label } = this.props;
       return (
          <View style = {styles.rowContainer }>
              <View style ={[styles.textView, { width : this.state.isDialog == true ? "25%":"20%"} ]}>
          <Text style = {styles.text} >{label}</Text></View>
             <Picker style = {styles.internalPickerContainer}
              selectedValue = {this.state.pos} onValueChange = {this.updatePos}>
{
              camps.map((camp, index) => (
                  <Picker.Item key = {index} label = {camp.name} value = {camp.id} />
                  ))
}

             </Picker>
          </View>
       )
    }
};

const styles = StyleSheet.create({
    text: {
        fontSize : 15
    },
    textView: {
     
      borderColor: colors.MISCHKA,
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 2,
      },
      internalPickerContainer: {
        flex: null, // for Android, not visible otherwise.
        width: "80%",
      },
 })

export default PositionsList;