import styled from 'styled-components';
import { keyframes } from 'styled-components';

interface IDivSProps {
  zIndex?: number;
  firstAngle?: number;
  firstTop?: number;
  firstLeft?: number;
  nextAngle?: number;
  nextTop?: number;
  nextLeft?: number;
}

const rotate = (firstAngle: any, firstTop: any, firstLeft: any, nextAngle: any, nextTop: any, nextLeft: any) => {
  return keyframes`
    from {
      transform: rotate(${firstAngle}deg);
      top: ${firstTop}%;
      left: ${firstLeft}%;
    }
    to {
      transform: rotate(${nextAngle}deg);
      top: ${nextTop}%;
      left: ${nextLeft}%;
    }
  `
}

// const rotates = (firstAngle, firstTop, firstLeft, nextAngle, nextTop, nextLeft) => {
//   return keyframes`
//     from {
//       transform: rotate(${firstAngle}deg);
//       top: ${firstTop}%;
//       left: ${firstLeft}%;
//     }
//     to {
//       transform: rotate(${nextAngle}deg);
//       top: ${nextTop}%;
//       left: ${nextLeft}%;
//     }
//   `
// }

export const DivK = styled.div`
  padding: 25px 25px 25px 25px;
  position: absolute;
  background-color: #fff;
  perspective: 1000;
  backface-visibility: hidden;
  transition: all 1.5s;
  box-shadow: rgba(50, 50, 50, 0.2) 0 0 15px;
  overflow: hidden;
`

export const DivC = styled.div`
  padding: 25px 25px 25px 25px;
  background-color: #fff;
  perspective: 1000;
  backface-visibility: hidden;
  transition: all 1.5s;
  box-shadow: rgba(50, 50, 50, 0.2) 0 0 15px;
  overflow: hidden;
  display: flex;
  transform: rotateY(-180deg);
  img {
    visibility: hidden;
  }
  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    p {
      margin: 0;
      text-align: center;
      font-size: 22px;
    }
  }
`

export const DivS = styled.div `
  width: auto;
  height: auto;
  margin: 0;
  position: absolute;
  perspective: 500;
  z-index: ${ (props: IDivSProps) => props.zIndex };
  animation: ${
    (props: IDivSProps) => rotate(props.firstAngle, props.firstTop, props.firstLeft, props.nextAngle, props.nextTop, props.nextLeft)
  } 0.8s alternate forwards;
`