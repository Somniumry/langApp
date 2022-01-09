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
        Animated.parallel([
          onPressOut,
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: true
          }).start()
        ])
      }
    })
  ).current

  const scale = useRef(new Animated.Value(1)).current; // 사각형 크기
  const position = useRef(new Animated.Value(0)).current; // 사각형 위치(가운데)

  const onPressIn = () => { // 사각형 눌렀을 때
    Animated.spring(scale, { toValue: 0.85, useNativeDriver: true }).start()
  }

  const onPressOut = () => { // 누른거 뗐을 때
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