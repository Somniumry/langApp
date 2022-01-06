import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Box = styled.TouchableOpacity`
  background-color: tomato;
  width: 200px;
  height: 200px;
`

const AnimatedBox = Animated.createAnimatedComponent(Box);

const App = () => {

  const [y, setY] = useState(0); // y축을 0으로 셋팅
  const [intervalId, setIntervalId] = useState(null);

  // 박스를 터치 시 이동하기 위한 함수
  const moveUp = () => {
    // 0.01초?마다 1px씩 이동
    const id = setInterval(() => setY((prev) => prev + 1), 1);
    setIntervalId(id);
  }

  useEffect(() => {
    if (y === 200) {
      clearInterval(intervalId)
    }
  }, [y, intervalId]);

  return (
    <Container>
      <AnimatedBox
        onPress={moveUp}
        style={{
          transform: [{ translateY: y }],
        }}
      />
    </Container>
  )
};

export default App;