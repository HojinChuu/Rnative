import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberCotainer from "../components/NumberCotainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import * as ScreenOrientation from "expo-screen-orientation";

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

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText># {listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
  // 게임중 회전잠금
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomBeetwen(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong..", [
        { text: "sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBeetwen(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberCotainer>{currentGuess}</NumberCotainer>
          <MainButton onPress={() => nextGuessHandler("greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberCotainer>{currentGuess}</NumberCotainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler("lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler("greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      {/* <ScrollView>
        {pastGuesses.map((guess, index) =>
          renderListItem(guess, pastGuesses.length - index)
        )}
      </ScrollView> */}
      <FlatList
        keyExtractor={(item) => item}
        data={pastGuesses}
        renderItem={renderListItem.bind(this, pastGuesses.length)}
      />
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
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  listItem: {
    borderColor: "black",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default GameScreen;
