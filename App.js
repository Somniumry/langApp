import React, { useEffect, useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

// TouchableOpacity -> View 로 바꾼 이유
// Box라는 컴포넌트에 TouchableOpacity기능과 Animated기능 2개를 넣어서 기능 실행이 좋지 않음
// 그래서 View로 바꾸고 Box를 TouchableOpacity로 감싼다
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`

const AnimatedBox = Animated.createAnimatedComponent(Box);

const App = () => {

  const Y = new Animated.Value(0);
  const moveUp = () => {
    Animated.spring(Y, {
      toValue: 200,
      bounciness: 50,
      useNativeDriver: true
    }).start()
  };

  console.log(Y); // animation은 재렌더링을 하지 않기 때문에(state로 값을 넣지 않는다는 뜻) 0으로 표시
  // Y값 확인
  Y.addListener(()=> console.log(Y)); // 애니메이션 값 확인

  return (
    <Container>
      {/* TouchableOpacity로 감싼다. */}
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