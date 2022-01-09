import React, { useRef, useState } from "react";
import { Animated, PanResponder, Text, View } from "react-native";
import styled from "styled-components/native";
import Icon2 from 'react-native-vector-icons/dist/FontAwesome5';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import icons from './icons'

// Style
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
  position: absolute;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
`

const Btn = styled.TouchableOpacity`
  margin: 0px 20px;
`

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`

export default function App() {
  // Values
  const scale = useRef(new Animated.Value(1)).current;

  const position = useRef(new Animated.Value(0)).current;

  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
  });

  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp"
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
  const goLeft = Animated.spring(position, {
    toValue: -500,
    useNativeDriver: true,
  })
  const goRight = Animated.spring(position, {
    toValue: 500,
    useNativeDriver: true,
  })

  console.log("!!!!", icons)
  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, // 터치감지
      onPanResponderMove: (_, { dx }) => { // 움직임감지
        console.log(dx);
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn.start(), // start
      onPanResponderRelease: (_, { dx }) => { // finish
        console.log(dx)
        if (dx < -270) {
          goLeft.start();
        } else if (dx > 270) {
          goRight.start();
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;

  const [index, setIndex] = useState(0);

  // position.setValue(0)으로 인하여 카드 무한정 나오는 듯한 표현가능(현 카드 2장임)
  const onInfiniti = () => {
    scale.setValue(1);
    position.setValue(0);
    setIndex((prev) => prev + 1)
  }
  
  // start안에 onInfiniti 함수 넣음
  const canclePress = () => { goLeft.start(onInfiniti) }
  const checkPress = () => { goRight.start(onInfiniti) }

  return (
    <Container>
      <CardContainer>
        <Card
          style={{ transform: [{ scale: secondScale }] }}>
          <Icon2 name={"beer"} size={98} color={"black"} />
          <Text style={{color: "black"}}>Back Card</Text>
          {/* <Icon2 name={icons[index+1]} size={98} color={"black"} /> */}
        </Card>
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
          <Text style={{color: "black"}}>Front Card</Text>
          {/* <Icon2 name={icons[index]} size={98} color={"black"} /> */}
        </Card>
      </CardContainer>
      <BtnContainer>
        <Btn onPress={canclePress}>
          <Icon name={"thumbs-o-down"} size={52} />
        </Btn>
        <Btn onPress={checkPress}>
          <Icon name={"thumbs-o-up"} size={52} />
        </Btn>
      </BtnContainer>
    </Container>
  )
}