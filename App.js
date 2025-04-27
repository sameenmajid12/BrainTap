import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
const Stack = createNativeStackNavigator();
export default function App({ navigation }) {
  const [gameStatus, setGameStatus] = useState("initial");
  const [level, setLevel] = useState(16);
  const [lives, setLives] = useState(3);
  useEffect(() => {
    if (gameStatus !== "initial") {
      setGameStatus("showcards");
      const timeoutId = setTimeout(() => {
        setGameStatus("hidecards");
      }, 3500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [level]);
  const RestartGame = () => {
    setLevel(0);
    setGameStatus("starting");
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
            />
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
