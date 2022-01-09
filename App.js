import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, TouchableOpacity } from "react-native";
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`

const AnimatedBox = Animated.createAnimatedComponent(Box);

const App = () => {
  console.log("실행")
  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(0)).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    console.log("touch")
    Animated.timing(Y_POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: false,
      duration: 1000,
    }).start(toggleUp)
  };

  const opacity = Y_POSITION.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.5, 1]
  })

  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  const rotation = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"]
  })

  const bgColor = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"]
  })

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            backgroundColor: bgColor,
            transform: [
              { rotateY: rotation },
              { translateY: Y_POSITION }],
          }}
        />
      </Pressable>
    </Container>
  )
};

export default App;