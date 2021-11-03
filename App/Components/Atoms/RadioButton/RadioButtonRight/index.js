import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../..";
import { IcRadioActive, IcRadioInactive } from "../../../Images";
import { colors, fonts } from "../../../Themes";
import { scale } from "../../../Transforms";

const RadioButtonRight = ({ style, label, isActive, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      {isActive ? <IcRadioActive /> : <IcRadioInactive />}
    </TouchableOpacity>
  );
};

export default RadioButtonRight;

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    flex: 1,
    fontSize: scale(14),
    color: colors.text.primary,
  },

  highlight: {
    fontSize: scale(14),
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
});
