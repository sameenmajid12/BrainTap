import { Pressable, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../colors";

const GameOver=({level, restartGame})=>{
  return(
  <SafeAreaView style={styles.gameOverScreen}>
    <Text style={styles.gameOverHeader}>Game Over!</Text>
    <Text style={styles.gameOverSubheader}>{`You made it to level ${level}`}</Text>
    <Pressable style={({ pressed }) => [
          { backgroundColor: !pressed ? colors.accent : colors.text },
          styles.restartGame,
        ]} onPress={restartGame}>
      <Text style={styles.restartGameText}>Restart Game</Text>
    </Pressable>
  </SafeAreaView>)
};
const styles = StyleSheet.create({
  gameOverScreen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.primary,
    rowGap:5,
    paddingBottom:60
  },
  gameOverHeader:{
    fontSize:36,
    fontWeight:600,
    color:colors.text,
  },
  gameOverSubheader:{
    fontSize:18,
    fontWeight:500,
    color:colors.text,
  },
  restartGame:{
    width:130,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    borderRadius:5
  },
  restartGameText:{
    fontWeight:500,
  }
})
export default GameOver;