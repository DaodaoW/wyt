import React, { Component } from 'react';
import * as FC from './React-Components';

const Foo: React.FC<{ a: number } & FC.ThemeProps> = props => (
  <div style={{ color: props.primary }}>这是高阶组件的使用</div>
);
const FooWithTheme = FC.withTheme(Foo);

class Study extends Component {
  render() {
    return (
      <>
        <FC.Layout.Footer>
          <div>这是FC.LayOut.Footer</div>
        </FC.Layout.Footer>
        <FC.FCOne>
          <span>这是FC.FCOne</span>
        </FC.FCOne>
        <FC.FCTwo />
        <FC.Counter defaultCounts={1} />
        <FC.Counter.Footer>
          <div>这是类组件中的子组件</div>
        </FC.Counter.Footer>
        <FooWithTheme a={1} />
      </>
    )
  }
}

export default Study;