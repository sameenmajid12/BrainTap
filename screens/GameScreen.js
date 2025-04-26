import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../colors";
import Cards from "../components/Cards";

const LoadingScreen = ({ setGameStatus }) => {
  const [time, setTime] = useState(3);
  useEffect(() => {
    if (time === 0) {
      setGameStatus("started");
      return;
    }
    const intervalId = setInterval(() => {
      console.log(time);
      setTime((prev) => prev - 1);
    }, [1000]);
    return () => {
      clearInterval(intervalId);
    };
  }, [time]);
  return (
    <SafeAreaView style={styles.loadingScreen}>
      <Text style={styles.loadingHeader}>Your game is starting in..</Text>
      <Text style={styles.loadingTime}>{time}</Text>
    </SafeAreaView>
  );
};
const GameScreen = ({ gameStatus, setGameStatus, level, setLevel }) => {
  if (gameStatus === "starting") {
    return <LoadingScreen setGameStatus={setGameStatus} />;
  }
  return(
    <SafeAreaView>
      <View></View>
      <Cards/>
    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
  loadingHeader: {
    fontSize: 24,
    color: colors.text,
    fontWeight: 500,
  },
  loadingTime: {
    fontSize: 48,
    color: colors.accent,
    fontWeight: 600,
  },
});
export default GameScreen;
