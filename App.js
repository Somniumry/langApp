import React, { useEffect, useRef, useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
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
  const [up, setUp] = useState(false); // 컴포넌트
  const Y = useRef(new Animated.Value(0)).current; // 애니메이션
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    console.log("touch")
    Animated.timing(Y, {
      toValue: up ? 200 : -200,
      useNativeDriver: true
    }).start(toggleUp)
  };

  console.log(">>>", up)

  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox
          style={{
            transform: [{ translateY: Y }],
          }}
        />
      </TouchableOpacity>
    </Container>
  )
};

export default App;