import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={StartScreen}/>
      <Stack.Screen name="Game" component={GameScreen}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
};
