import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";

import NumberCotainer from "../components/NumberCotainer";
import Card from "../components/Card";

const generateRandomBeetwen = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBeetwen(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const GameScreen = ({ userChoice }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBeetwen(1, 100, userChoice)
  );

  return (
    <View style={styles.screen}>
      <NumberCotainer>{currentGuess}</NumberCotainer>
      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={() => {}} />
        <Button title="Greater" onPress={() => {}} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default GameScreen;
