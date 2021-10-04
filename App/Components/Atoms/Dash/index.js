import React from "react";
import { StyleSheet, View } from "react-native";
import Dashes from "react-native-dash";
import { colors } from "../../../Themes";

const Dash = () => {
  return (
    <View>
      <Dashes style={styles.dash} dashThickness={1} dashGap={4} dashColor={colors.dash} />
    </View>
  );
};

export default Dash;

const styles = StyleSheet.create({
  dash: {
    maxWidth: "100%",
    height: 1,
  },
});
