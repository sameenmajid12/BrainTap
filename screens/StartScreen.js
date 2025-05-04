  import { View,Text, StyleSheet, Button, TouchableOpacity } from "react-native";
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
  import { StartButton } from "../components/Buttons";
  import { SafeAreaView } from "react-native-safe-area-context";
  import colors from "../colors";
  const StartScreen=({navigation, setGameStatus})=>{
    const StartGame=()=>{
      setGameStatus('starting');
      navigation.navigate('game');
    }
    return(
      <SafeAreaView style={styles.startContainer}>
        <MaterialIcons size={120} color={'white'} name="dashboard"/>
        <Text style={styles.startHeader}>Brain Tap</Text>
        <Text style={styles.startSubHeader}>Memorize the numbers in the squares before they flip</Text>
        <StartButton StartGame={StartGame}/>
        <TouchableOpacity ><Text style={styles.savedScores}>Saved Scores</Text></TouchableOpacity>
      </SafeAreaView>
    )
  }
  const styles=StyleSheet.create({
    startContainer:{
      backgroundColor:colors.primary,
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
    startHeader:{
      color:colors.text,
      fontWeight:700,
      fontSize:36,
      marginTop:20,
      marginBottom:5
    },
    startSubHeader:{
      color:colors.text,
      fontSize:14,
      marginBottom:20
    },
    savedScores:{
      color:colors.accent,
      fontWeight:500,
      marginTop:10
    }
  })
  export default StartScreen;