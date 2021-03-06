import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, } from 'react-native'
import { Card } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { brown, purple, red, yellow } from '../colors'

export default function Deck(props) {
  const { deck } = useSelector(decks => {
    const deck = decks[props.route.params.deckId]
    return {
      deck
    }
  })

  const startQuiz = () => {
    if (deck && deck.questions.length === 0) {
      alert('Quiz has no questions')
    } else {
      props.navigation.navigate('Quiz', {deckId: props.route.params.deckId})
    }
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.titleCard}>
        <Card.Title h3 h3Style={{color: yellow, fontWeight: '300'}}>
          {deck && deck.title}
        </Card.Title>
        <Card.Divider/>
        <Text style={[styles.center, {color: '#F0B7A4', margin: 30}]}>
          {deck && deck.questions && deck.questions.length} Questions
        </Text>
        <Button 
          style={{backgroundColor: red}}
          text="Start Quiz"
          onPress={() => startQuiz()}
        />
        <Button 
          text="Add Question" 
          onPress={() => props.navigation.navigate('NewQuestion', {deckId: props.route.params.deckId})} 
        />
      </Card>
    </View>
  )
}

export function Button({ onPress, text, style, textStyle }) {
    return (
        <TouchableOpacity
            style={[
                Platform.OS === 'ios' 
                ? styles.iosSubmitBtn 
                : styles.androidSubmitBtn, 
                {marginVertical: 10},
                style
            ]}
            onPress={onPress}
        >
            <Text style={[styles.submitBtnText, textStyle]}>{text}</Text>
        </TouchableOpacity>

    )
}

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
      backgroundColor: brown
  },
  titleCard: {
    textAlign: 'center',
    width: '90%',
    borderRadius: 20,
    borderColor: purple,
    backgroundColor: purple,
    marginVertical: 40,
    shadowColor: yellow,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 9,
    shadowOpacity: 1,
  },
  row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center'
  },
  iosSubmitBtn: {
      backgroundColor: yellow,
      padding: 5,
      borderRadius: 7,
      margin: 5
  },
  androidSubmitBtn: {
      backgroundColor: yellow,
      padding: 5,
      height: 45,
      borderRadius: 5,
  },
  submitBtnText: {
      // color: white,
      fontSize: 20,
      fontWeight: '200',
      textAlign: 'center'
  },
  center: {
      alignSelf: 'center',
      marginLeft: 30,
      marginRight: 30
  }
})