import React, { PropsWithChildren } from 'react';
import one from '../../assets/imageShow/1.jpg';
import './style.css';

/*
 * 函数组件(function component)，也叫无状态组件、展示型组件，部分时候也叫纯函数组件。
 * 是一种非常常见的react组件，主要用于展示UI,
 * 和类组件(class component)相比,函数组件中不能使用this.state以及setState();
 * 备注：要使函数组件中能拥有自己的状态，可以使用React Hooks;
 * Props类型命名：以ComponentNameProps形式命名；
*/

/*
 * 1.优先使用FC类型(FC是FunctionComponent的简写)进行函数组件声明，配合TypeScript;
 * 这个类型定义了默认的props(如children)以及一些静态属性(如defaultProps);
*/
interface FCOneProps {
  logo?: string; // 声明为可选属性
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
}

export const FCOne: React.FC<FCOneProps> = (props = {logo: one}) => { // 给props属性logo添加默认值
  return (
    <>
      <div>这是FC.One</div>
      <p>{props.logo}</p>
    </>
  )
}

// 另一种给props属性logo添加默认值的方法；
export const FCTwo = ({logo}: React.PropsWithChildren<FCOneProps>) => {
  return <p>{logo}</p>
}
FCTwo.defaultProps = { logo: '这是FC.FCTwo' } as Partial<FCOneProps>;
// Partial类型映射，属性不完整也不会报错; tsx语法中必须使用'值 as 类型'进行类型断言;

/*
 * 2.不使用FC类型来声明函数组件的时候，可以直接使用普通函数来进行组件声明；
*/
interface ComFunProps {
  logo?: string;
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
  // 手动声明children;
  // this.props.children获取当前组件中所有子节点;
  children?: React.ReactNode;
}

// 不要直接使用export default导出用箭头函数声明的函数组件；
// 要使用export default导出组件时就使用function定义；
export const ComFun = (props: ComFunProps) => {
  const { logo = one, className, alt } = props;
  return (
    <>
      <div style={{width: 200}}>
        {props.children}
      </div>
      <img src={logo} className={className} alt={alt} />
    </>
  )
}

export function ComFunS(props: ComFunProps) {
  const { logo = one, className, alt } = props;
  return (
    <img src={logo} className={className} alt={alt} />
  )
}

/*
 * 3.泛型函数组件,在列表型或容器型的组件中比较常用,直接使用FC无法满足需求;
*/
interface ListProps<T, S> {
  logo: S;
  list: T[];
  renderItem: (item: S, index: number) => React.ReactNode;
}

export function List<T, S>(props: ListProps<T, S>) {
  return (
    <div>
      {props.renderItem(props.logo, 2)}
    </div>
  )
}

/*
  * 泛型函数组件使用
  * export function Test() {
  *   return (
  *    <List
  *      list={[1, 2, 3]}
  *      logo='hello'
  *      renderItem={(key, index) => {
  *        return (<div>{key}{index}</div>)
  *      }}
  *    />
  *  )
  * }
  * Test();
*/

// 配合高阶组件(如React.memo())的泛型函数组件
export const ListS = React.memo(props => {
  return <div>hello wodrld</div>
}) as (<T, S>(props: ListProps<T, S>) => React.ReactElement)
/*
 * React.memo()的作用，和PureComponent相似，可以帮助我们控制何时重新渲染组件
 * 组件仅在它的props发生改变的时候进行重新渲染。
 * PureComponent要依靠class才能使用，而react.memo()可以和函数组件一起使用。
*/

// 子组件声明,类似Parent.Child的形式;
interface LayoutProps {
  parent?: string;
  // children?: React.ReactElement; 不使用React.PropsWithChildren就要在接口中声明children属性
}

interface LayoutHeaderProps {
  child?: string
} // 采用ParentChildProps形式命名

interface LayoutFooterProps {
  child?: string
}

