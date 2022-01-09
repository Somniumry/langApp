import React, { useRef, useState } from "react";
import { Animated, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import Icon2 from 'react-native-vector-icons/dist/FontAwesome5';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`

const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

// const AnimatedCard = Animated.createAnimatedComponent(Card)

export default function App() {
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
  });

  // Animations
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        console.log(dx);
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderRelease: (_, { dx }) => {
        console.log(dx)
        if (dx < -270) {
          Animated.spring(position, {
            toValue: -500,
            useNativeDriver: true,
          }).start();
        } else if (dx > 270) {
          Animated.spring(position, {
            toValue: 500,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;
  return (
    <Container>
      <Card
        {...panResponder.panHandlers}
        style={{
          transform: [
            { scale },
            { translateX: position },
            { rotateZ: rotation },
          ],
        }}
      >
        <Icon2 name={"pizza-slice"} size={98} color={"black"} />
      </Card>
    </Container>
  )
}