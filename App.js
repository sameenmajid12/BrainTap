import {useState} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
const Stack = createNativeStackNavigator();
export default function App({navigation}) {
  const [gameStatus, setGameStatus] = useState('initial');
  const [level, setLevel] = useState(0);
  
  const RestartGame=()=>{

  }
  const SaveScore=()=>{

  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false}}
          name="home"
          children={(props)=><StartScreen {...props} setGameStatus={setGameStatus}/>}
        />
        <Stack.Screen
          options={{ headerShown: false}}
          name="game"
          children={(props)=><GameScreen {...props} gameStatus={gameStatus} setGameStatus={setGameStatus}/>}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
