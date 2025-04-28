import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  const [gameStatus, setGameStatus] = useState("initial");
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [guessesLeft, setGuessesLeft] = useState(3);
  const [wrongGuess, setWrongGuess] = useState(false);
  useEffect(()=>{
    console.log(gameStatus);
  },[gameStatus])
  useEffect(() => {
    if (gameStatus !== "initial") {
      console.log('f')
      setGuessesLeft(3);
      timeoutId = setTimeout(() => {
        setGameStatus("showcards");
      }, 1000);
 
      if (gameStatus === "showcards") {
        timeoutId = setTimeout(() => {
          setGameStatus("hidecards");
        }, 3500);
      }
      return () => clearTimeout(timeoutId);
    }
  }, [level]);
  const restartGame = () => {
    setLives(3);
    setLevel(1);
    setGameStatus("starting");
    setGuessesLeft(3);
    setWrongGuess(false);
  };
  const SaveScore = () => {};
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="home"
          children={(props) => (
            <StartScreen {...props} setGameStatus={setGameStatus} />
          )}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="game"
          children={(props) => (
            <GameScreen
              {...props}
              gameStatus={gameStatus}
              setGameStatus={setGameStatus}
              level={level}
              setLevel={setLevel}
              lives={lives}
              setLives={setLives}
              restartGame={restartGame}
              wrongGuess={wrongGuess}
              setWrongGuess={setWrongGuess}
              setGuessesLeft={setGuessesLeft}
              guessesLeft={guessesLeft}
            />
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
