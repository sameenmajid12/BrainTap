  import { Text, View, Animated, Easing, StyleSheet, useWindowDimensions } from "react-native";
import colors from "../colors";
  const getNumCards = (level) => {
    if (level >= 0 && level <= 9) return 9;
    if (level > 9 && level <= 16) return 16;
    if (level > 16 && level <= 25) return 25;
    if (level > 25 && level <= 36) return 36;
    return 49;
  };

  const Cards = ({ level }) => {
    const numCards = getNumCards(level);
    const { width } = useWindowDimensions();
    const cardsPerRow = Math.sqrt(numCards);
    const gapSize = 10;
    
    const containerPadding = 10; 
    const availableWidth = width - containerPadding * 2;
    const cardDim = (availableWidth - (cardsPerRow - 1) * gapSize) / cardsPerRow;
    const arr = Array.from({ length: numCards }, (_, i) => i);
    const numberedCardIndices = [];
    while (numberedCardIndices.length < Math.min(level + 1, numCards)) {
      const randomIndex = Math.floor(Math.random() * numCards);
      if (!numberedCardIndices.includes(randomIndex)) {
        numberedCardIndices.push(randomIndex);
      }
    }
    return (
      <View style={styles.cardsContainer}>
        {arr.map((index) => {
          const number = numberedCardIndices.includes(index)
            ? numberedCardIndices.indexOf(index)
            : null;
          return <View style={[styles.cards,{width:cardDim,height:cardDim, aspectRatio:1}]} key={index}>{number !== null && <Text style={styles.cardText}>{number}</Text>}</View>;
        })}
      </View>
    );
  };
  const styles=StyleSheet.create({
    cardsContainer:{
      flex:0.6,
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'center',
      columnGap:10,
      rowGap:10
    },
    cards:{
      backgroundColor:'#5B84D9',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10
    },
    cardText:{
      fontSize:35,
      color:colors.text,
      fontWeight:'700'
    }
    
  })
  export default Cards;
