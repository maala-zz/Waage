import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import ItemsTable from "../screens/ItemsTable";
import Container from "../Container";
interface Props {
  label: string;
  onPress: () => void;
}

class LogOutButton extends React.Component<Props> {
  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{"logout"}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    width:"100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.WHITE,
    marginBottom: 5,
    marginTop:5,
    marginRight:5,
    paddingVertical: 3,
    paddingRight: 3,
    paddingLeft: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)"
  },
  text: {
    color: colors.BLACK,
    textAlign: "center",
    height: 20,
    fontSize: 15
  }
});

export default LogOutButton;