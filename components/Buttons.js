import { Pressable, TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../colors";
const StartButton = ({ StartGame }) => {
  return (
    <Pressable
      onPress={StartGame}
      style={({ pressed }) => [
        styles.startButton,
        {
          backgroundColor: !pressed ? colors.accent : colors.text,
        },
      ]}
    >
      <Text style={styles.startButtonText}>Start Game</Text>
    </Pressable>
  );
};
const RestartButton = () => {};
const SaveButton = () => {};
const styles = StyleSheet.create({
  startButton: {
    width: 150,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  startButtonText: {
    fontWeight: 500,
  },
});
export { StartButton, RestartButton, SaveButton };
