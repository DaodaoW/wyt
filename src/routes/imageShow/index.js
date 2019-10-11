import React, { Component } from 'react';
import { DivS, DivK, DivC } from './styled';
import one from '../../assets/imageShow/1.jpg';
import two from '../../assets/imageShow/2.jpg';
import three from '../../assets/imageShow/3.jpg';
import four from '../../assets/imageShow/4.jpg';
import five from '../../assets/imageShow/5.jpg';
import six from '../../assets/imageShow/6.jpg';

const imgArray = [
  {
    img: one,
    poetry: '<p>相思<br>唐代：王维<br>红豆生南国，<br>春来发几枝。<br>愿君多采撷，<br>此物最相思。<br></p>'
  }, 
  {
    img: two,
    poetry: '<p>相思<br>唐代：王维<br>红豆生南国，<br>春来发几枝。<br>愿君多采撷，<br>此物最相思。<br></p>'
  },
  {
    img: three,
    poetry: '<p>相思<br>唐代：王维<br>红豆生南国，<br>春来发几枝。<br>愿君多采撷，<br>此物最相思。<br></p>'
  },
  {
    img: four,
    poetry: '<p>相思<br>唐代：王维<br>红豆生南国，<br>春来发几枝。<br>愿君多采撷，<br>此物最相思。<br></p>'
  },
  {
    img: five,
    poetry: '<p>相思<br>唐代：王维<br>红豆生南国，<br>春来发几枝。<br>愿君多采撷，<br>此物最相思。<br></p>'
  },
  {
    img: six,
    poetry: '<p>相思<br>唐代：王维<br>红豆生南国，<br>春来发几枝。<br>愿君多采撷，<br>此物最相思。<br></p>'
  },
];

class ImageShow extends Component{
  constructor(props) {
    super(props);
    this.state = {
      firstAngleArray: [0, 0, 0, 0, 0, 0],
      nextAngleArray: [0, 0, 0, 0, 0, 0],
      firstPlaceLeftArray: [0, 0, 0, 0, 0, 0],
      nextPlaceLeftArray: [0, 0, 0, 0, 0, 0],
      firstPlaceTopArray: [0, 0, 0, 0, 0, 0],
      nextPlaceTopArray: [0, 0, 0, 0, 0, 0],
      itemNum: -1,
      front: false,
      chooseImg: {
        firstAngle: null,
        nextAngle: null,
        firstTop: null,
        nextTop: null,
        firstLeft: null,
        nextLeft: null
      }
    }
  }

  componentDidMount() {
    const nextAngleArray = this.getRandom(6, 90);
    const nextPlaceLeftArray = this.getRandom(6, 40);
    const nextPlaceTopArray = this.getRandom(6, 30);
    this.setState({
      nextAngleArray,
      nextPlaceLeftArray,
      nextPlaceTopArray
    })
  }

  change = () => {
    const nextAngleArray = this.getRandom(6, 90);
    const firstAngleArray = this.state.nextAngleArray;
    const nextPlaceLeftArray = this.getRandom(6, 65);
    const firstPlaceLeftArray = this.state.nextPlaceLeftArray;
    const nextPlaceTopArray = this.getRandom(6, 30);
    const firstPlaceTopArray = this.state.nextPlaceTopArray;
    this.setState({
      firstAngleArray,
      nextAngleArray,
      firstPlaceLeftArray,
      nextPlaceLeftArray,
      firstPlaceTopArray,
      nextPlaceTopArray
    })
  }

  getRandom = (num, num2) => {
    let angleArray = []
    for(let i = 0; i < num; i++){
      angleArray.push(parseInt(Math.random() * num2, 10))
    }
    return angleArray;
  }

  gotoCenter = (nextAngle, nextTop, nextLeft, index) => {
    const chooseThis = this.state.itemNum;
    if(chooseThis === index && !this.state.front) {
      this.setState({
        front: true
      })
    }else if(chooseThis === index && this.state.front) {
      this.setState({
        front: false
      })
    }else {
      this.change();
      this.setState({
        itemNum: index,
        chooseImg: {
          firstAngle: nextAngle,
          nextAngle: 0,
          firstTop: nextTop,
          nextTop: 20,
          firstLeft: nextLeft,
          nextLeft: 35
        },
        front: false
      })
    }
  }

  render(){
    const { 
      firstAngleArray, 
      nextAngleArray, 
      firstPlaceLeftArray, 
      nextPlaceLeftArray,
      firstPlaceTopArray,
      nextPlaceTopArray,
      itemNum,
      chooseImg,
      front
    } = this.state;
    return(
      <div>
        {
          imgArray.map((item, index) => {
            const firstAngle = firstAngleArray[index];
            const nextAngle = nextAngleArray[index];
            const firstTop = firstPlaceTopArray[index];
            const nextTop = nextPlaceTopArray[index];
            const firstLeft = firstPlaceLeftArray[index];
            const nextLeft = nextPlaceLeftArray[index];
            return (
              <DivS
                zIndex={ itemNum === index ? 10 : 1 }
                firstAngle={ itemNum === index ? chooseImg.firstAngle : firstAngle } 
                nextAngle={ itemNum === index ? chooseImg.nextAngle : nextAngle }
                firstTop={ itemNum === index ? chooseImg.firstTop : firstTop }
                nextTop={ itemNum === index ? chooseImg.nextTop : nextTop }
                firstLeft={ itemNum === index ? chooseImg.firstLeft : firstLeft } 
                nextLeft={ itemNum === index ? chooseImg.nextLeft : nextLeft }
                key={index}
                onClick={() => this.gotoCenter(nextAngle, nextTop, nextLeft, index)}
              >
                <DivK style={{ transform: itemNum === index && front ? 'rotateY(-180deg)' : '' }}>
                  <img src={item.img} alt={index} />
                </DivK>
                <DivC style={{ transform: itemNum === index && front ? 'rotateY(-360deg)' : '' }}>
                  <img src={item.img} alt={index} />
                  <div dangerouslySetInnerHTML={{ __html: item.poetry }}></div>
                </DivC>
              </DivS>
            )
          })
        }
      </div>
    )
  }
}

export default ImageShow;