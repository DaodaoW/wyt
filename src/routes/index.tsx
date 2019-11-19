import React from 'react';
import { CheckBox } from './jestTestStudy/checkBox';

class Index extends React.Component<any> {
  render() {
    return(<CheckBox labelOn='On' labelOff='Off' />);
  }
}

export default Index;