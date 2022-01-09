import React, { useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";
import styled from "styled-components/native";
import Icon2 from 'react-native-vector-icons/dist/FontAwesome5';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`

const Card = styled.View`
  background-color: white;
  height: 300px;
  width: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`

const AnimatedCard = Animated.createAnimatedComponent(Card)

export default function App() {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => { position.setValue(dx) },
      onPanResponderGrant: () => onPressIn(),
      onPanResponderRelease: () => {
        onPressOut()
        Animated.spring(position, {
          toValue: 0,
          useNativeDriver: true
        }).start()
      }
    })
  ).current

  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.85, useNativeDriver: true }).start()
  }

  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true })
  }



  return (
    <Container>
      <AnimatedCard
        {...panResponder.panHandlers}
        style={{
          transform: [{ scale }, { translateX: position}]
        }}
      >
        <Icon2 name={"pizza-slice"} size={98} color={"black"} />
      </AnimatedCard>
    </Container>
  )
}