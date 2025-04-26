import { Pressable, TouchableOpacity,StyleSheet } from "react-native";
import colors from '../colors';
const StartButton=()=>{
  <Pressable style={({pressed})=>[
    styles.startButton,
    {
      backgroundColor: pressed?colors.accent:colors.text
    }
  ]}>
    <Text style={styles.startButtonText}>Start Game</Text>
  </Pressable>
}
const RestartButton=()=>{

}
const SaveButton=()=>{

}
const styles = StyleSheet.create({
  startButton:{

  },
  startButtonText:{

  }
})
export {StartButton, RestartButton, SaveButton};