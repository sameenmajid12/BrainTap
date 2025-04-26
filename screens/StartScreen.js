import { View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StartButton } from "../components/Buttons";
const StartScreen=()=>{
  return(
    <View>
      <MaterialIcons name="SpaceDashboard"/>
      <Text>Number Memory Game</Text>
      <Text>Memorize the numbers in the squares before they flip</Text>
      <StartButton/>
    </View>
  )
}
export default StartScreen;