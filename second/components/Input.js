import React from "react";
import { StyleSheet, TextInput } from "react-native";

const input = ({ onChangeText, value, style }) => {
  return (
    <TextInput
      style={{ ...styles.input, ...style }}
      onChangeText={onChangeText}
      value={value}
      blurOnSubmit
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="number-pad"
      maxLength={2}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default input;
