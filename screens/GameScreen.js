import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../colors";
import Cards from "../components/Cards";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import GameOver from "../components/GameOver";
import LoadingScreen from "../components/Loading";
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
  return <Text style={styles.gameScreenTimer}>{formatTime()}</Text>;
};
const GameScreen = ({
  gameStatus,
  setGameStatus,
  level,
  setLevel,
  lives,
  setLives,
  restartGame,
  guessesLeft,
  setGuessesLeft,
  setWrongGuess,
  wrongGuess
}) => {
  

  useEffect(() => {
    let timeoutId;
    if (gameStatus === "started") {
      timeoutId = setTimeout(() => {
        setGameStatus("showcards");
      }, 1000);
    }
    if (gameStatus === "showcards") {
      timeoutId = setTimeout(() => {
        setGameStatus("hidecards");
      }, 3500);
    }
    return () => clearTimeout(timeoutId);
  }, [gameStatus]);
  useEffect(() => {
    if (guessesLeft === 3) {
      setWrongGuess(false);
    }
    if (guessesLeft === 0) {
      setLives((prev) => prev - 1);
      setGuessesLeft(3);
    }
  }, [guessesLeft]);
  useEffect(() => {
    if (lives === 0) {
      setGameStatus("gameover");
    }
  }, [lives]);
  
  if (gameStatus === "starting") {
    return <LoadingScreen setGameStatus={setGameStatus} />;
  }
  if(gameStatus==='gameover'){
    return <GameOver level={level} restartGame={restartGame}/>
  }
  return (
    <SafeAreaView style={styles.gameScreen}>
      <View style={styles.gameScreenHeader}>
        <Text style={styles.gameScreenHeaderText}>Level {level}</Text>

        <View style={styles.gameHeaderLives}>
          {Array.from({ length: 3 }).map((_, index) => (
            <FontAwesome
              key={index}
              name={index < lives ? "heart" : "heart-o"}
              color={"white"}
              size={30}
            ></FontAwesome>
          ))}
        </View>
        <Timer />
      </View>
      <Cards
        level={level}
        setLevel={setLevel}
        gameStatus={gameStatus}
        setGuessesLeft={setGuessesLeft}
        setWrongGuess={setWrongGuess}
        setGameStatus={setGameStatus}
      />
      {wrongGuess && (
        <Text
          style={styles.wrongGuessText}
        >{`${guessesLeft} guesses left until you lose a life!`}</Text>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  
  gameScreen: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 30,
    paddingTop: 120,
  },
  gameScreenHeader: {
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gameScreenHeaderText: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.text,
    width: 110,
  },
  gameScreenTimer:{
    fontSize: 24,
    fontWeight: "500",
    color: colors.text,
    width: 110,
    textAlign:'right'
  },
  wrongGuessText: {
    paddingTop: 20,
    color: "#FF0032",
    fontWeight: 600,
    fontSize: 14,
    textAlign: "center",
  },
  gameHeaderLives: {
    flexDirection: "row",
    columnGap: 5,
  },
});
export default GameScreen;
