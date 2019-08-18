import * as React from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import colors from "../config/colors";
import MultiSelect from 'react-native-multiple-select';
import strings from "../config/strings";
import constants from "../config/constants";

export default class FiltersMultiSelect extends React.Component{
   
    state = {pos: '',isDialog:false || this.props.isDialog}
    updatePos = (pos) => {
       this.setState({ pos: pos })
    }

    render() {
       return (

        <KeyboardAvoidingView
        style={styles.container}
        // On Android the keyboard behavior is handled
        // by Android itself, so we should disable it
        // by passing `undefined`.
        behavior={constants.IS_IOS ? "padding" : undefined}
      >
        <MultiSelect
        hideTags
        search = {false}
        items={this.props.items}
        uniqueKey="id"
        ref={(component) => { this.multiSelect = component }}
        onSelectedItemsChange={this.props.onSelectedItemsChange}
        selectedItems={this.props.selectedItems}
        selectText={ this.props.language == strings.EN ? strings.EN_PICK_ITEMS : strings.DU_PICK_ITEMS }
        searchInputPlaceholderText="Search Items..."
        onChangeInput={ (text)=> console.log(text)}
        altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#2f04fb"
        submitButtonText={ this.props.language == strings.EN ? strings.EN_PICK : strings.DU_PICK }
      />
      </KeyboardAvoidingView>
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