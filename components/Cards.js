import { Text, View, Animated, Easing } from "react-native";
const getNumCards = (level) => {
  if (level >= 0 && level <= 9) return 9;
  if (level > 9 && level <= 16) return 16;
  if (level > 16 && level <= 25) return 25;
  if (level > 25 && level <= 36) return 36;
  return 49;
};

const Cards = ({ level }) => {
  const numCards = getNumCards(level);
  const arr = Array.from({ length: numCards }, (_, i) => i);
  const numberedCardIndices = [];
  for (let i = 0; i < level + 1; i++) {
    let index = -1;
    while (!numberedCardIndices.includes(index) || index === -1) {
      index = Math.floor(Math.random() * numCards);
    }
    numberedCardIndices.push(index);
  }
  return (
    <View>
      {arr.map((index) => {
        const number = numberedCardIndices.includes(index)
          ? numberedCardIndices.indexOf(index)
          : null;
        return <View>{number !== null && <Text>{number}</Text>}</View>;
      })}
    </View>
  );
};
export default Cards;
