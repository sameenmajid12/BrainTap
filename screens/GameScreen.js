import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../colors";
import Cards from "../components/Cards";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
const Timer = () => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const formatTime = () => {
    const hours = Math.floor(secondsElapsed / 3600);
    const minutes = Math.floor((secondsElapsed % 3600) / 60);
    const seconds = secondsElapsed % 60;
    const pad = (n) => n.toString().padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };
  return <Text style={styles.gameScreenHeaderText}>{formatTime()}</Text>;
};
const GameScreen = ({ gameStatus, setGameStatus, level, setLevel, lives }) => {
  if (gameStatus === "starting") {
    return <LoadingScreen setGameStatus={setGameStatus} />;
  }
  return (
    <SafeAreaView style={styles.gameScreen}>
      <View style={styles.gameScreenHeader}>
        <Text style={styles.gameScreenHeaderText}>Level {level}</Text>
        <Timer />
        <View>
          <Text style={styles.gameScreenHeaderText}>Lives</Text>
        </View>
      </View>
      <Cards level={level} />
    </SafeAreaView>
  );
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
  gameScreen: {
    flex: 1,
    backgroundColor: colors.primary,
    rowGap:90,
    paddingTop:30  },
  gameScreenHeader:{
    padding:30,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  gameScreenHeaderText:{
    fontSize:24,
    fontWeight:'500',
    color:colors.text
  }
});
export default GameScreen;
