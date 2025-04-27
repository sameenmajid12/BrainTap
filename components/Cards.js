import {
  Text,
  View,
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import colors from "../colors";
import { useEffect, useState } from "react";

const getNumCards = (level) => {
  if (level >= 0 && level <= 9) return 9;
  if (level > 9 && level <= 16) return 16;
  if (level > 16 && level <= 25) return 25;
  if (level > 25 && level <= 36) return 36;
  return 49;
};

const Cards = ({
  level,
  gameStatus,
  setGuessesLeft,
  setWrongGuess,
  wrongGuess,
  setCurrentNumber,
  currentNumber
}) => {
  const numCards = getNumCards(level);
  const [flippedCards, setFlippedCards] = useState([]);
  const [numberedCardIndices, setNumberedCardIndices] = useState([]);
  const [animations, setAnimations] = useState({
    flipAnimations: [],
    cardColors: []
  });

  useEffect(() => {
    setAnimations({
      flipAnimations: Array.from({ length: numCards }, () => new Animated.Value(180)),
      cardColors: Array.from({ length: numCards }, () => new Animated.Value(0))
    });
  }, [numCards]);

  useEffect(() => {
    if (gameStatus === "showcards") {
      setFlippedCards(Array.from({ length: numCards }, (_, i) => i));
      flipAllCards(true);
    } else if (gameStatus === "hidecards") {
      setFlippedCards([]);
      flipAllCards(false);
      setCurrentNumber(1);
    }
  }, [gameStatus, numCards]);

  useEffect(() => {
    const arr = [];
    while (arr.length < Math.min(level, numCards)) {
      const randomIndex = Math.floor(Math.random() * numCards);
      if (!arr.includes(randomIndex)) {
        arr.push(randomIndex);
      }
    }
    setNumberedCardIndices(arr);
  }, [level, numCards]);

  const flipAllCards = (show) => {
    animations.flipAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: show ? 0 : 180,
        duration: 100 + (index + 1) * 50,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    });
  };

  const flipCard = (index) => {
    if (gameStatus !== "hidecards") {
      return;
    }
    const isCurrentlyFlipped = flippedCards.includes(index);
    if (
      numberedCardIndices.indexOf(index) + 1 !== currentNumber &&
      !isCurrentlyFlipped
    ) {
      setGuessesLeft((prev) => prev - 1);
      setWrongGuess(true);
      Animated.sequence([
        Animated.timing(animations.cardColors[index], {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animations.cardColors[index], {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    } else {
      setCurrentNumber((prev) => prev + 1);
      setGuessesLeft(3);
    }
    Animated.timing(animations.flipAnimations[index], {
      toValue: isCurrentlyFlipped ? 180 : 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

    setFlippedCards((prev) => {
      if (!isCurrentlyFlipped) {
        return [...prev, index];
      } else {
        return prev.filter((i) => i !== index);
      }
    });
  };

  const { width } = useWindowDimensions();
  const cardsPerRow = Math.sqrt(numCards);
  const gapSize = 10;
  const containerPadding = 10;
  const availableWidth = width - containerPadding * 2;
  const cardDim = (availableWidth - (cardsPerRow - 1) * gapSize) / cardsPerRow;

  return (
    <>
      <View style={styles.cardsContainer}>
        {Array.from({ length: numCards }, (_, index) => {
          const number = numberedCardIndices.includes(index)
            ? numberedCardIndices.indexOf(index) + 1
            : null;

          if (!animations.flipAnimations[index] || !animations.cardColors[index]) {
            return null;
          }

          const frontAnimatedStyle = {
            transform: [
              {
                rotateY: animations.flipAnimations[index].interpolate({
                  inputRange: [0, 180],
                  outputRange: ["0deg", "180deg"],
                }),
              },
            ],
          };

          const backAnimatedStyle = {
            transform: [
              {
                rotateY: animations.flipAnimations[index].interpolate({
                  inputRange: [0, 180],
                  outputRange: ["180deg", "360deg"],
                }),
              },
            ],
          };
          const backColor = {
            backgroundColor: animations.cardColors[index].interpolate({
              inputRange: [0, 1],
              outputRange: ["white", "#FF0032"],
            }),
          };
          return (
            <Pressable onPress={() => flipCard(index)} key={index}>
              <View
                style={[
                  styles.cardContainer,
                  { width: cardDim, height: cardDim },
                ]}
              >
                <Animated.View
                  style={[styles.card, styles.cardFront, frontAnimatedStyle]}
                >
                  {number !== null && (
                    <Text style={styles.cardText}>{number}</Text>
                  )}
                </Animated.View>

                <Animated.View
                  style={[
                    styles.card,
                    styles.cardBack,
                    backAnimatedStyle,
                    { ...backColor },
                  ]}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: 10,
    rowGap: 10,
  },
  cardContainer: {
    perspective: 1000,
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardFront: {
    backgroundColor: "#5B84D9",
  },
  cardBack: {
    backgroundColor: "white",
  },
  cardText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Cards;