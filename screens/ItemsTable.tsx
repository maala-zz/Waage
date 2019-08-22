import React, { Component } from 'react';
import { StyleSheet, View, ScrollView , Alert , AsyncStorage, Text } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import ToggleSwitch from 'toggle-switch-react-native';
import Button from "../components/Button";
const camps = require('../camps.json');
const materials = require('../materials.json');
const substance = require('../substance.json');
const tableDataFile = require('../data.json');
var RNFS = require('react-native-fs');
import FiltersMultiSelect from "../components/FiltersMultiSelect";
import strings from "../config/strings";
import TableTextInput from "../components/TableTextInput";
import TableButton from "../components/TableButton";
import colors from '../config/colors';
import Container from "../Container";

export default class ItemsTable extends Component {
  
  constructor(props) {
    super(props);
    this.DialogRef = React.createRef();
    // Lagerplatz/Stoff/Varianten/Stoffgruppe/Sendungsnummer/Menge/Convert/Inventory amount
   
    this.state = {
      showAmount:true,
      language: "" ,
      
      tableHeadWithAmount_EN: 
            [strings.EN_PLACE, strings.EN_MATERIAL, strings.EN_VARIANTS,
            strings.EN_SUBSTANCE, strings.EN_TRACKING_NUMBER, strings.EN_AMOUNT, 
            strings.EN_CONVERT, strings.EN_INVENTORY_AMOUNT],
      
         tableHeadWithAmount_DU: 
            [strings.DU_PLACE, strings.DU_MATERIAL, strings.DU_VARIANTS,
            strings.DU_SUBSTANCE, strings.DU_TRACKING_NUMBER, strings.DU_AMOUNT, 
            strings.DU_CONVERT, strings.DU_INVENTORY_AMOUNT],

      tableHeadWithOutAmount_EN: 
            [strings.EN_PLACE, strings.EN_MATERIAL, strings.EN_VARIANTS,
             strings.EN_SUBSTANCE, strings.EN_TRACKING_NUMBER, strings.EN_INVENTORY_AMOUNT],
      tableHeadWithOutAmount_DU:
            [strings.DU_PLACE, strings.DU_MATERIAL, strings.DU_VARIANTS,
              strings.DU_SUBSTANCE, strings.DU_TRACKING_NUMBER,strings.DU_INVENTORY_AMOUNT],    

      widthArrWithAmount:
            [90, 100, 80, 70, 100, 100, 70,80] ,
      widthArrWithOutAmount:
            [90, 100, 80, 70, 100, 80] ,
      showDialog:false,
      selectedCamps : [],
      selectedMaterials : [],
      selectedSubstances : [],
      inventory_amount : [],
      tableData:[],     
      visible:false,
      showAmountToggledOn:true,
      filterEmptyField:false
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('language').then((asyncLanguage) =>{
           if( asyncLanguage == null || asyncLanguage == strings.EN ){
            this.setState({language:strings.EN});
           }
           else
           this.setState({language:strings.DU}); 
       }
    );
}
  
  OnPressHideDialog = () => {
    this.setState({showDialog:false});
    if(this.DialogRef.current != null){
      this.DialogRef.current.hideDialog() ;
      this.DialogRef.current.setState({visible:false});
      this.DialogRef.current.state.visible = false ;
    }
  }

  onPressFilter = () => {
    this.setState({visible:true});
  }

  switchToggle = (isOn) => {
    this.setState({showAmountToggledOn:!this.state.showAmountToggledOn});
  };

  onSelectedItemsChange = (selectedItems) =>{
    this.setState({selectedItems:selectedItems});
  };

  onSelectedCampsChange = (selectedCamps) =>{
    this.setState({selectedCamps:selectedCamps});
  };

  onSelectedMaterialsChange = (selectedMaterials) =>{
    this.setState({selectedMaterials:selectedMaterials});
  };

  onSelectedSubstancesChange = (selectedSubstances) =>{
    this.setState({selectedSubstances:selectedSubstances});
  };
  
  IsSelectedInCamps(id){
    for( let i = 0; i < this.state.selectedCamps.length; i += 1 ){
        if( this.state.selectedCamps[i] == id )
        return true ;
    }
  return false ;
  }

  IsSelectedInMaterials(id){
    for( let i = 0; i < this.state.selectedMaterials.length; i += 1 ){
        if( this.state.selectedMaterials[i] == id )
        return true ;
    }
  return false  ;
  }

  IsSelectedInSubstances(id){
    for( let i = 0; i < this.state.selectedSubstances.length; i += 1 ){
        if( this.state.selectedSubstances[i] == id )
        return true ;
    }
  return false ;
  }

  ResetFilters = () => {
    this.setState({ selectedCamps : [], selectedMaterials : [], selectedSubstances : [], filterEmptyField:false }) ;
  }

  UpdateInventoryAmount = (index, text) => {
    this.state.inventory_amount[index] = text ;
  }

  WriteToFile = (ReportData) =>{
    var path = RNFS.ExternalStorageDirectoryPath + '/test.json';

    // write the file
    RNFS.writeFile(path, JSON.stringify(ReportData), 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!'+ path);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  WriteReports = () =>{
    var ReportData = [] ;
    for (let j = 0; j < tableDataFile.length; j += 1) {

      const rowData = [];
      rowData.push(tableDataFile[j].camp.value);
      rowData.push(tableDataFile[j].material.value);
      rowData.push(tableDataFile[j].variant.value);
      rowData.push(tableDataFile[j].substance.value);
      rowData.push(tableDataFile[j].trackingNumber.value);
      rowData.push(tableDataFile[j].amount.value);
      rowData.push(tableDataFile[j].convert.value);
        
      if( this.state.inventory_amount[j] == null )
      rowData.push("0");
      else
      rowData.push(this.state.inventory_amount[j]);

      ReportData.push(rowData);
    }
    this.WriteToFile(ReportData);
  }

  OnPressSubmit = (tableData) => {
    var show = false ;
    for( let i = 0 ; i < tableData.length ; i+=1 ){
     if( this.state.inventory_amount[i] == "0" || this.state.inventory_amount[i] == null ){
      show = true;
      break ;
     }
    }

    if( show ){
      Alert.alert(
        this.state.language == strings.DU? strings.DU_WARNING:strings.EN_WARNING,
        this.state.language == strings.DU? strings.DU_EMPTY_WARNING:strings.EN_EMPTY_WARNING,
        [
          {
            text: this.state.language == strings.DU? strings.DU_CANCEL:strings.EN_CANCEL,
            onPress: () => this.setState({filterEmptyField:true}),
            style: 'cancel',
          },
          {text: this.state.language == strings.DU? strings.DU_CONFIRM:strings.EN_CONFIRM, onPress: () => this.WriteReports()},
        ],
        {cancelable: false},
      );
    }
    else{
      this.WriteReports();
    }

  }

  render() {
    const { selectedCamps, selectedMaterials , selectedSubstances } = this.state;
    const state = this.state;
    var tableData = [] ;
    for (let j = 0; j < tableDataFile.length; j += 1) {

        const rowData = [];
        rowData.push(tableDataFile[j].camp.value);
        rowData.push(tableDataFile[j].material.value);
        rowData.push(tableDataFile[j].variant.value);
        rowData.push(tableDataFile[j].substance.value);
        rowData.push(tableDataFile[j].trackingNumber.value);
        if( this.state.showAmountToggledOn ){
          rowData.push(tableDataFile[j].amount.value);
          rowData.push(tableDataFile[j].convert.value);
        }
        rowData.push(<TableTextInput onChangeText = {(text) => this.UpdateInventoryAmount(j,text)}></TableTextInput>);
        if( (this.IsSelectedInCamps(tableDataFile[j].camp.id) || selectedCamps.length == 0)
        &&  (this.IsSelectedInMaterials(tableDataFile[j].material.id) || selectedMaterials.length == 0 )
        &&  (this.IsSelectedInSubstances(tableDataFile[j].substance.id) || selectedSubstances.length == 0)
        )
         {
              tableData.push(rowData);
         }
      }

    return (
      <View style={styles.container}>
        <View style = {styles.buttonsTopContainer}>
        <TableButton label={ this.state.language == strings.DU ? "Zurücksetzen" : "Reset"} onPress = {this.ResetFilters} ></TableButton>
        <Text>{"  "}</Text>
        <TableButton label="Filter" onPress={this.onPressFilter} ></TableButton>
        </View>
      


       
        <Dialog
          ref = {this.props.DialogRef}
          onTouchOutside={() => {
            this.props.OnPressHideDialog
          }}
          width={0.95}
          visible={this.state.visible}
          dialogAnimation={new ScaleAnimation()}
          onHardwareBackPress={() => {
            {this.setState({visible:false})}
          }}
          dialogTitle={
            <DialogTitle
              title={ this.state.language == strings.EN ? "Save Report" : "Bericht speichern"}
              hasTitleBar={false}
            />
          }
          actions={[
            <DialogButton
              text="DISMISS"
              onPress={() => {
                {this.setState({visible:false})}
              }}
              key="button-1"
            />,
          ]}
        >
          <DialogContent>


          
          <FiltersMultiSelect onSelectedItemsChange ={this.onSelectedCampsChange} items = {camps} selectedItems={selectedCamps} language = {this.state.language} />
          
          <FiltersMultiSelect onSelectedItemsChange ={this.onSelectedMaterialsChange} items = {materials} selectedItems={selectedMaterials} language = {this.state.language} />

          <FiltersMultiSelect onSelectedItemsChange ={this.onSelectedSubstancesChange} items = {substance} selectedItems={selectedSubstances} language = {this.state.language} />
          <HideWithKeyboard>
              <View style={ styles.toggleButton }>
              
              <ToggleSwitch
                            isOn={this.state.showAmountToggledOn}
                            onColor="green"
                            offColor="silver"
                            label={strings.DU_AMOUNT}
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="small"
                            onToggle={isOn => this.switchToggle(isOn) }
                            />
              </View>              

              <Button
                label={ this.state.language == strings.EN ? "Submit" : "Einreichen" } 
                onPress={() =>{
                this.setState({ defaultAnimationDialog: true,  visible: false });
            
              }
              }
              />
            </HideWithKeyboard>
          </DialogContent>
        </Dialog>


        
    
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.showAmountToggledOn ? (state.language == strings.DU ? state.tableHeadWithAmount_DU : state.tableHeadWithAmount_EN) : (state.language == strings.DU ? state.tableHeadWithOutAmount_DU : state.tableHeadWithOutAmount_EN)} widthArr={this.state.showAmountToggledOn ? this.state.widthArrWithAmount : this.state.widthArrWithOutAmount} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      data={rowData}
                      widthArr={this.state.showAmountToggledOn ? this.state.widthArrWithAmount : this.state.widthArrWithOutAmount}
                      style={[styles.row, index%2 && {backgroundColor: colors.WHITE}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
        <View style = {styles.buttonsContainer}>
        <TableButton label={ this.state.language == strings.DU ? "Einreichen" : "Submit"} onPress={() => this.OnPressSubmit(tableData)} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    flexDirection:"column", 
    height:"50%", 
    padding:5, 
    paddingTop: 30, 
    backgroundColor: '#fff', 
    justifyContent:"center" 
  },
  buttonsContainer:{ alignItems:"center"},
  buttonsTopContainer:{ alignItems:"flex-start", marginLeft:10, flexDirection:"row"},
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});