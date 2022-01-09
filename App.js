import React, { useEffect, useState } from 'react';
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
  const Y = new Animated.Value(0); // 애니메이션
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    Animated.timing(Y, {
      toValue: 200,
      useNativeDriver: true
    }).start(toggleUp)
  };

  // 현 코드 실행 설명
  /*
  moveUp 함수 실행
   애니메이션(timing)실행 된 후 toggleUp 함수가 실행됨
   toggleUp 함수는 컴포넌트 상태관리 변경에 대한 함수이다
   -> toggleUp 함수를 실행할 때마다 컴포넌트가 재렌더링 된다는 뜻

  그렇기 때문에 moveUp 함수를 실행하고 나온 결과는
  Y위치 0 -> Y위치 200(animation) -> toggleUp 실행 -> 컴포넌트 재렌더링 -> Y=new Animated.Value(0) 재실행 -> Y위치 0
  */

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