export function Layout(props: React.PropsWithChildren<LayoutProps>) {
  return <div className='layout'>{props.children}</div>
}

Layout.Header = (props: PropsWithChildren<LayoutHeaderProps>) => {
  return <div className='header'>{props.children}</div>
}

Layout.Footer = (props: PropsWithChildren<LayoutFooterProps>) => {
  return (
    <div className='footer'>
      {props.children}
      <span>hello Footer</span>
    </div>
  )
}

/*
 * 使用:
 * <Layout>
 *  <Layout.Header></Layout.Header>
 *  <Layout.Footer></Layout.Footer>
 * </Layout>
*/






/*
 * 类组件
*/
// 继承Component或PureComponent
export interface CounterProps {
  defaultCounts: number
}

// state组件状态不需要暴露
interface State {
  count: number
}

export class Counter extends React.Component<CounterProps, State> {
  /*
   * 默认参数,静态属性，直接通过类来调用
   * Typescript 3.0开始支持对使用 defaultProps 对 JSX props 进行推断,
   * 在 defaultProps 中定义的 props 可以不需要'?'可选操作符修饰;
  */
  static defaultProps = {
    defaultCount: 10
  };

  // 类组件可以使用静态属性形式声明子组件
  static Header = ComFun;
  static Footer = ComFun;

  state = {
    count: Counter.defaultProps.defaultCount
  };

  componentDidMount() {}
  componentWillUnmount() {}
  componentDidCatch() {}
  componentWillUpdate(prevProps: CounterProps, prevState: State) {}

  render() {
    return (
      <div>
        <p>{Counter.defaultProps.defaultCount}</p>
        {this.state.count}
        <button onClick={this.testFunc}>点击</button>
      </div>
    )
  }

  /*
   * 组件私有方法不暴露；
   * 使用类实例属性+箭头函数形式绑定this
   */
  private testFunc = () => {
    this.setState({count: this.state.count + 1});
  }
}

// 类组件结合泛型
export class CounterS<T, S> extends React.Component<ListProps<T, S>> {
  render() {
    return (<div>这是使用了泛型的类组件</div>)
  }
}







/*
 * 高阶组件
 */

export interface ThemeProps {
  primary: string;
  secondary: string;
}

// 给指定组件注入主题
/*
 * React.ComponentType<P & ThemeProps>是reacct.FC<P & ThemeProps>和React.ClassComponent<P & ThemeProps>的别名
 * 表示传递到高阶HOC组件的可以是类组件或者是函数组件
*/
export function withTheme<P>(Component: React.ComponentType<P & ThemeProps>) {
  // WithTheme暴露自己的Props
  interface OwnProps {
    defaultProps?: number
  }

  // 高阶组件的props，忽略ThemeProps，外部不需要传递这些属性；
  type WithThemeProps = P & OwnProps;

  // 高阶组件
  const WithTheme = (props: WithThemeProps) => {
    // 假设theme从context中获取
    const defaultTheme: ThemeProps = {
      primary: 'red',
      secondary: 'blue'
    };
    return (<Component {...defaultTheme} {...props} />);
  };

  // WithTheme.displayName = `WithTheme${Component.displayName}`;
  return WithTheme;
}

// 重构上面的高阶组件

/*
 * 抽取出通用的高阶组件类型
 */
type HOC<InjectedProps, OwnProps = {}> = <P>(
  Component: React.ComponentType<P & InjectedProps>,
) => React.ComponentType<P & OwnProps>;

export interface ThemePropsS {
  primary: string;
  secondary: string;
}

export const WithThemeS: HOC<ThemeProps> = Component => props => {
  const defaultTheme: ThemePropsS = {
    primary: 'red',
    secondary: 'blue'
  };
  return <Component {...defaultTheme} {...props} />
}

/**
 * 无法完美地使用 ref(可使用React.forwardRef)
 * 高阶组件类型报错很难理解
 */
