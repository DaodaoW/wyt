interface CImg {
  firstAngle: any;
  nextAngle: any;
  firstTop: any;
  nextTop: any;
  firstLeft: any;
  nextLeft: any;
}

export interface DefaultState {
  firstAngleArray: Array<number>;
  nextAngleArray: Array<number>;
  firstPlaceLeftArray: Array<number>;
  nextPlaceLeftArray: Array<number>;
  firstPlaceTopArray: Array<number>;
  nextPlaceTopArray: Array<number>;
  itemNum: number;
  front: boolean;
  chooseImg: CImg;
}