---
title: framework
order: 6
type: v3/client
---

## todos

- [ ] [React-router 路由的实现原理](https://github.com/youngwind/blog/issues/109)
- [ ] [react-native, weex实现原理](https://www.jianshu.com/p/5cc61ec04b39)
- [ ] react受控组件与非受控组件的区别
- [ ] [react为什么要实现自己的一套事件系统](https://zhuanlan.zhihu.com/p/27132447)

> [](https://blog.csdn.net/m0_37566424/article/details/78863566)

> [手搓react、react-router、redux](https://github.com/mallow-fight/mini-react)
> 这个仓库中有react、react-router、redux的简单实现。
> 如果想深入了解源码的设计思想，一行行读源码并不是最好的选择，因为源码有很多不需要关注的代码，可以尝试先了解一些设计思想的文章，按照它们的设计思想自己去实现一个简单版本。这样实现的过程中一些疑难点就会引刃而解，对它们是怎么实现的认知也会上升一个档次。

## react

1. 写一个简单版的react最重要的是定义好虚拟DOM树的结构，使用这个结构来适配所有的JSX类型，这样就可以统一操作，不容易出错，处理逻辑复用程度就很高。
2. 其次应该分清各个模块的职责，每个模块之间的功能都是单一且稳定的。
3. 最后是弄清楚树状结构各个层级之间的关系。
4. 主要会用到各种递归以及处理各种类型的DOM元素的差异性。
5. 对比新旧VDOM的算法也挺有意思的，加上一些启发性的算法可以加快对比速度。

## jsx
- 可以任意的在jsx中使用js表达式，要包含在大括号中
- 编译之后，会被转化为普通的js对象，本身也是一种表达式，可以在if或for语句中使用jsx，将它赋值给变量，当作参数传入，最为返回值都可以

### 属性
- 可以用引号来定义以字符串为值的属性
- 使用大括号来定义以js表达式为值的属性

<p class="tip">因为jsx的特性更接近js而不是html，所以react dom使用camelCase小驼峰命名来定义属性的名称，如：class => className、tabindex => tabIndex</p>

### 防注入攻击
- react dom 在渲染之前默认会过滤所有传入的值，可以确保应用不会被注入攻击，所有的内容在渲染之前都被转换成了字符串，可以有效的防止XSS(跨站脚本)攻击。

### 代表Objects
Babel转译器会把jsx转换为一个名为React.createElement()的方法调用，例：
```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
)
```
after Babel get
```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
)
```
React.createElement will do: bugs check, then return Object like:
```js
const element = (
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
)
```

最后生成的对象被称为"react 元素", 它代表所有你在屏幕上看到的东西，通过读取这些对象来构建DOM并保持数据内容一致

## 元素渲染

react当中的元素事实上是普通的对象

### 渲染到dom
通过ReactDOM.render()来将元素渲染到指定的根节点中，例：
```jsx
const element = <h1>Hello, React</h1>
ReactDOM.render(
  element,
  document.getElementById('root')
)
```

### 更新
React中元素都是不可变的，当元素被创建后，你是无法改变其内容或属性的，一个元素就好像是动画里的一帧，它代表应用界面在某一时间点的样子。
可以这样更新界面：
```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

<p class="tip">实际生产中只会调用一次render()</p>

### 更新策略
React DOM首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。
即使我们每秒都创建了一个描述整个UI树的新元素，React DOM也只会更新渲染文本节点中发生变化的内容。

## 组件 & Props

- 组件可以将UI切分成一些独立的、可复用的部件，这样只需要专注于构建每一个单独的部件
- 概念上来讲，它像是函数，可以接受任意的输入值（props），返回一个需要在页面上展示的React元素。

### 定义

#### 函数形式
```jsx
function Welcome(props) {
  return <h1>Hello, {props,name}</h1>
}
```

#### 类形式
```jsx
class Welcome extends React.Component {
  render () {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

### 组件渲染
当React的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件，这个对象称之为`props`。
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
const element = <Welcome name="Mallow" />
ReactDOM.render(
  element,
  document.getElementById('root')
)
```

### 组合组件
```jsx
function App() {
  return (
    <div>
      <Welcome name="mallow" />
      <Welcome name="peter" />
      <Welcome name="alex" />
    </div>
  )
}

ReactDOM.render(
  App,
  document.getElementById('root')
)
```

<p class="tip">组件的返回值只能有一个根元素，所以每次返回都需要用一个根元素包裹所有子元素。</p>

### Props的只读性
无论是使用函数或类来声明一个组件，它绝不能修改它自己的props，例：

#### 纯函数
```js
function sum(a + b) {
  return a + b
}
```

#### 非纯函数
```js
function withdraw(account, amount) {
  account.total -= amount
}
```

所有的React组件必须像纯函数那样使用他们的props，State可以在不违反上述规则情况下，根据用户操作、网络响应或其他状态变化，使组件动态响应并改变组件的输出。

## State & 生命周期

### 将函数转换为类
使用类允许我们使用其它特性，例如局部状态（state）、生命周期钩子
```jsx
class Clock extends React.Component {
  render() {
    return {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.props.date.toLocaleTimeString()}.
        </div>
      )
    }
  }
}
```

### 添加局部状态
将date从属性移动到状态中：
```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {date: new Date()}
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}
```

### 添加生命周期钩子
- 装载过程（`Mount`）：第一次把组件渲染到DOM树的过程
  - `constructor`：构造函数，经常是为了初始化`state`或者绑定成员函数的`this`环境

  - `componentWillMount`：预装载函数，不能进行修改`state`的操作，即使做了，也不会进行数据状态的渲染。在该函数中做的操作，都可以提前到构造函数中，比较鸡肋。

  - `render`：渲染函数，唯一不能省略的函数，必须有返回值，返回`null`或`false`表示不渲染任何`dom`元素。它是一个仅仅用于渲染的纯函数，返回值完全取决于`this.state`和`this.props`，不能在函数中任何修改`props`、`state`、拉取数据等具有副作用的操作。`render`函数返回的是`jsx`对象，该函数并不因为这渲染到`DOM`树，何时进行真正的渲染是由`React`库决定的。

  - `componentDidMount`：挂载成功函数，该函数不会在`render`函数调用完成之后立即调用，因为`render`函数仅仅是返回了`JSX`的对象，并没有立即挂载到`DOM`树上，而`componentDidMount`是在组件被渲染到`DOM`树之后被调用的。另外，`componentDidMount`函数在进行服务器端渲染时不会被调用。

  - 在`React`中，除了`render`函数之外，都有默认的函数实现，如果不要使用相应的生命周期函数则可以省略。`constructor`通常用于`state`的初始化操作，`this.state = {}`；函数绑定`this`建议在定义的时候直接使用箭头函数来实现，就不需要在`constructor`函数中进行`this`绑定操作了。`componentWillMount`用的很少，比较鸡肋。`render`函数必须实现，可以返回`null`或`false`来进行不渲染。`componentDidMount`通常用于服务器数据的拉取操作，之所以在`componentDidMount`中而不是在构造函数中进行数据拉取的原因：如果数据拉取回来了，即`props`已经有值了，但是组件还没有渲染出来，会报错。但是这里有一些把数据拉取提前到`constructor`函数的思路：在`constructor`函数中，通过`promise`来进行数据的拉取，并且绑定到`this`对象上，然后在`componentDidMount`中执行`promise`把数据更新到`props`上。

- 更新过程（`Update`）：组件进行渲染更新的过程
  - 当组件挂载到`DOM`树上之后，`props/state`被修改会导致组件进行更新操作，更新过程会以此调用如下的生命周期函数

  - `componentWillReceiveProps(nextProps)`：该函数在组件进行更新以及父组件`render`函数（不管数据是否发生了变化）被调用后执行，`this.props`取得当前的`props`，`nextProps`传入的是要更新的`props`

  - `shouldComponentUpdate(nextProps, nextState)`：返回`bool`值，`true`表示要更新，`false`表示不更新，使用得当将大大提高`React`组件的性能，避免不需要的渲染。

  - `componentWillUpdate`：预更新函数

  - `render`：渲染函数

  - `componentDidUpdate`：更新完成函数

  - 相比装载过程的生命周期函数，更新过程的生命周期函数使用的相对来说要少一些。常用的是`componentWillReceiveProps`、`componentShouldUpdate`，前者经常用于根据前后两个数据去设置组件的状态，而后者则是常用于优化，避免不必要的渲染。

- 卸载过程（`Unmount`）：组件从`DOM`树中删除的过程
  - 卸载过程只涉及一个函数`componentWillUnmount`，当`React`组件要从`DOM`树上删除前，会调用一次这个函数。这个函数经常用于去除`componentDidMount`函数带来的副作用，例如清除定时器、删除`componentDidMount`中创造的非`React`元素。

- `setState`
  - 要修改`state`，只能使用`this.setState()`，不能使用`this.state.value = 2`类似方式设置`state`，一是不会驱动重新渲染，二是很可能被后面的操作替换，造成无法预知的错误。此外，`React`利用状态队列来实现`setState`的异步更新，避免频繁地重复更新`state`。
  - `setState`的调用是有风险的，在某些生命周期函数中调用可能会无用甚至造成循环调用导致崩溃。`state`的初始化一般在构造函数中实现：`setState`可以在装载过程的`componentWillMount`、`componentDidMount`中调用，可以在更新过程中的`componentWillReceiveProps`、`componentDidUpdate`中调用。

- 举例：定时器的添加和删除
```js
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  )
}
componentWillUnmount() {
  clearInterval(this.timerID)
}
```

### 更新状态
```js
tick() {
  this.setState({
    date: new Date()
  })
}
```
直接使用`this.state.comment = 'hello'`不会重新渲染组件，应当使用`this.setState()`，构造函数是唯一一个能够初始化`this.state`的地方。

### 异步状态更新
`this.props`和`this.state`可能是异步更新的，不应该依靠它们的值来计算下一个状态。

下面代码可能无法更新计数器：
```js
this.setState({
  counter: this.state.counter + this.props.increment
})
```

应该这么写：
```js
this.setState((prevState, props) => {
  counter: prevState.counter + props.increment
})
```

### 状态更新合并
React只会单独替换setState中的数据，而不会对state中的其它数据进行替换

### 数据流向
- 自顶向下，单向数据流
- 组件状态隔离，数据由父向子传递

## 事件处理
和dom元素的不同之处：
- React事件绑定属性的命名采用驼峰式命名，而不是小写。
- 如果采用JSX的语法你需要传入一个函数作为事件处理函数，而不是一个字符串

例：
```html
<!-- 传统的HTML -->
<button onclick="activateLasers()">
Activate Lasers
</button>

<!-- React -->
<button onClick={activateLasers}>
Activate Lasers
</button>
```

- 不能使用返回`false`的方式来阻止默认行为，必须明确使用`preventDefault`
- 点击事件或者其他事件的`e`是一个合成事件，`React`根据标准自定义了这些合成事件，所以你不需要担心跨浏览器兼容性问题
- 类的方法默认是不会绑定`this`的，例：
```js
constructor(props) {
  this.handleClick.bind(this) // 如果没有这一步，handleClick中对this的访问会报undefined.
}
handleClick() {
  this.setState(prevState => ({
    isToggle: !prevState.isToggle
  }))
}
```
- 如果不使用bind
```js
handleClick = () => {

}
```
或者(下面这种方法会有性能问题，不推荐使用)
```jsx
return (
  <button onClick={(e) => this.handleClick(e)}>
    Click me
  </button>
);
```

### 传参
事件对象e要放在事件处理程序最后一个参数位置
```jsx
class Popper extends React.Component{
    constructor(){
        super();
        this.state = {name:'Hello world!'};
    }
    
    preventPop(name, e){    // 事件对象e要放在最后
        e.preventDefault();
        alert(name);
    }
    
    render(){
        return (
            <div>
                <p>hello</p>
                {/* Pass params via bind() method. */}
                <a href="https://reactjs.org" onClick={this.preventPop.bind(this,this.state.name)}>Click</a>
            </div>
        );
    }
}
```

## 条件渲染
使用js操作符if或条件运算符来创建表示当前状态的元素，然后让React根据它们来更新UI

- if
- &&
- ||
- ? xx : xxx

### 阻止组件渲染
让render方法返回null或false而不是它的渲染结果就可以实现了

## 列表 & Keys

### 渲染多个组件
```jsx
const numbers = [1, 2, 3, 4, 5]
const listItems = numbers.map(number => <li>{number}</li>)
```

### 基础列表组件
- 需要加上key属性
- 可以嵌套`ul`返回无序列表
```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

### Keys
DOM中某些元素被增加或删除的时候帮助React识别哪些元素发生了变化，通常使用数据的id作为元素的key，当元素没有确定的id时，可以使用他的序列号索引index作为key

- 正确使用方式
map中的元素需要制定key，其它元素不需要指定
```jsx
function ListItem(props) {
  // 对啦！这里不需要指定key:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 又对啦！key应该在数组的上下文中被指定
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

- 元素的Key在他的兄弟元素之间应该唯一
- 可以在jsx中大括号中直接使用map，不过层级多了应该考虑取出来

## 表单

### 受控组件
```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
由于 value 属性是在我们的表单元素上设置的，因此显示的值将始终为 React数据源上this.state.value 的值。由于每次按键都会触发 handleChange 来更新当前React的state，所展示的值也会随着不同用户的输入而更新。

类似的标签：都通过`onChange`方法控制
- textarea
- select
- file input

### 多个输入
当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么，相当于事件代理。
```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    // 相当于
    // var partialState = {};
    // partialState[name] = value;
    // this.setState(partialState);
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

## 状态提升
- 对应任何可变数据理应只有一个单一“数据源”，状态都是首先添加在需要渲染数据的组件中，此时，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的父组件中。你应该在应用中保持自上而下的数据流，而不是尝试在不同组件中同步状态。
- 好处：可以更快的寻找和定位bug，因为组件的状态数据，也只有它自己能够操作这些数据，发生bug的范围就被大大地减小了。此外，你也可以使用自定义逻辑来拒绝或者更改用户的输入。

## 组合和继承
- 组合：可以通过props.children访问父组件中包含的元素，类似于vue中访问插槽中的数据
- 继承：暂时不考虑，无应用场景

## 深入jsx
本质上来讲，JSX 只是为 React.createElement(component, props, ...children) 方法提供的语法糖。

### React必须声明
由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量。

### 模块化
你还可以使用 JSX 中的点表示法来引用 React 组件。你可以方便地从一个模块中导出许多 React 组件。就是把多个元素放在同一个对象中，引用这个对象的值。

### 首字母大写
当元素类型以小写字母开头时，它表示一个内置的组件，如 <div> 或 <span>，并将字符串 ‘div’ 或 ‘span’ 传 递给 React.createElement。 以大写字母开头的类型，如 <Foo /> 编译为 React.createElement(Foo)，并它正对应于你在 JavaScript 文件中定义或导入的组件。

我们建议用大写开头命名组件。如果你的组件以小写字母开头，请在 JSX 中使用之前其赋值给大写开头的变量。
```jsx
import React from 'react';

// 正确！组件名应该首字母大写:
function Hello(props) {
  // 正确！div 是有效的 HTML 标签:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // 正确！React 能够将大写开头的标签名认为是 React 组件。
  return <Hello toWhat="World" />;
}
```

### 在运行时选择类型
```jsx
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 正确！JSX 标签名可以为大写开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

### 使用 JavaScript 表达式
if 语句和 for 循环在 JavaScript 中不是表达式，因此它们不能直接在 JSX 中使用，但是你可以将它们放在周围的代码中。
```jsx
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return <div>{props.number} is an {description} number</div>;
}
```

### 字符串常量
下面jsx表达式都是等价的
```jsx
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />

<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```

### 默认为True
```jsx
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

### 扩展属性
```jsx
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

### 子代
- 在包含开始和结束标签的 JSX 表达式中，标记之间的内容作为特殊的参数传递：props.children。
- false、null、undefined、true都是有效的子代，但它们不会直接被渲染。

## 使用PropTypes进行类型检查
随着应用日渐庞大，你可以通过类型检查捕获大量错误。 对于某些应用来说，你还可以使用 Flow 或 TypeScript 这样的 JavsScript 扩展来对整个应用程序进行类型检查。然而即使你不用它们，React 也有一些内置的类型检查功能。要检查组件的属性，你需要配置特殊的 propTypes 属性：
```jsx
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
出于性能原因，propTyeps只在开发模式下进行检查。

## 静态类型检查
像 Flow 和 TypeScript 这样的静态类型检查器可以在运行代码之前识别某些类型的问题。 他们还可以通过添加自动完成功能来改善开发人员的工作流程。 出于这个原因，对于更大的代码库我们建议使用 Flow 或者 TypeScript 来替代 PropTypes。

## Refs & DOM
下面是几个适合使用 refs 的情况：

- 处理焦点、文本选择或媒体控制。
- 触发强制动画。
- 集成第三方 DOM 库
- 如果可以通过声明式实现，则尽量避免使用 refs。

例如，不要在 Dialog 组件上直接暴露 open() 和 close() 方法，最好传递 isOpen 属性。

- 不要过度使用Refs

## 性能优化
- 使用生产版本
- 避免重复渲染，设置shouldComponentUpdate=false来跳过不需要重新渲染的组件，案例：
```jsx
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

- 使用不可突变的数据结构，类似于vue中使用$set或者重新创建一个对象，问题重现：
```js
const a = {}
const b = a
b.t = '111'
console.log(a === b) // true
const c = Object.assign({}, a)
console.log(a === c) // false
const d = Object.assign(a, {})
console.log(a === d) // true
// 为什么不使用遍历来检查对象有没有发生变化，因为遍历所有数据代价太大
```

## 协调
React提供了一组声明式API以让你不必关心每次更新的变化。这使得应用的编写容易了很多，但在React中如何实现并不是很清晰。这篇文章解释了React对比算法的选择以让组件更新可预测并使得高性能应用足够快。

### 目的
- 当你使用React，在单一时间点你可以考虑render()函数作为创建React元素的树。在下一次状态或属性更新，render()函数将返回一个不同的React元素的树。React需要算出如何高效更新UI以匹配最新的树。
- 有一些解决将一棵树转换为另一棵树的最小操作数算法问题的通用方案。然而，树中元素个数为n，最先进的算法 的时间复杂度为O(n^3) 。
- 若我们在React中使用，展示1000个元素则需要进行10亿次的比较。这操作太过昂贵，相反，React基于两点假设，实现了一个启发的O(n)算法：
  - 两个不同类型的元素将产生不同的树。
  - 通过渲染器附带key属性，开发者可以示意哪些子元素可能是稳定的。

### 对比算法

当对比两棵树时，`React`首先比较两个根节点。根节点的`type`不同，其行为也不同。

#### 不同类型的元素
每当根元素有不同类型，`React`将卸载旧树并重新构建新树。从`<a>`到`<img>`或从`<Article>`到`<Comment>`，或从`<Button>` 到 `<div>`，任何的调整都会导致全部重建。

当树被卸载，旧的DOM节点将被销毁。组件实例会调用`componentWillUnmount()`。当构建一棵新树，新的DOM节点被插入到DOM中。组件实例将依次调用`componentWillMount()`和`componentDidMount()`。任何与旧树有关的状态都将丢弃。

这个根节点下所有的组件都将会被卸载，同时他们的状态将被销毁。 例如，以下节点对比之后：
```html
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```
这将会销毁旧的Counter并重装新的Counter。

#### 相同类型的DOM元素
当比较两个相同类型的React DOM元素时，React则会观察二者的属性，保持相同的底层DOM节点，并仅更新变化的属性。
在处理完DOM元素后，React递归其子元素。

#### 相同类型的组件元素
当组件更新时，实例仍保持一致，以让状态能够在渲染之间保留。React通过更新底层组件实例的props来产生新元素，并在底层实例上依次调用componentWillReceiveProps() 和 componentWillUpdate() 方法。
接下来，render()方法被调用，同时对比算法会递归处理之前的结果和新的结果。

#### 递归子节点
- 默认时。当递归DOM节点的子节点，React仅在同一时间点递归两个子节点列表，并在有不同时产生一个变更。
- 使用Keys：key必须在其兄弟节点中是唯一的，而非全局唯一。
  - 万不得已，你可以传递他们在数组中的索引作为key。若元素没有重排，该方法效果不错，但重排会使得其变慢。
  - 当索引用作key时，组件状态在重新排序时也会有问题。组件实例基于key进行更新和重用。如果key是索引，则item的顺序变化会改变key值。这将导致受控组件的状态可能会以意想不到的方式混淆和更新。

### 权衡
牢记协调算法的实现细节非常重要。React可能会在每次操作时渲染整个应用；而结果仍是相同的。为保证大多数场景效率能更快，我们通常提炼启发式的算法。

在目前实现中，可以表明一个事实，即子树在其兄弟节点中移动，但你无法告知其移动到哪。该算法会重渲整个子树。

由于React依赖于该启发式算法，若其背后的假设没得到满足，则其性能将会受到影响：

- 算法无法尝试匹配不同组件类型的子元素。若你发现两个输出非常相似的组件类型交替出现，你可能希望使其成为相同类型。实践中，我们并非发现这是一个问题。

- Keys应该是稳定的，可预测的，且唯一的。不稳定的key（类似由Math.random()生成的）将使得大量组件实例和DOM节点进行不必要的重建，使得性能下降并丢失子组件的状态。

## context
不要仅仅为了避免在几个层级下的组件传递 props 而使用 context，它是被用于在多个层级的多个组件需要访问相同数据的情景。
```jsx
// 创建一个 theme Context,  默认 theme 的值为 light
const ThemeContext = React.createContext('light');

function ThemedButton(props) {
  // ThemedButton 组件从 context 接收 theme
  return (
    <ThemeContext.Consumer>
      {theme => <Button {...props} theme={theme} />}
    </ThemeContext.Consumer>
  );
}

// 中间组件
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
```

## Fragments
React 中一个常见模式是为一个组件返回多个元素。Fragments 可以让你聚合一个子元素列表，并且不在DOM中增加额外节点。
```jsx
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
// or
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

## Portals
- Portals 提供了一种很好的将子节点渲染到父组件以外的 DOM 节点的方式。
- 对于 portal 的一个典型用例是当父组件有 overflow: hidden 或 z-index 样式，但你需要子组件能够在视觉上“跳出（break out）”其容器。例如，对话框、hovercards以及提示框：
```jsx
ReactDOM.createPortal(child, container)
```

## Error Boundaries
过去，组件内的 JavaScript 错误常常会破坏 React 内部状态并在下一次渲染时产生 加密的 错误信息。这些错误总会在应用代码的早期触发，但 React 并没有提供一种方式能够在组件内部优雅地来处理，也不能从错误中恢复。
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

## Web Components
```jsx
const proto = Object.create(HTMLElement.prototype, {
  attachedCallback: {
    value: function() {
      const mountPoint = document.createElement('span');
      this.createShadowRoot().appendChild(mountPoint);

      const name = this.getAttribute('name');
      const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
      ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
    }
  }
});
document.registerElement('x-search', {prototype: proto});
```

## 高阶组件
- 高阶组件（HOC）是react中对组件逻辑进行重用的高级技术。但高阶组件本身并不是React API。它只是一种模式，这种模式是由react自身的组合性质必然产生的。
- 对比组件将props属性转变成UI，高阶组件则是将一个组件转换成另一个新组件。
- Vue通常使用mixin来模拟高阶组件

> [Vue高阶组件](https://juejin.im/entry/5a524420f265da3e2e6252c5)

## Render Props
术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 在 React 组件间共享代码的简单技术。

## code-splitting

### 打包
大多数 React 应用都会通过类似 Webpack 或 Browserify 构建自己的文件 “包（bundled）”。构建是一个将文件引入并合并到一个单独文件：“包（bundle）” 的环节。该包包含在一个 web 页面上用以立刻加载整个应用。

### 代码分隔
打包非常棒，但随着你的应用增长，你的代码包也将随之增长。尤其是如果你包含了体积大的第三方库。你需要关注你代码包中所包含的代码以避免体积过大而使得加载时间过长。

为了避免清理大体积的代码包，在一开始就解决该问题并开始对代码包进行分割则十分不错。代码分割是由如 webpack 和 Browserify（通过 factor-bundle）等打包器支持的一项能够创建多个包并在运行时动态加载的特性。

代码分割你的应用能够帮助你“懒加载”当前用户所需要的内容，能够显著地提高你的应用性能。尽管你不用减少你的应用中过多的代码体积，你仍然能够避免加载用户永远不需要的代码，并在初始化时候减少所需加载的代码量。

## 实现和理念
> [toRead](https://doc.react-china.org/docs/implementation-notes.html)

## react-router

> 这几种方式可以封装成同一个API，比如history库。这样有利于逻辑的复用，而且不容易出错。

### hash

1. 监听hashchange。
2. 根据hashchange之后的newUrl匹配对应的path。
3. 渲染匹配到的path对应的component。
4. 如果是初次渲染有hash的url，直接匹配渲染。

### history

1. 主要难点在怎么监听pushState，然后更新对应的路由。
2. 得维护一个实例数组，在route组件willMount的时候注册这个实例（也就是this），unMount的时候取消注册这个实例（也就是从数组中删除）。
3. 还有注意一下浏览器本身的前进后退等行为，这个一样可以被监听到。

### memory

1. 将router对象存在服务器内存中。
2. 当浏览器访问对应路由时，会去服务器内存中读取对应路由的配置。
3. 将配置中的组件返回给前端，完成首屏渲染。
4. 一般只是首次渲染使用ssr，后续会交给浏览器作为一个spa应用。

## redux

1. 主要有有这些api：connect、getState、commit、dispatch。
2. connect用于将一些store里面的值或者通用方法映射到props上，方便调用。
3. getState，获取store里面的值。
4. 疑难点在如何dispatch之后去更新视图，可能的做法是实例将挂载阶段注册实例到一个全局数组中，在commit的时候，当更新完store里面对应的值之后，去遍历这个实例数组，如果实例的props中有对应store里面的key，就修改这个实例render的上下文，在forceUpdate，达到同步更新视图的目的。

## antd

### form

#### FormCreator

1. FormList：数组，里面每一个元素都是一个指定类型的表单元素。
2. touchAction：函数，代理了所有表单元素的交互事件，参数有Form，以及交互产生的值。通过Form来修改其他表单元素的值，通过修改state中的FormList来修改options等配置选项。

- 优点：表单联动很方便，事件驱动，更容易控制事件触发动作。
- 缺点：扩展组件写起来略麻烦，每个事件都要代理touchAction，业务逻辑分离不太好做，不熟悉的人不太容易上手。

#### FormBuilder

1. 格式化Props为Form和FormItems需要的属性。
2. 将格式化之后的属性通过Provider给到Control中的Consumer。
3. Control消费Consumer来控制显示的表单元素。

- 优点：减少代码量
- 缺点：联动非常难，代码比较混乱，维护和拓展比较难，嵌套比较多。

#### FormItems

1. 只渲染Form.Items。
2. 通过renderMap拓展表单元素类型。

- 优点：减少代码量，实现简单，结构清晰，可以很方便的扩展表单元素类型，各个类型隔离性比较好。
- 缺点：刚开始，表单元素类型没有那么多，没有那么成熟。

#### 最佳实践

1. 同一个页面使用一个表单。
2. config属性尽量贴近原生。
3. 通过form对象来修改表单的值，通过修改state模版来修改诸如options之类的配置项。

#### 已完成

1. 大部分表单类型。
2. 提示和校验中文化。

#### 待开发

1. 可封装一个类型使得枚举类无感知嵌入。
2. 更方便修改options等配置项。
3. 更多类型。

#### 意见收集

1. 是否需要使用到Provider和Consumer

## vue

> [官网](https://cn.vuejs.org/v2/guide/installation.html)

> [主流框架原理](../questions/framework.html#vue)

> 通过阅读官网来了解一些基础知识，为以后深入了解做铺垫。

## vue采用虚拟dom的作用

> [知乎](https://www.zhihu.com/question/271485214)

**能够书写html已经远远不能满足我们现代工业的需求，我们需要一种机制：**

  1. 能够声明式的书写html

  1. 能够在js中书写html

  1. 能够小粒度的复用我们这些”html“

### 目的

1. Vue2.0引入vdom的主要原因是vdom把渲染过程抽象化了，从而使得组件的抽象能力得到提升，并且可以适配DOM以外的渲染目标。

1. 不再依赖HTML解析器进行模版解析，可以进行更多的AOT工作提高运行时效率：通过模版AOT编译（就是webpack），Vue的运行时体积可以进一步压缩，运行时效率可以进一步提升。

1. 可以渲染到DOM以外的平台，实现SSR、同构渲染这些高级特性，Weex等框架应用的就是这一特性。

### 理解

- 很多人喜欢把数据的更新和虚拟DOM进行强行绑定，实际上数据是否更新跟虚拟DOM关系真的不大。

- 虚拟DOM只有在HTML tag（或者是VDOM的node type）剧烈变化时才会体现他的好处：局部替换HtML tag（替换vnode）。任你数据怎么变都好，其实DOM本身根本不懂你数据是否变化。

- 引入虚拟DOM的最大好处：

  1. 组件的高度抽象化（比如使用render函数）

  1. 更好的实现SSR，同构渲染等

  1. 框架跨平台

### 自己的理解

- 可以在下一个tick之前收集更新部分，统一更新视图，这样避免了重复渲染和重绘

### 其它

- 粒度过细的依赖收集会更占用内存，Vue 计划从defineProperty 升级到 Proxy 也是能减少内存占用，当然也能减少代码量。虚拟 DOM 的 Diff 是 CPU 密集型运算，占用内存更少，跟依赖收集可正交使用，比如哪个组件触发了 Getter/Setter Diff 哪个子组件（DOM 树是一种典型的分形结构）此处跟 React 加入 ShouldUpdateComponent 的跳过子组件 Diff 相似或者说正好相反。况且，有时触发了 G/S 但数据没变的情况不在少数，比如列表的洗牌、反转、旋转操作，所以 Vue 也能用 Immutable.js。当然有些东西不是绝对，就如模板也能编译成虚拟 DOM，非虚拟 DOM 也能做 View Model 的 Diff（Angular）

- defineProperty是以属性为纬度，proxy是以对象为维度，同时无需hack（侵入）数组

## vue-router

### 使用`vue-router`改变`:id`会调用哪些生命周期

- `beforeUpdate` -> `updated`，只是针对虚拟dom打补丁

## vue-笔记

### 数据和方法

- 使用`Object.freeze()`会阻止修改现有的属性，意味着响应系统无法在追踪变化，除了数据属性，Vue实例还暴露了一些有用的实例属性和方法。它们都有前缀`$`，以便与用户定义的属性区分开来。

- 不要在选项属性或者回调上使用箭头函数，因为箭头函数是和父级上下文绑定在一起的。

- `data`中不能定义`$`开头的数据，跟`Vue`冲突，会失效。

- 需要使用函数返回新的对象，以保证每个实例的`data`对象都是独立的

### 生命周期钩子

> 不能使用箭头函数

- `beforeCreate`：在实例初始化之后，数据观测 (`data observer`) 和 `event/watcher` 事件配置之前被调用。这里访问不到`data`，`methods`和`watch`

- `created`: 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (`data observer`)，属性和方法的运算，`watch/event` 事件回调。然而，挂载阶段还没开始，`$el` 属性目前不可见。这一步完成了渲染前的准备动作，真实的`dom`还未渲染。

- `beforeMount`: 在挂载开始之前被调用，相关的 `render` 函数首次被调用。该钩子在服务器端渲染期间不被调用。这一步产生了真实`dom`结构，但是还是没有挂载到真实`dom`节点上。

- `mounted`: `el` 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子。如果 `root` 实例挂载了一个文档内元素，当 `mounted` 被调用时 `vm.$el` 也在文档内。注意 `mounted` 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 `vm.$nextTick` 替换掉 `mounted`。这一步可以使用实例的`$el`属性来修改渲染后的`dom`结构，不过这么做比较低效，因为此时操作的是真实的`dom`

- `beforeUpdate`: 数据更新时调用，发生在虚拟 `DOM` 打补丁之前。这里适合在更新之前访问现有的 `DOM`，比如手动移除已添加的事件监听器。该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。这一步发生在`watch`之后，如果更新的值有`watcher`。更新`data`才会触发，更新`methods`不会触发。

- `updated`: 由于数据更改导致的虚拟 `DOM` 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 `DOM` 已经更新(这意味着`hash`的改变不会导致`mounted`的调用)，所以你现在可以执行依赖于 `DOM` 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 `watcher` 取而代之。注意 `updated` 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 `vm.$nextTick` 替换掉 `updated`

- `activated`: `keep-alive` 组件激活时调用。该钩子在服务器端渲染期间不被调用。

- `deactivated`: `keep-alive` 组件停用时调用。该钩子在服务器端渲染期间不被调用。

- `beforeDestroy`: 实例销毁之前调用。在这一步，实例仍然完全可用。该钩子在服务器端渲染期间不被调用。

- `destroyed`: Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。定时器和延时器不会清除，需要手动清除，最好是在`beforeDestroy`中清除。

- `errorCaptured`: 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

- 生命周期图示

![vue life](https://cn.vuejs.org/images/lifecycle.png)

### 计算属性和侦听器

- 对于任何复杂逻辑，你都应当使用计算属性，而不是模版内的表达式。

- 你可以像绑定普通属性一样在模板中绑定计算属性。`Vue` 知道 `vm.reversedMessage` 依赖于 `vm.message`，因此当 `vm.message` 发生改变时，所有依赖 `vm.reversedMessage` 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 `getter` 函数是没有副作用 (`side effect`) 的，这使它更易于测试和理解。

- 我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

- `Date.now()` 不是响应式依赖。

- 我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 `getter`！如果你不希望有缓存，请用方法来替代。

- `Vue` 提供了一种更通用的方式来观察和响应 `Vue` 实例上的数据变动：侦听属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch` —— 特别是如果你之前使用过 `AngularJS`。然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调。细想一下这个例子：

- 计算属性默认只有 `getter` ，不过在需要时你也可以提供一个 `setter`

- 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 `Vue` 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

- 计算属性的结果会被缓存，除非依赖的响应式属性出现更新，非响应式属性不能触发自动更新操作

### template渲染

- 有`render`函数，该选项会被忽略。

- 模板将会 替换 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。

- 如果组件是一个函数组件，渲染函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息。

### 绑定HTML Class

- 对象语法

- 可以在这里绑定一个返回对象的计算属性

- 我们可以把一个数组传给`v-bind:class`，以应用一个 `class` 列表

- 当在一个自定义组件上使用 `class` 属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。

- `v-bind:style` 的对象语法十分直观——看着非常像 `CSS`，但其实是一个 `JavaScript` 对象。`CSS` 属性名可以用驼峰式 (`camelCase`) 或短横线分隔 (`kebab-case`，记得用单引号括起来) 来命名

- 直接绑定到一个样式对象通常更好，这会让模板更清晰

- `v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上

- 从 `2.3.0` 起你可以为 `style` 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值

### 条件渲染

- `v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。

- `Vue` 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 `Vue` 变得非常快之外，还有其它一些好处。

- 这样也不总是符合实际需求，所以 `Vue` 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` 属性即可。

- 不同的是带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 `CSS` 属性 `display`。

<p class="tip">注意，v-show 不支持 `<template>` 元素，也不支持 `v-else`。</p>

- `v-if` vs `v-show`

  - `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

  - `v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

  - 相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 `CSS` 进行切换。

  - 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

- 当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。

### 列表渲染

- 我们用 `v-for` 指令根据一组数组的选项列表进行渲染。`v-for` 指令需要使用 `item in items` 形式的特殊语法，`items` 是源数据数组并且 `item` 是数组元素迭代的别名。

- 在 `v-for` 块中，我们拥有对父作用域属性的完全访问权限。`v-for` 还支持一个可选的第二个参数为当前项的索引，形式（`v-for="(item, index) in items"`）。

- 你也可以用 `v-for` 通过一个对象的属性来迭代，形式（`v-for="(value, key) in object`"）。

<p class="tip">在遍历对象时，是按 `Object.keys()` 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的。</p>

- 当 `Vue.js` 用 `v-for` 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，`Vue` 将不会移动 `DOM` 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 `Vue 1.x` 的 `track-by="$index"` 。

- 这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 `DOM` 状态 (例如：表单输入值) 的列表渲染输出。

- `Vue` 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：
    `push()`
    `pop()`
    `shift()`
    `unshift()`
    `splice()`
    `sort()`
    `reverse()`
    
- 变异方法 (`mutation method`)，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异 (`non-mutating method`) 方法，例如：`filter()`, `concat()` 和 `slice()` 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组：

- 你可能认为这将导致 `Vue` 丢弃现有 `DOM` 并重新渲染整个列表。幸运的是，事实并非如此。`Vue` 为了使得 `DOM` 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

- 由于 `JavaScript` 的限制，`Vue` 不能检测以下变动的数组：

1. 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`

1. 当你修改数组的长度时，例如：`vm.items.length = newLength`

- 可以使用 `vm.$set` 实例方法，该方法是全局方法 `Vue.set` 的一个别名：

- 为了解决第二类问题，你可以使用 `splice`

- `Vue` 不能检测对象属性的添加或删除：

- 对于已经创建的实例，`Vue` 不能动态添加根级别的响应式属性。但是，可以使用 `Vue.set(object, key, value)` / `vm.$set` 方法向嵌套对象添加响应式属性

- 有时你可能需要为已有对象赋予多个新属性，比如使用 `Object.assign()` 或 `_.extend()`。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性

### 事件处理

- 可以用 `v-on` 指令监听 `DOM` 事件，并在触发时运行一些 `JavaScript` 代码。

- 然而许多事件处理逻辑会更为复杂，所以直接把 `JavaScript` 代码写在 `v-on`指令中是不可行的。因此 `v-on` 还可以接收一个需要调用的方法名称。

- 除了直接绑定到一个方法，也可以在内联 `JavaScript` 语句中调用方法（就是往函数里传参数）

- 有时也需要在内联语句处理器中访问原始的 `DOM` 事件。可以用特殊变量 `$event` 把它传入方法

- `Vue.js` 为 `v-on` 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。

  - `.stop`

  - `.prevent`

  - `.capture`

  - `.self`

  - `.once`

  - `.passive`

- 使用修饰符时，顺序很重要，相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

> 2.1.4 新增

- 不像其它只能对原生的 `DOM` 事件起作用的修饰符，`.once` 修饰符还能被用到自定义的组件事件上。如果你还没有阅读关于组件的文档，现在大可不必担心。

> 2.3.0 新增

- `Vue` 还对应 `addEventListener` 中的 `passive` 选项提供了 `.passive` 修饰符。这个 `.passive` 修饰符尤其能够提升移动端的性能。

<p class="tip">不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你不想阻止事件的默认行为。</p>

  > 你可能注意到这种事件监听的方式违背了关注点分离 (separation of concern) 这个长期以来的优良传统。但不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 v-on 有几个好处：

- 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。

- 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。

- 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。

### 表单输入绑定

- 你可以用 `v-model` 指令在表单 `<input>` 及 `<textarea>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

- 如果 `v-model` 表达式的初始值未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。在 `iOS` 中，这会使用户无法选择第一个选项。因为这样的情况下，`iOS` 不会触发 `change` 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。

- 修饰符
  
  - `.lazy`

  - `.number`

  - `.trim`

### 组件基础

- 因为组件是可复用的 `Vue` 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data、computed、watch、methods` 以及生命周期钩子等。仅有的例外是像 `el` 这样根实例特有的选项。

- 一个组件的 `data` 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝

- 全局注册和局部注册。至此，我们的组件都只是通过 `Vue.component` 全局注册的：

- `Prop` 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 `prop` 特性的时候，它就变成了那个组件实例的一个属性。为了给博文组件传递一个标题，我们可以用一个 `props` 选项将其包含在该组件可接受的 `prop` 列表中：

- 单个根元素

- 子组件调用父组件的方法，使用`this.$emit`

- 插槽

- 动态组件

### Prop

- `HTML` 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 `DOM` 中的模板时，`camelCase` (驼峰命名法) 的 `prop` 名需要使用其等价的 `kebab-case` (短横线分隔命名)，如果你使用字符串模板，那么这个限制就不存在了。

- 如果你想要将一个对象的所有属性都作为 `prop` 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)。例如，对于一个给定的对象 `post`

- 所有的 `prop` 都使得其父子 `prop` 之间形成了一个单向下行绑定：父级 `prop` 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

- 额外的，每次父级组件发生更新时，子组件中所有的 `prop` 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 `prop`。如果你这样做了，`Vue` 会在浏览器的控制台中发出警告。

- 我们可以为组件的 `prop` 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 `Vue` 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

- 将原生事件绑定到组件

- `.sync`

### vm.$watch

- 在变异 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本。

### 插槽

- 插槽内容

```html
<navigation-link url="/profile">
  Your Profile
</navigation-link>
```

`<navigation-link>`:

```html
<a
  :href="url"
  class="nav-link">
  <slot></slot>
</a>
```

- 具名插槽

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

在向具名插槽提供内容的时候，我们可以在一个父组件的 `<template>` 元素上使用 slot 特性：

```html
<base-layout>
  <template slot="header">
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template slot="footer">
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

另一种 `slot` 特性的用法是直接用在一个普通的元素上：

```html
<base-layout>
  <h1 slot="header">Here might be a page title</h1>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <p slot="footer">Here's some contact info</p>
</base-layout>
```

我们还是可以保留一个未命名插槽，这个插槽是默认插槽，也就是说它会作为所有未匹配到插槽的内容的统一出口。

- 插槽作用域

### 动态组件 & 异步组件

- 重新创建动态组件的行为通常是非常有用的，但是在这个案例中，我们更希望那些标签的组件实例能够被在它们第一次被创建的时候缓存下来。为了解决这个问题，我们可以用一个 `<keep-alive>` 元素将其动态组件包裹起来。

- 处理加载状态

### 处理边界情况

- 循环引用

组件是可以在它们自己的模板中调用自身的。不过它们只能通过 `name` 选项来做这件事：

### 进入/离开 & 列表过渡

- 在 `CSS` 过渡和动画中自动应用 `class`

- 可以配合使用第三方 `CSS` 动画库，如 `Animate.css`

- 在过渡钩子函数中使用 `JavaScript` 直接操作 `DOM`

- 可以配合使用第三方 `JavaScript` 动画库，如 `Velocity.js`

- `Vue` 提供了 `transition` 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡

### 开发插件

- 插件通常会为 `Vue` 添加全局功能。插件的范围没有限制——一般有下面几种：

  - 添加全局方法或者属性，如: `vue-custom-element`

  - 添加全局资源：指令/过滤器/过渡等，如 `vue-touch`

  - 通过全局 `mixin` 方法添加一些组件选项，如: `vue-router`

  - 添加 `Vue` 实例方法，通过把它们添加到 `Vue.prototype` 上实现。

  - 一个库，提供自己的 `API`，同时提供上面提到的一个或多个功能，如 `vue-router`

**Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：**

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```
### 使用插件

通过`Vue.use()`使用插件，第一个参数是插件，第二个参数是选项对象

当一个项目变得很大、很复杂的时候，就会想用到状态管理工具了。
> 它就像眼镜，需要它的时候自然会想到它。

# redux

## 自述

redux时是js状态容器, 提供可预测化的状态管理

1. 构建一致化的应用，运行于不同的环境（客户端/服务器/原生应用）
1. 易于测试

## 要点

1. 应用中所有的state都以一个对象树的形式存储在一个store中
1. 唯一改变state的办法是触发action: 一个描述发生什么的对象
1. 为了描述acton如何改变state树，你需要编写reducers

## 动机

1. 单页应用日益复杂，js需要管理比任何时候都要多的state（状态）
1. state在什么时候，由于什么原因，如何变化已不受控制
1. 前端开发的新需求，如更新优化、服务端渲染、路由跳转前请求数据
1. 变化和异步

## 三大原则

- 单一数据源
整个应用的状态被存储在一棵对象树中，并且这个状态树只存在于唯一一个仓库中

- state是只读的
改变state的唯一方法是提交一个描述发生了什么的动作对象

- 变化由纯函数产生
编写reducers来详细描述状态树是怎么变化的

## Action

- Action 是把数据从应用传到store的有效载荷，它是store数据的唯一来源。
- 当应用规模越来越大时，建议用单独的模块或文件来存放action

## Reducer

- 指定了应用状态的变化如何响应actions并发送到store
- actions只是描述了有事情发生了这一事实，并没有描述应用如何更新state
- 纯函数，接受旧的state和action，返回新的state
- 禁止在reducer中进行以下操作
  - 修改传入参数
  - 执行有副作用的操作，如API请求和路由跳转
  - 调用非纯函数，如Date.now() 或 Math.random()

# vuex

>[官网](https://vuex.vuejs.org/zh/guide/)

## 定义
Vuex是一个专为Vue.js应用开发程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

## 什么是状态管理模式
状态自管理应用包含以下几个部分：

state，驱动应用的数据源；
view，以声明方式将 state 映射到视图；
actions，响应在 view 上的用户输入导致的状态变化。

示意图：
![singleFlow](../../images/singleFlow.png)

## 问题

但是，当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：

1. 多个视图依赖于同一状态。
1. 来自不同视图的行为需要变更同一状态。

- 对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
- 对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，我们的代码将会变得更结构化且易维护。

这就是 Vuex 背后的基本思想，借鉴了 Flux、Redux、和 The Elm Architecture。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。

## 什么情况下我应该使用 Vuex？
虽然 Vuex 可以帮助我们管理共享状态，但也附带了更多的概念和框架。这需要对短期和长期效益进行权衡。
如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 global event bus 就足够您所需了。但是，如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。

[参考资料-Vue官网](https://cn.vuejs.org/v2/guide/comparison.html)

## Vue vs React

### 共同点
- 使用`Virtual DOM`
- 响应式和组件化的视图组件
- 将注意力集中保持在核心库，将其他功能如路由和全局状态管理交给相关的库

### 生态系统
- 目前`React`的生态系统比`Vue`庞大，`Vue`正在赶超

### 运行时性能&优化
#### 共同点
- 运行时非常快，性能好

#### Vue
- 组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。你可以理解为每一个组件都已经自动获得了`shouldComponentUpdate`，并且没有上述子树问题限制
  - 这个特点使得开发者不再需要考虑此类优化，从而能够更好的专注于应用本身

#### React
- 当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树
  - 如要避免不必要的子组件的重渲染，你需要在所有可能的地方使用`PureComponent`，或是手动实现`shouldComponentUpdate`方法。同时你可能会需要使用不可变的数据结构来使得组件更容易被优化
  - 使用`PureComponent`和`shouldComponentUpdate`时，需要保证该组件的整个子树的渲染输出都是由该组件的`props`所决定的。如果不符合这个情况，那么此类优化就会导致难以察觉的渲染结果不一致，这使得`React`中的组件优化伴随着相当的心智负担

### HTML&CSS

#### Vue
- 拥抱经典的`Web`技术，并在其上进行扩展
- 很多主流的`css-in-js`库也都支持`vue`（`styled-components-vue`和`vue-emotion`），设置样式的默认方法是单文件组件里类似`style`的标签
  - 通过`vue-loader`，可以使用任意的预处理器、后处理器，甚至深度集成在`css modules`中

- 也提供了渲染函数，支持`jsx`，但是默认推荐模版。任何合乎规范的`html`都是合法的`vue`模版，优势：
  - 模版比起`jsx`读写起来更自然
  - 基于`HTML`的模版使得将已有应用逐步迁移到`Vue`更容易
  - 更容易上手
  - 可以使用其他模版预处理器，比如：`Pug`、`less`、`jade`等
  - 具有`v-on`等修饰符，可以比`React`更为简洁的实现功能
  - 偏视图表现的使用模版，偏逻辑的使用`jsx`或渲染函数
  - `style`使用`scoped`属性绑定样式

#### React
- 一切都是`js`，不仅仅是`HTML`可以用`JSX`来表达，现在的潮流也越来越多地将`CSS`纳入到`js`中来处理
- 所有的组件的渲染功能都依靠`jsx`，`jsx`是使用`XML`语法来编写`js`的一种语法糖，优势：
  - 使用完整的编程语言`js`功能来构建你的视图页面。比如：临时变量、流程控制、直接引用当前`js`作用域中的值等
  - 开发工具对`jsx`的支持相比于现有可用的其他`Vue`模版还是比较先进的：`linting`、类型检查、编辑器的自动完成

- `CSS-in-JS`：引入了一个新的面向组件的样式范例，和普通的`css`撰写过程是有区别的，虽然在构建时将`css`提取到一个单独的样式表是支持的，但`bundle`里通常还是需要一个运行时程序来让这些样式生效。当你能够利用`js`灵活处理样式的同时，也需要权衡`bundle`的尺寸和运行时的开销

### 规模

#### 共同点
- 都提供了强大的路由来应对大型应用，提供了状态管理工具（`Redux`、`Vuex`）。

#### Vue
- 路由库和状态管理库都是由官方维护支持且和核心库同步更新
- `Vue-cli`
  - 支持配置
  - 提供了各种用途的模版
  - 能使用用户自建的模版构建项目，对企业环境下预先建立协议是特别有用的

#### React
- 路由库和状态管理库交给社区维护，创建了一个更分散的生态系统，相对的，生态系统更加繁荣
- `create-react-app`
  - 不允许在项目生成时进行任何配置
  - 只提供一个构建单页面应用的单一模版
  - 不能使用用户自建的模版构建项目
  - 故意设计这些限制，如果你的项目需求非常简单，就不需要自定义生成过程，你能把它作为一个依赖来更新

### 向下扩展
#### Vue
- 容易上手，可使用外链脚本

#### React
- 需要知道`jsx`和`es2015`，这个也不难

### 原生渲染
#### Vue
- `Weex`

#### React
- `React Native`

## Vue vs AngularJS
### 共同点
- 一些语法相似（`v-if vs ng-if`）

### 复杂性
`Vue`比`Angular`简单的多

### 灵活性和模块化
`Vue`更加灵活开放，不用在任何时候都必须遵循`AngularJS`制定的规则，`Vue`能适用于各种项目，决定权在你手中

### 数据绑定
`AngularJS`使用双向绑定，`Vue`在不同组件间强制使用单向数据流，使得应用中的数据流更加清晰易懂

### 指令和组件
在 `Vue` 中指令和组件分得更清晰。指令只封装 `DOM` 操作，而组件代表一个自给自足的独立单元——有自己的视图和数据逻辑。在 `AngularJS` 中，每件事都由指令来做，而组件只是一种特殊的指令。

### 运行时性能

#### Vue
- 有更好的性能，非常容易优化，不使用脏检查
- 基于依赖追踪的观察系统并且异步队列更新，所有的数据变化都是独立触发，除非它们之间有明确的依赖关系

#### AngularJS
- 当`watcher`越来越多时会变得越来越慢，因为作用域每一次变化，所有`watcher`都要重新计算，如果一些`watcher`触发另一个更新，脏检查循环可能要运行多次。用户常常需要使用深奥的计数来解决脏检查循环的问题，没有简单的方法来优化有大量`watcher`的作用域
- `Angular`和`Vue`用相似的设计解决了一些`AngularJS`中存在的问题

## Vue vs Angular
### 相同点
- 运行速度很快

### Angular
- `ts`
- 体积大、大量`api`、对新手不友好
- 针对大型的复杂应用

### Vue
- 体积小、灵活

## Knockout
- 支持`IE6`

## 原理

### vue
#### 结合生命周期理解
> [Vue生命周期](./vue.html#数据和方法)

#### 深入响应式原理
- 数据模型的改变会更新视图，而数据模型仅仅只是普通的js对象，这使得状态管理变得很简单直接。

- 如何追踪变化：当你把一个普通的js对象传给vue实例的data选项，Vue将遍历此对象所有的属性，并使用`Object.defineProperty`(es5中无法shim的特性，故Vue不支持ie8以及更低版本浏览器)把这些属性全部转为`getter/setter`

- 这些属性对用户来说是不可见的，但是在内部它们让Vue追踪依赖，在属性被访问和修改时通知变化

- 每个组件实例都有相应的`watcher`实例对象，它会在组件渲染过程中把属性记录为依赖，之后当依赖项的`setter`被调用时，会通知`watcher`重新计算，从而使它关联的组件得以更新

![data](../../images/data.png)

## 检测变化的注意事项

受现代`js`的限制（以及废弃`Object.observe`），`Vue`不能检测到对象属性的添加或删除。由于 `Vue` 会在初始化实例时对属性执行 `getter/setter` 转化过程，所以属性必须在 `data` 对象上存在才能让 `Vue` 转换它，这样才能让它是响应的。

解决方式：
1. Vue.set(object, key, value)

1. this.$set(object, key, value)

1. 创建一个新的对象：
  - this.someObject = Object.assign({}, this.someObject, {a: 1, b: 2})

1. 针对数组，不能检测以下变动的数组：

  - 当你利用索引直接设置一个项时：
    - `Vue.set(vm.array, index, newValue)` 

    - `vm.items.splice(index, 1, newValue)` 

    - `this.$set`

  - 当你修改数组的长度时：
    - `splice`

  - 如果数组中某项是对象，设置对象的时
    - `this.items = [].concat(this.items)`

#### 异步更新队列

`Vue` 异步执行 `DOM` 更新。只要观察到数据变化，`Vue` 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 `watcher` 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 `DOM` 操作上非常重要。然后，在下一个的事件循环“`tick`”中，`Vue` 刷新队列并执行实际 (已去重的) 工作。`Vue` 在内部尝试对异步队列使用原生的 `Promise.then` 和 `MessageChannel`，如果执行环境不支持，会采用 `setTimeout(fn, 0)` 代替。例：

```html
<div id="example">{{message}}</div>
<script>
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
</script>
```

### react
#### 虚拟dom

- 一种编程概念，是指虚拟的视图被保存在内存中，并通过诸如ReactDOM这样的库与“真实”的DOM保持同步。这个过程被称为和解。

- 这种编程方法使用了React的声明式API：你需要告诉React你想让视图处于什么状态，React则负责确保DOM与该状态相匹配。因此你在构建你的应用时不必自己去完成属性操作、事件处理、DOM更新，React会替你完成这一切。

- 由于“虚拟DOM”更像一种模式而不是特定的技术，有时候我们也会用它表示其他的意思。在React的世界中，由于 “虚拟DOM” 和 React元素 都是用于表示视图的对象，因此常常被关联在一起。然而React也使用被称为“fibers”的对象来存放组件树的附加信息。在React中，它们也被认为是“虚拟DOM”实现的一部分。

### angular
- 使用脏检查

- 页面庞大时需要调用apply()方法手动触发页面脏检查

#### 脏检查
> [知乎](https://www.zhihu.com/question/43470158)

DI / 双向数据绑定中：
- 用户 -> 内存 ：
  - 浏览器提供有User Event触发事件的API，如click，change...等等等；
  
- 内存 -> 用户：
  - 浏览器并没有提供数据监测的API，故任何内存数据变动（定时、异步请求、事件触发...导致的数据变动）都无法被Listen，自然也就没办法再处理callback了；

  - 但我们可以基于这些大部分能够产生数据变动的事件进行封装（如：click、mouse-enter、Timeout...），在每次事件发生后，执行完事件后，检查一遍数据的变化，如果数据和上次的值有变化，则执行这个值（注册时）对应的callback（框架中），这个callback可能是view层的一个数据展现，也可能是一段处理function；

  - 在检查数据变化的时候，由于你并不知道这个事件是对哪些数据进行了更改，以及这个事件有可能造成事件之外的其他任何地方的数据更改，所以必须进行一次大检查，将所有“注册”过的值全部检查一遍，一次检查称为一个周期，每次最少检查两遍，因为第二遍用来确认，前一遍的变动中是否有数据的变动，导致了其他数据的变动，如果第二次有变动的话，会再执行一遍，直到最后两次完全一致，则停止检查（其实就是个（递归（遍历））的过程），考虑到内存的消耗和死循环的风险，脏检查每个周期最多递归执行10遍，所以在程序结构设计中，尽量避免数据与数据之间的紧耦合；

  - 所以我们看到的
    - ng-click，ng-change，ng-blur...就是对各类用户事件的封装

    - $timeout，$http，$window，$location...就是对各种JS/API事件的封装

    - ng-model，以及控制器中的数据，就是对值的“注册”

    - $scope 本质是一个总的事件逻辑的封装容器，同时抽象为数据载体

  - 实质上数据都存在于浏览器堆内存中
    - $scope.apply() & $scope.digest() 即Angular中的“数据大检查”的function

    - 所以如果我们使用了非Angular封装的事件改编数据时，要手动执行一次大检查
    
    - 由于Angular这种脏检查的方法效率不高，如果一个页面绑定的view超过2000个，就可能存在比较明显的性能问题，官方称之为“脏检查”

## block的使用
可以使用block元素来包含html块而不产生新的view

## 分包目录结构
```text
├── pages
  └── subpages # 所有分包放在这里
    └── model1 # 模块1
      └── assets # model1的静态资源
      └── components # model1的组件
        ├── child1
        └── child2
      └── pages # model1的pages
        ├── page1
        └── page2
      └── utils # 公用的js文件
        ├── index.js # 统一从这里导出
        └── fn.js
    └── model2 # 模块2
      ...
```

## 路由封装
- 如果需要使用新的路由，首先在pathMap中注册一下

- 使用方式(已经在Vue的原型上注册了)
```js
// you can choose what arguments you pass as you need.
this.$goto('your pathName')
```

- 实现原理
```js
/**
 * 所有页面路由封装
 * pathName: 路径名，在pathMap中注册就行了
 * payload: 路径携带的query
 * type: 跳转方式，默认navigateTo
*/
export const goto = (pathName = '', payload = {}, type = 'navigateTo') => {
  const pathMap = {
    pages: {
      main: '/pages/',
      kids: [
        'bulls',
        'lastBet',
        'optionals',
        'recommend',
        'score',
        'search',
        'shareFeedback',
        'shareIndex',
        'stock'
      ]
    },
    subpages: {
      main: '/pages/subpages/',
      kids: [
        'rank/pages/rank'
      ]
    }
  }
  const makePath = () => {
    let finallyPath = ''
    const query = querify(payload)
    const findPath = (kind) => {
      const kidsMap = pathMap[kind].kids
      for (let i = 0; i < kidsMap.length; i++) {
        if (kidsMap[i] === pathName) {
          return pathMap[kind].main + pathName + '/main' + query
        }
      }
    }
    if (pathName.indexOf('/') > -1) {
      finallyPath = findPath('subpages')
    } else {
      finallyPath = findPath('pages')
    }
    if (!finallyPath) return console.error('you have not register ' + pathName + ' in `pathMap`, please register it.')
    return finallyPath
  }
  wx[type]({
    url: makePath()
  })
}
```

## navigator 组件
- 如果使用extra-data，需要使用v-if控制组件的显示和隐藏，在获取数据之后更新extra-data对象，且这个东西初始化必须是一个对象

- 也可以直接拼接path，这种方式比较简单，path初始化为空字符串

## canvas绘制图片

### 如何绘制网络图片
获取网络图片的本地缓存路径，使用这个缓存路径绘制图片就行了
```js
makeLocalPath (cb, imgHttpUrl) {
  wx.getImageInfo({
    src: imgHttpUrl,
    success: function (res) {
      cb(res.path)
    }
  })
}
```

## 分包机制

- 更新package.json
```js
"mpvue-loader": "^1.1.2-rc.5"
"webpack-mpvue-asset-plugin": "^0.1.1"
```

-  修改相应文件

> [根据这个地址修改](https://github.com/mpvue/mpvue-quickstart/pull/39/files)

- 注意事项
  - src之外不能放置其它的静态资源文件夹
  - 注意package.json的更新，一定要是最新版本
  - 图片统一import进来，不要用dist路径
  - pages新增main.json
  ```js
    {
      "navigationBarTextStyle": "white",
      "navigationBarTitleText": "我看涨"
    }
  ```
  - 如何定向
  ```js
  lead2test () {
    wx.navigateTo({
      url: '/pages/test/counter/main'
    })
  }
  ```

- 多个分包
目前全部写在pages，正好可以很方便的公用资源
```js
"subPackages": [
  {
    "root": "pages/countModel",
    "pages": [
      "counter/main",
      "test/main"
    ]
  },
  {
    "root": "pages/rankModel",
    "pages": [
      "rank/main"
    ]
  }
],
```

## 版本更新&兼容

- 判断api是否可用：`wx.canIUse(String)`，根据这个执行相应的兼容策略
- 管理小程序更新：`wx.getUpdateManager()`
  - onCheckForUpdate：callback，当向微信后台请求完新版本信息，会进行回调
  - onUpdateReady：callback，当新版本下载完成，会进行回调
  - onUpdateFailed：callback，当新版本下载失败，会进行回调
  - applyUpdate：当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启

- 检查更新操作由微信在小程序冷启动时自动触发，不需由开发者主动触发，开发者只需监听检查结果即可。

### 示例
```js
const updateManager = wx.getUpdateManager()

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate)
})

updateManager.onUpdateReady(function () {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success: function (res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })

})

updateManager.onUpdateFailed(function () {
  // 新的版本下载失败
})
```

## 生命周期

> 测试环境：`"mpVue": "^1.0.10"`。
> 不要使用`mpVue`自带的生命周期，有时候会出现各种预料之外的`bug`，而且小程序自带的生命周期可以完全满足需求。

### 运行机制
前台、后台定义： 当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，而是进入了后台；当再次进入微信或再次打开小程序，又会从后台进入前台。需要注意的是：只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。

关闭小程序（基础库版本1.1.0开始支持）： 当用户从扫一扫、转发等入口(场景值为1007, 1008, 1011, 1025)进入小程序，且没有置顶小程序的情况下退出，小程序会被销毁。

小程序启动会有两种情况，一种是「冷启动」，一种是「热启动」。 假如用户已经打开过某小程序，然后在一定时间内再次打开该小程序，此时无需重新启动，只需将后台态的小程序切换到前台，这个过程就是热启动；冷启动指的是用户首次打开或小程序被微信主动销毁后再次打开的情况，此时小程序需要重新加载启动。

### 更新机制

小程序冷启动时如果发现有新版本，将会异步下载新版本的代码包，并同时用客户端本地的包进行启动，即新版本的小程序需要等下一次冷启动才会应用上。 如果需要马上应用最新版本，可以使用 wx.getUpdateManager API 进行处理。

### 销毁机制

小程序没有重启的概念
当小程序进入后台，客户端会维持一段时间的运行状态，超过一定时间后（目前是5分钟）会被微信主动销毁
当短时间内（5s）连续收到两次以上收到系统内存告警，会进行小程序的销毁

### 再次打开逻辑

基础库 1.4.0 开始支持，低版本需做兼容处理

用户打开小程序的预期有以下两类场景：

A. 打开首页： 场景值有 1001, 1019, 1022, 1023, 1038, 1056

B. 打开小程序指定的某个页面： 场景值为除 A 以外的其他

当再次打开一个小程序逻辑如下：

上一次的场景 | 当前打开的场景 | 效果
--- | --- | ---
A | A	| 保留原来的状态
B |	A |	清空原来的页面栈，打开首页（相当于执行 wx.reLaunch 到首页）
A 或 B |	B |	清空原来的页面栈，打开指定页面（相当于执行 wx.reLaunch 到指定页）

### App

> 以下钩子函数执行顺序仅限于同步调用，异步调用尽量不要耦合不同钩子函数，会出现依赖失败的情况

- `onShow`: 同步操作，先于`onLaunch`触发，小程序从后台进入前台显示时，会触发
- `onLaunch`: 全局只触发一次，注意：
  - 这里面的异步操作不能耗时过长，不然会出现`pages-onLoad`和`pages-onShow`先于异步操作触发

- `onHide`: 小程序从前台进入后台显示时，会触发
- `onError`: 参数就是报错信息，脚本错误或api调用失败时触发
- `onPageNotFound`: 打开的页面不存在时触发

顺序：
- 首次进入：`onShow` -> `onLaunch`
- 进入后台：`onHide`
- 再次进入：`onShow`
- 页面卸载：
- 再次进入：同首次进入

### Page

- `onLoad`: 第一个触发，有`options`，监听页面加载，一个页面只会调用一次，onLoad 的第一个参数包含页面的query。
- `onShow`: 第二个触发，监听页面显示，每次打开页面都会调用一次。
- `onReady`: 第三个触发，监听页面初次渲染完成，一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。对界面的设置如`wx.setNavigationBarTitle`请在onReady之后设置。
- `onHide`: 先于App()的`onHide`事件触发，当navigateTo或底部tab切换时调用。
- `onUnload`: 监听页面卸载，一般情况下，不存在页面的卸载，除了长时间未进入小程序，或者删掉小程序，当redirectTo或navigateBack的时候调用，使用其它跳转不会使页面卸载，相反，可能存在缓存，点击左上角返回按钮或者手机上的返回按钮，不会触发这个事件。
- `onPullDownRefresh`: 下拉动作，需要先配置可下拉
- `onReachBottom`: 上拉触底事件的回调
- `onShareAppMessage`: 右上角转发
- `onPageScroll`: 页面滚动触发
- `onTabItemTap`: tab页点击tab时触发

顺序：
- 首次进入：`onLoad` -> `onShow` -> `onReady`
- 进入后台：`onHide`
- 再次进入：`onShow`
- 页面卸载：`onUnload`
- 再次进入：同首次进入

### component

- `onLoad`: 监听组件加载，有`options`
- `onReady`: 监听组件初次渲染完成，注意：只会在初次渲染完成后触发一次，如果没有卸载这个组件，则不会再次触发该事件，所以说这个事件和`onShow`不会同时触发，如果没有卸载这个组件，则会触发`onShow`事件
- `onHide`: 监听组件从前台进入后台
- `onShow`: 监听组件从后台进入前台，注意：首次渲染不触发这个事件，切换回这个组件才会触发这个事件
- `onUnload`: 监听组件卸载，当redirectTo或navigateBack的时候调用

顺序：
- 首次加载：`onLoad` -> `onReady`
- 进入后台：`onHide`
- 再次进入：`onShow`
- 卸载：`onUnload`
- 再次进入：同首次加载

### component-child

同`component`

### 总体生命周期钩子调用顺序

> 仅在同步操作情况下
> 调用哪些钩子同上

- 首次加载：`App` -> `pages` -> `component` -> `component-child`
- 进入后台：`pages` -> `component` -> `component-child` -> `App`
- 再次进入：`App` -> `pages` -> `component` -> `componet-child`
- 卸载：`pages` -> `component` -> `componet-child`
- 再次进入：同首次加载

## 上线准备

- 后台安全域名配置
- 提审材料
- 压缩代码（有可能打包之后有些方法和样式不支持，需要排查）

## 底层原理
### 参考资料
> [腾讯云社区](https://cloud.tencent.com/developer/article/1029663)
> [知乎](https://www.zhihu.com/question/50920642)

### 架构
- 微信小程序的框架包含两部分View视图层、App Service逻辑层
  - View层用来渲染页面结构
  - AppService层用来逻辑处理、数据请求、接口调用
  - 它们在两个进程（两个Webview）里运行

- 视图层和逻辑层通过系统层的JSBridage进行通信，逻辑层把数据变化通知到视图层，触发视图层页面更新，视图层把触发的事件通知到逻辑层进行业务处理

![小程序架构图](../../images/mpFramework.png)

- 小程序启动时会从CDN下载小程序的完整包，一般是数字命名的,如：_-2082693788_4.wxapkg

### 实现

> [什么是webview](https://juejin.im/entry/573441971ea4930060c97cd2)

- 小程序的UI视图和逻辑处理是用多个webview实现的，逻辑处理的JS代码全部加载到一个Webview里面，称之为AppService，整个小程序只有一个，并且整个生命周期常驻内存。
- 而所有的视图（wxml和wxss）都是单独的Webview来承载，称之为AppView。
- 所以一个小程序打开至少就会有2个webview进程，正式因为每个视图都是一个独立的webview进程，考虑到性能消耗，小程序不允许打开超过5个层级的页面，当然同是也是为了体验更好。

#### AppService

可以理解AppService即一个简单的页面，主要功能是负责逻辑处理部分的执行，底层提供一个WAService.js的文件来提供各种api接口，主要是以下几个部分：
- 消息通信封装为WeixinJSBridge
  - 开发环境：window.postMessage
  - IOS：WKWebview的window.webkit.messageHandlers.invokeHandler.postMessage
  - android：WeixinJSCore.invokeHandler

- 日志组件Reporter封装
- wx对象下面的api方法
- 全局的App、Page、getApp、getCurrentPages等全局方法
- 还有就是对AMD模块规范的实现

然后整个页面就是加载一堆JS文件，包括小程序配置config，上面的WAService.js（调试模式下有asdebug.js），剩下就是我们自己写的全部的js文件，一次性都加载。

#### AppView

类似于h5的页面，提供UI渲染，底层提供一个WAWebview.js来提供底层的功能,具体如下：
- 消息通信封装为WeixinJSBridge（同AppService）
- 日志组件Reporter封装
- wx对象下的api，这里的api跟WAService里的还不太一样，有几个跟那边功能差不多，但是大部分都是处理UI显示相关的方法
- 小程序组件实现和注册
- VirtualDOM，Diff和Render UI实现
- 页面事件触发

在此基础上，AppView有一个html模板文件，通过这个模板文件加载具体的页面，这个模板主要就一个方法：$gwx，主要是返回指定page的VirtualDOM，而在打包的时候，会事先把所有页面的WXML转换为ViirtualDOM放到模板文件里，而微信自己写了2个工具wcc（把WXML转换为VirtualDOM）和wcsc（把WXSS转换为一个JS字符串的形式通过style标签append到header里）。

#### service和view通信

使用消息`publish`和`subscribe`机制实现两个`Webview`之间的通信，实现方式就是统一封装一个`WeixinJSBridge`对象，而不同的环境封装的接口不一样，具体实现的技术如下：

- windows
  - 通过window.postMessage实现
    - 使用chrome扩展的接口注入一个contentScript.js，它封装了postMessage方法，实现webview之间的通信，并且也它通过chrome.runtime.connect方式，也提供了直接操作chrome native原生方法的接口

  - 发送消息：`window.postMessage(data, '*')`
    - data里指定 webviewID

  - 接收消息：window.addEventListener(‘message’, messageHandler); 
    - 消息处理并分发，同样支持调用nwjs的原生能力。

  - appservice也是通过一个webview实现的，实现原理上跟view一样，只是处理的业务逻辑不一样。

- ios
  - 通过 WKWebview的window.webkit.messageHandlers.NAME.postMessage实现微信navite代码里实现了两个handler消息处理器：
    - invokeHandler: 调用原生能力
    - publishHandler: 消息分发

![iosJsBridge](../../images/iosJsBridge.png)

- Android
  - 通过WeixinJSCore.invokeHanlder实现，这个WeixinJSCore是微信提供给JS调用的接口（native实现）
    - invokeHandler: 调用原生能力
    - publishHandler: 消息分发

### 总结
**小程序底层还是基于`webview`实现的，基于`web`规范，只需要了解框架规范便可以进行快速开发。**

- MSSM：对逻辑和UI进行了完全隔离，这个跟当前流行的react，agular，vue有本质的区别，小程序逻辑和UI完全运行在2个独立的Webview里面，而后面这几个框架还是运行在一个webview里面的，如果你想，还是可以直接操作dom对象，进行ui渲染的。

- 组件机制：引入组件化机制，但是不完全基于组件开发，跟vue一样大部分UI还是模板化渲染，引入组件机制能更好的规范开发模式，也更方便升级和维护。

- 多种节制：不能同时打开超过5个窗口，打包文件不能大于2M，dom对象不能大于16000个等，这些都是为了保证更好的体验。

## 踩坑

### 动画

#### scale
scale(x, y)
x, y 值的范围是0～2，如果是负值的话，画面会倒置

#### 循环
- 注意每次循环对上一次的结果进行倒叙：这里的动画会首先顺时针旋转360度，然后逆时针旋转360度
- 可以修改为从0开始每次增加360的动画，这里的角度值没有上限
- 最好使用延时器来实现，定时器会存在锁屏情况下再回来动画多旋转几次的bug，当然，onHide清除定时器，onShow执行动画也可以

```js
initShareIconAnimationAnimate (animation, direction) {
  const animateGroup = {true: [[-180, 0], [0, 180], [0.5, 1]], false: [[180, 0], [0, -180], [1, 0.5]]}[direction]
  animation.rotate(animateGroup[0][0], animateGroup[0][1]).scale(animateGroup[2][0]).step()
  animation.rotate(animateGroup[1][0], animateGroup[1][1]).scale(animateGroup[2][1]).step()
  this.shareIconAnimation = animation.export()
},
initShareIconAnimation (delay) {
  const animation = wx.createAnimation({
    duration: delay,
    timingFunction: 'linear'
  })
  let direction = true
  this.initShareIconAnimationAnimate(animation, direction)
  setInterval(() => {
    direction = !direction
    this.initShareIconAnimationAnimate(animation, direction)
  }, delay + 100)
}
```

#### 切换
只能同时进行一个动画step
```js
touchClickShareAnimation (isShareMode) {
  if (this.animateOn) return
  this.animateOn = true
  this.setIsShareMode(isShareMode)
  const animation = wx.createAnimation({
    duration: this.setIsShareModeDelay,
    timingFunction: 'ease'
  })
  const animationStep = (opa) => {
    animation.opacity(opa).step()
    return animation
  }
  if (isShareMode) {
    this.clickShareAnimation = animationStep(0).export() // 首先执行它
    setTimeout(() => {
      this.cancelShareAnimation = animationStep(1).export() // 延迟时间过后再执行这个动画
    }, this.setIsShareModeDelay / 2) // 可以将这个动画提前一般延迟时间使得后半段动画可以出现
  } else {
    this.cancelShareAnimation = animationStep(0).export() // 首先执行它
    this.clickShareAnimation = animationStep(1).export() // 直接使click透明度变为1，没有过渡过程，因为这个时候cancelShareAnimation还在执行，这个效果看起来还不错，保留了
  }
},
```

#### 滑动
```js
touchMoveCardAnimation (type) {
  const animation = wx.createAnimation({
    duration: 800,
    timingFunction: 'ease'
  })
  console.log(type)
  if (type) {
    animation.translateY(52).step()
    animation.translateY(42).step() // 这个在多个卡片的情况下会出现上下晃动，待解决
  } else {
    animation.translateY(0).step()
    animation.translateY(0).step() // 只使用一个step会上下摇动，原因不明
  }
  this.moveCardAnimation = animation.export()
}
```

### 通用

#### webview组件
**每个`pages`都可以有一个`webview`组件，所以一些静态化和用户无关的界面可以使用`html`链接代替。需要企业用户才能使用webview。**

#### 下拉刷新
不要调用startPullDown，ios下会出现bug
直接这么写：
```js
async onPullDownRefresh () {
  await this.refreshMyScores()
  wx.stopPullDownRefresh()
}
```

#### 实现到底了效果
- 不能使用relative，使用fixed：在根元素上使用relative会导致ios页面乱滑
- 使用长度为二的数组监听scroll方向，保存触发时间戳，第一项是前一个时间，后一项是当前时间戳，对比两个数组的scrollleft，如果小于0代表向左滑动，否则向右滑动
- 注意最好提前触发到底动作，这样滑到底的时候刚好可以看到提示

#### access_token的保存
- 建议公众号开发者使用中控服务器统一获取和刷新Access_token，其他业务逻辑服务器所使用的access_token均来自于该中控服务器，不应该各自去刷新，否则容易造成冲突，导致access_token覆盖而影响业务；
- 目前Access_token的有效期通过返回的expire_in来传达，目前是7200秒之内的值。中控服务器需要根据这个有效时间提前去刷新新access_token。在刷新过程中，中控服务器可对外继续输出的老access_token，此时公众平台后台会保证在5分钟内，新老access_token都可用，这保证了第三方业务的平滑过渡；
- Access_token的有效时间可能会在未来有调整，所以中控服务器不仅需要内部定时主动刷新，还需要提供被动刷新access_token的接口，这样便于业务服务器在API调用获知access_token已超时的情况下，可以触发access_token的刷新流程。

#### 页面渲染

小程序不同于原生app应用，存在诸多性能限制，需要注意：

- 页面不能有过长的列表
- 每个列表内容不能过多
- 注意及时销毁列表项，保持列表项的项数越少越好
- socket不能连接太多，数据变化不能太快
- 频繁触发的事件需要加上锁，防止事件队列太长，导致页面瘫痪

优化点：

- 懒加载（适用于静态列表的加载）
- 事件锁
- 多页应用，保证页面可以正常承载

#### 微信最新版登录流程

- wx.getSetting()
  - true -> wx.login() -> wx.getUserInfo() -> sso
  - false -> show user-login alert button -> get uesrInfo in button callback -> sso
- userInfo session
  - check globalData has userInfo

#### 分享

`pages`分享不能带有异步操作，这意味着：

- 分享弹窗事件优先
- 点击一个分享按钮之前，必须将数据准备好，不能异步获取，但可以同步调用
- 如果分享函数中携带了异步操作，会导致分享失效

#### button清除样式
> [参考](https://blog.csdn.net/Wu_shuxuan/article/details/78209125)

传统的用“border:none;来去除边框”，依旧有一条细细的border
button::after{ border: none; } 来去除边框

#### getCurrentPage method

可以调用getCurrentPage(), 来获取进入页面的堆栈，最先进入的在最上面

#### image

fixed定位的over-view上不能放置外部http形式的图片，会导致图片不能fixed

#### pages左右滑动
```css
#box {
  overflow: hidden
  width: 100vw
  height: 100vh
}
```

#### wx.request封装实例

```js
/**
 * 1. 调用initBaseUrl初始化域名
 * 2. 传入路径 + options（具体参数见【https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html#wxrequestobject】）
 * 3. 该实例返回一个promise，可使用asyc-await。
 */
const INSTANCE = {
  initBaseUrl (url) {
    this.baseUrl = url
  },
  initMethods (methods) {
    return methods.map(method => {
      this[method.toLowerCase()] = this.request(method)
    })
  },
  request (method) {
    return function (url, options) {
      return new Promise((resolve, reject) => {
        return wx.request({
          url: `${this.baseUrl || ''}${url}`,
          method,
          ...options,
          success (res) {
            return resolve(res)
          },
          fail (res) {
            return reject(res)
          }
        })
      })
    }
  }
}
INSTANCE.initMethods(['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'])
/**
 * expose INSTANCE prototype constructor to outside, prevent outside change it.
 */
export const instance = Object.create(INSTANCE)
```

#### 画弧形

使用`canvas`，移动设备不兼容，待微信修复，`canvas`总是在最上层，使用`cover-view`的话不方便。
```html
<template>
  <canvas canvas-id="commonBack" class="commonBack"/>
</template>
```
```js
// 缺陷 - 层级最高不适合做背景
export default {
  props: {
    heightScale: {
      type: Number,
      default: 1.2
    },
    linerScale: {
      type: Number,
      default: 0.52
    }
  },
  name: 'common-back',
  mounted () {
    const {deviceW, deviceH} = getApp().globalData
    const ctx = wx.createCanvasContext('commonBack')
    const grd = ctx.createLinearGradient(0, 0, 0, deviceH * this.linerScale)
    grd.addColorStop(0, '#FF5640')
    grd.addColorStop(1, '#FFC896')
    ctx.arc(deviceW / 2, -deviceW / this.heightScale, deviceW * 1.6, 0, Math.PI)
    ctx.setFillStyle(grd)
    ctx.fill()
    ctx.draw()
  }
}
```

### mpVue
#### 状态不更新
- 针对很深层级的子组件：可以初始化子组件，设置onHide事件
- 估计原因是computed属性监听不到对象的值发生变化了
- 使用vuex来进行祖先和后代之间的通信
- 或者避免太深的组件嵌套
```js
onHide() {
  this.init()
},
onShow() {
  this.init()
}
```

#### $emit 失效

子组件`$emit`失效，一直报错

原因：子组件中有一个props和自定义的click事件名相同，导致报错：找不到emit的事件名

心得：遇到问题要用排除法，确定用法没有出错的情况下，得查看语法有没有错误

#### getApp().globalData.appOptions.query

这个query不会完全继承链接里面的参数，应该使用`this.$root.$mp.query`

#### 对接打点
- 首先引入`sensorsdata.min.js`，修改配置部分，实例：
```js
/* eslint-disable */
var conf = {
  test: {
    // 神策分析注册在APP全局函数中的变量名，在非app.js中可以通过getApp().sensors(你这里定义的名字来使用)
    name: 'sensors',
    // 神策分析数据接收地址
    server_url: 'xxx-test',
    // 传入的字符串最大长度限制
    max_string_length: 300,
    // 发送事件的时间使用客户端时间还是服务端时间
    use_client_time: false,
    // 是否自动采集如下事件
    autoTrack:{
      //$MPLaunch
      appLaunch:false,
      //$MPShow
      appShow:false,
      //$MPHide
      appHide:false,
      //$MPViewScreen
      pageShow:false
    }
  },
  production: {
    // 神策分析注册在APP全局函数中的变量名，在非app.js中可以通过getApp().sensors(你这里定义的名字来使用)
    name: 'sensors',
    // 神策分析数据接收地址
    server_url: 'xxx-prod',
    // 传入的字符串最大长度限制
    max_string_length: 300,
    // 发送事件的时间使用客户端时间还是服务端时间
    use_client_time: false,
    // 是否自动采集如下事件
    autoTrack:{
      //$MPLaunch
      appLaunch:false,
      //$MPShow
      appShow:false,
      //$MPHide
      appHide:false,
      //$MPViewScreen
      pageShow:false
    }
  }
};

export default conf[process.env.ENV]
```

- 在`main.js`中引入：
```js
import './utils/sensorsdata.min.js'
import {sa} from './utils/index'

Vue.prototype.$sa = sa
```

- `sa`定义：
```js
export const sa = (key, payload) => {
  return getApp().sensors.track(key, payload)
}
```

- `sa`使用方式
```js
this.$sa('whichEvent', {eventName: 'event description'})
```

- `sa`守卫
可以在`resource.js`中加上事件的守卫，来监听事件有没有注册

### wepy

#### 编译工具报错

> [参考](https://github.com/Tencent/wepy/issues/917)

问题：出现脚本错误或者未正确调用 Page()
解决方法：`.wpy`和`.js`不能重名

#### 编译的dist文件出错
删掉重新编译

## 我看涨技术文档

### fly的封装

```js
// cached ssoToken to rise get ssoToken speed.
// use closure to prevent vars pollute space.
function cachedSpace () {
  let $ssoToken = null
  return function cachedSsoToken () {
    !$ssoToken && ($ssoToken = store.state.userInfo.token)
    return $ssoToken
  }
}

const $ssoToken = cachedSpace()
export const fly = new Fly()

// 添加请求拦截器
fly.interceptors.request.use(config => {
  // 给所有请求添加自定义header
  // 开发环境默认token
  function initHeader (token) {
    // 如果已经设置了就不用重复设置了
    if (config.headers['token'] && config.headers['authorization']) return
    config.headers['token'] = config.headers['authorization'] = token
  }
  initHeader($ssoToken())
  return config
})
```

- 这个是用来初始化headers里面的token和authorization的
- token有一个缓存区，不用每次都从store里面去取token，也不用每次都要设置token和authorization
- response拦截器用来在网络请求出错的情况下打点
- $init用来设置发出这份请求时候的请求路径
- $config用来获取config，这个可以不挂载在这里

### config

#### 使用process.env区分不同环境
- 首先安装`cross-env`: `cnpm i cross-env -D`
- 修改`config/dev.env.js`为：
```js
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV: '"' + process.env.ENV + '"'
})
```
- 然后就可以访问`process.env.ENV`这个环境变量了
- 可修改`package.json`为：
```js
"scripts": {
  "dev": "cross-env ENV=test node build/dev-server.js", // test env
  "start": "npm run dev", // test env
  "debug": "cross-env ENV=debug node build/dev-server.js", // debug mode
  "build:local": "cross-env ENV=local node build/dev-server.js", // local env
  "build:test": "rimraf dist && cross-env ENV=test node build/build.js", // build for test
  "build:production": "rimraf dist && cross-env ENV=production node build/build.js", // build for production
  "lint": "eslint --ext .js,.vue src" // lint your files
}
```

### resource.js

```js
/**
 * 所有页面路由封装
 * pathName: 路径名，在pathMap中注册就行了
 * payload: 路径携带的query
 * type: 跳转方式，默认navigateTo
*/
export const goto = (pathName = '', payload = {}, type = 'navigateTo') => {
  const pathMap = {
    pages: {
      main: '/pages/',
      kids: [
        'bulls',
        'lastBet',
        'optionals',
        'recommend',
        'shareFeedback',
        'shareIndex',
        'stock'
      ]
    },
    subpages: {
      main: '/pages/subpages/',
      kids: [
        'rank/pages/rank',
        'rank/pages/score',
        'rank/pages/description',
        'score/pages/score',
        'search/pages/search',
        'recommend/pages/recommend',
        'shareFeedback/pages/shareFeedback',
        'activity/pages/entry',
        'activity/pages/result'
      ]
    }
  }
  const makePath = () => {
    let finallyPath = null
    const query = querify(payload)
    const findPath = (kind) => {
      const kidsMap = pathMap[kind].kids
      for (let i = 0; i < kidsMap.length; i++) {
        if (kidsMap[i] === pathName) {
          return pathMap[kind].main + pathName + '/main' + query
        }
      }
    }
    if (pathName.indexOf('/') > -1) {
      finallyPath = findPath('subpages')
    } else {
      finallyPath = findPath('pages')
    }
    if (!finallyPath) return console.error('you have not register ' + pathName + ' in `pathMap`, please register it.')
    !isProd && console.log('now we will go to: ' + finallyPath)
    return finallyPath
  }
  wx[type]({
    url: makePath()
  })
}
```

- 首先有一个pathMap，里面包含pages和subpages，都包含了main和kids，根据你传入的pathName进行判断，如果包含'/'说明是subpages，否则是pages，根据main和pathName以及传入的query生成最终要跳转的路径，需要在数组中注册的目的是方便查看所有路径和重用路径，不会由于意外的路径导致跳转出错，还有一个好处是可以在所有路径跳转前进行预处理

### main.js

```js
// 不支持自定义指令

// 注册原型上的方法
Vue.prototype = Object.assign(Vue.prototype, {
  // 三方类
  $store: store, // 挂载vuex
  $sa: sa, // 挂载神策
  // 自定义类
  $now: getNow, // 获取当前时间戳
  $Share: ShareConfig, // 分享配置，这是一个构造函数
  $goto: goto, // 对跳转api的封装
  $loger: loger, // 打印日志的封装
  $showLoad: showLoadView, // 显示loading
  $hideLoad: hideLoadView, // 隐藏loading
  $isProd: isProd,
  $stay: function (begin) { // 获取页面停留时间，参数：开始时间
    return parseFloat(((getNow() - begin) / 1000).toFixed(2))
  },
  $query: function () { // 获取当前页面的query对象，通过this.$query绑定this就不用传递this了
    return this.$root.$mp.query
  }
})

// 注册公共组件
Vue.component('default-list', defaultList) // 注册无网络状态下的默认页面
Vue.component('common-back', commonBackground)
Vue.component('user-lead', userLead)

// 混合生命周期和方法以及计算属性等
Vue.mixin({
  onShow () {
    if (this.sa_pageName) {
      this.enterTime = this.$now()
    }
  },
  onHide () {
    this.stayTime()
  },
  onUnload () {
    this.stayTime()
  },
  computed: {
    netWorkIsConnected () { // 网络是否连接
      return this.$store.state.netWorkStatus.isConnected
    },
    isIos () { // 是否是IOS系统
      return this.$store.getters['isIos']
    },
    isDevTool () { // 是否是开发者工具
      return this.$store.getters['isDevTool']
    }
  },
  methods: {
    // 收集页面打点次数
    collectClickNums () {
      this.$sa('click_total_num', {page: this.sa_pageName})
    },
    // 统计页面停留时间
    stayTime () {
      if (this.sa_pageName) {
        // 打点 自选页停留时间
        this.$sa(`${this.sa_pageName}_stay`, {stayTime: this.$stay(this.enterTime)})
      }
    },
    $loading () { // 2秒钟的loading
      this.$showLoad()
      setTimeout(() => {
        this.$hideLoad()
      }, 2000)
    }
  }
})
```

### App.vue

```js
onLaunch (option) {
  this.shouldUpdateApp()
  this.registerSa()
  this.getCacheSrcs()
  this.listenNetWork()
  this.cacheSystemInfo()
}
```

## K线图怎么画
[使用EChart3](https://zhuanlan.zhihu.com/p/31803528)

## vue和react 虚拟dom更新机制差异

> [腾讯博客](https://cloud.tencent.com/developer/article/1006029)

## 为什么vue不需要使用shouldComponentUpdate
已经有依赖收集了

## 脚手架
- 页面空白但是没有报错，可能是因为函数名和关键字冲突

- 组件导入不了，提示空的对象，原因是命名的时候首字母没有大写！！！（指class的名字）

- export default Abc 导入单个class组件不能带{}

## 小程序是怎么渲染原生组件的

> [知乎专栏](https://zhuanlan.zhihu.com/p/36997098)

> [知乎专栏](https://zhuanlan.zhihu.com/p/22607204)

## webview的通信

> [安卓](https://blog.csdn.net/Jason847/article/details/78616086)

> [ios](https://imnerd.org/ios-webview-and-js.html)

## 准备工作

## 概念

- 本质上是一个js应用程序的静态模块打包器

- 处理程序时，会递归的构建一个依赖关系图，包含应用程序需要的每个模块，然后将这些模块打包成一个或多个bundle

### 核心

- 入口：entry
- 输出：output
- 装载机：loader
- 插件：plugins

### 配置

- 基本配置：
```js
var path = require('path')
module.exports = {
	mode: 'development',
	entry: './foo.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'foo.bundle.js'
	}
}
```

- 导出为一个函数
```bash
webpack --env.produciton
webpack --env.paltform=web
```
```js
module.exports = function (env, argv) {
	return {
		mode: env.production ? 'production' : 'development',
		devtool: env.production ? 'source-maps' : 'eval',
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: argv['optimize-minimize']
			})
		]
	}
}
```

## 入口：entry

- 指示webpack应该使用哪个模块来作为构建其内部依赖图的开始。进入入口起点后，webpack会找出有哪些模块和库是入口起点，无论是直接还是间接依赖的。

- 每个依赖项随即被处理，最后输出称之为bundles的文件中。

- 用法：

```js
// webpack.config.js
module.exports = {
    entry: './path/file.js'
}
```

### 单个入口和多个入口

```js
// webpack.config.js
const config = {
	entry: './path/file.js'
}
// the same as
const config = {
	entry: {
		main: './path/file.js'
	}
}
```

> 当向entry传入一个文件路径的数组时将创建多个主入口

> 入口文件数组不能重名

### 对象语法

- 用法：

```js
// webpack.config.js
const config = {
	entry: {
		app: './src/app.js',
		vendors: './src/vendors.js'
	}
}
```

> 可扩展的webpack配置：可重用并且可以与其他配置组合使用。用于将关注点从环境、构建目标、运行时中分离。然后使用专门的工具（如webpack-merge）将他们合并。

- 场景：
	- 正如上面的用法：从表面上看，这告诉我们webpack从app.js和vendors.js开始创建依赖图。这些依赖图彼此完全分离、互相独立
	- 此设置允许你使用CommonsChunkPlugin从应用程序bundle中提取vendor引用到vendor bundle，并把引用vendor的部分替换为__webpack_require_()调用

### 多页面应用程序

- 用法：

```js
// webpack.config.js
const config = {
	entry: {
		pageOne: './src/pageOne/index.js',
		pageTwo: './src/pageTwo/index.js',
		pageThree:
		'./src/pageThree/index.js'
	}
}
```

- 意义：这一段告诉我们webpack需要3个独立分离的依赖图，在多页应用中，服务器将为你获取一个新的HTML文档。页面重新加载新文档，并且资源被重新下载。这给了我们特殊的机会取做很多事情：
	- 使用CommonsChunkPlugin为每个页面间的应用程序共享代码创建bundle。由于入口起点增多，多页应用能够复用入口起点之间的大量代码/模块

## 出口：output

- 告诉`webpack`在哪里输出它所创建的`bundles`，以及如何命名这些文件，默认值是`./dist`。整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。

- 用法：

```js
// webpack.config.js
const path = require('path')
module.exports = {
	entry: './path/file.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'test.bundle.js'
	}
}
```

> 如果入口是一个数组，出口是一个bundle，bundle会按照顺序执行入口数组

> 如果是production-mode，会进行一系列的优化，包括但不限于 减少作用域的查询（会把一些常量直接编译成最终结果，减少了变量的查询）、代码压缩等等

### 多个入口起点

- 如果配置创建了多个单独的chunk，应该使用占位符来确保每个文件具有唯一的名称：

```js
{
	entry: {
		app: './src/app.js',
		search: './src/search.js'
	},
	output: {
		filename: '[name],js',
		path: __dirname + '/dist'
	}
}
```

### 高级进阶

- 使用CDN和资源hash的复杂示例：

```js
{
	output: {
		path: "/home/[hash]",
		publicPath: "http://cdn.example.com/assets/[hash]/"
	}
}
```

- 在编译时不知道最终输出文件的publicPath的情况下，publicPath可以留空，并且在入口起点运行时动态设置。如果你在编译时不知道publicPath，可以先忽略它，并且在入口起点设置__webpack_public_path__

```js
__webpack_public_path__ = myRuntimePublicpath
```

## 装载机：loader

- 让webpack能够去处理那些非js文件（webpack本身只理解js）。可以将所有类型的文件转换为webpack能够处理的有效模块，然后可以利用webpack的打包能力，对它们进行处理。

- 本质上，它将所有类型的文件，转换为应用程序的依赖图（和最终的bundle）可以直接引用的模块。

- 用法：

```js
// webpack.config.js
module.exports = {
	output: {
		filename: 'test.bundle.js'
	},
	module: {
		rules: [
			{ test: /\.txt$/, use: 'raw-loader' }
		]
	}
}
```

- 用于对模块的源代码进行转换
- 可以是你在import或加载模块时预处理文件
- 类似于其他构建工具中任务（task）
- 可以将文件从不同的语言（如ts）转换为js
- 将内联图像转换为data URL
- 允许直接在js模块中import css文件

- 用法：预处理css和ts

```bash
npm i css-loader -D
npm i ts-loader -D
```

```js
// webpack.config.js
module.exports = {
	module: {
		rules: [
			{ test: /\.css$/, use: 'css-loader' },
			{ test: /\.ts$/, use: 'ts-loader' }
		]
	}
}
```

### 使用方式

- 配置：推介使用，简明简洁
```js
module: {
	rules: [
		{ test: /\.css$/ },
		use: [
			{ loader: 'style-loader' },
			{ 
				loader: 'css-loader',
				options: {
					modules: true
				}
			}
		]
	]
}
```

- 内联：如下

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

- CLI：如下会对.jade文件使用jade-loader，对.css文件使用style-loader和css-loader

```bash
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

- loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。

- loader 可以是同步的，也可以是异步的。

- loader 运行在 Node.js 中，并且能够执行任何可能的操作。

- loader 接收查询参数。用于对 loader 传递配置。

- loader 也能够使用 options 对象进行配置。

- 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。

- 插件(plugin)可以为 loader 带来更多特性。

- loader 能够产生额外的任意文件。

## 插件：plugins

- loader被用于转换某些类型的模块，而插件可以用于执行范围更广的任务。它的范围包括：打包优化、压缩、重新定义环境中的变量

- 插件需要添加到plugins数组中。多数插件可以通过选项（option）自定义。可以在一个配置文件中因为不同的目的而多次使用同一个插件，这时需要通过使用new操作符来创建它的一个实例

- 用法：

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const config = {
	module: {
		rules: [
			{ test: /\.txt$/, use: 'raw-loader' }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackplugin({template: './src/index.html'})
	]
}
module.exports = config
```

## 模式

- 用法：

```js
module.exports = {
	mode: 'production' // development
}
```

- 区别：production应该会有一些代码和图片压缩之类的优化插件

- development打包之后的代码中使用了eval，而production则没有

> [详情](https://www.webpackjs.com/concepts/mode/)

## 模块

- 在模块化编程中，开发者将程序分解成离散功能块
- 每个模块具有比完整小程序更小的接触面，使得校验、调试、测试轻而易举。精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的

### 概念

- 对比node.js模块，webpack模块能够以各种方式表达它们的依赖关系，例如：
	- ES2015 import 语句
	- CommonJS require 语句
	- AMD define 和 require 语句
	- css/sass/less 文件中的 @import 语句
	- 样式（url(...))或HTML文件（<img src=...>）中的图片链接（image url）

### 解析

- 规则：
	- 绝对路径：
	```js
	import "/home/me/file"
	import "C:\\Users\\me\\file"
	```
	- 相对路径：
	```js
	import "../src/file1"
	import "./file2"
	```
	- 模块路径：
	```js
	import "module"
	import "module/lib/file"
	```

## 依赖图

- 任何时候，一个文件依赖于另一个文件，webpack 就把此视为文件之间有依赖关系。这使得 webpack 可以接收非代码资源(non-code asset)（例如图像或 web 字体），并且可以把它们作为_依赖_提供给你的应用程序。

- webpack 从命令行或配置文件中定义的一个模块列表开始，处理你的应用程序。 从这些入口起点开始，webpack 递归地构建一个依赖图，这个依赖图包含着应用程序所需的每个模块，然后将所有这些模块打包为少量的 bundle - 通常只有一个 - 可由浏览器加载。

## manifest

- 在使用webpack构建的典型应用程序或站点中，有三种主要的代码类型：
	- 你或你的团队编写的源码
	- 你的源码会依赖的任何第三方的library或vendor代码
	- webpack的runtime和manifest，管理所有模块的交互

### Runtime

- 在浏览器运行时，webpack用来连接模块化的应用程序的所有代码。包括：在模块交互时，连接模块所需的家在和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑

### Manifest

- 一旦你的应用程序中，形如index.html文件、一些bundle和各种资源加载到浏览器中，你的/src目录中的文件结构就不存在了

- 当编译器开始执行、解析和映射应用程序时，他会保留所有模块的详细要点。当完成打包并发送到浏览器时，会在运行时通过Manifest来解析和加载模块。无论使用哪种模块语法，那些import或require语句现在都已经转换为__webpack_require__方法，此方法指向模块标识符。通过使用mainfest中的数据，runtime将能够查询模块标识符，检索出背后对应的模块

## 构建目标

```js
var path = require('path')
var serverConfig = {
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'lib.node.js'
	}
	//...
}
var clientConfig = {
	target: 'web', // default value
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'lib.js'
	}
}
module.exports = [ serverConfig, clientConfig ]
```

## 模块热替换

- 会在应用程序运行过程中替换、添加或删除模块，而无需家在整个页面。主要是：
	- 保留在完全重新加载页面时丢失的应用程序状态
	- 只更新变更内容，节省开发时间
	- 调整样式更加快速：几乎相当于在浏览器调试器中更改样式

### 运行

- 在应用程序中
	- 代码要求HMR runtime检查更新
	- HMR runtime （异步）下载更新，然后通知应用程序代码
	- 代码要求HMR runtime应用更新
	- HMR runtime（异步）应用更新
	- 可以设置HMR，使得此进程自动触发更新，或者你可以选择要求在用户交互时进行更新
- 在编译器中
	- 除了普通资源，编译器需要发出update，以允许更新之前的版本到新的版本。update由两部分组成：
		- 更新后的manifest（json）
		- 一个或多个更新后的chunk（js）
- 在模块中
	- HMR是可选功能，只会影响包含HMR代码的模块。通过style-loader为style样式追加样式。为了运行追加补丁，style-loader实现了HMR接口；当它通过HMR接收到更新，它会使用新的样式替换旧的样式
- 在HMR Runtime中
	- 对于模块系统的 runtime，附加的代码被发送到 parents 和 children 跟踪模块。在管理方面，runtime 支持两个方法 check 和 apply。
	- check 发送 HTTP 请求来更新 manifest。如果请求失败，说明没有可用更新。如果请求成功，待更新 chunk 会和当前加载过的 chunk 进行比较。对每个加载过的 chunk，会下载相对应的待更新 chunk。当所有待更新 chunk 完成下载，就会准备切换到 ready 状态。
	- apply 方法将所有被更新模块标记为无效。对于每个无效模块，都需要在模块中有一个更新处理函数，或者在它的父级模块们中有更新处理函数。否则，无效标记冒泡，并也使父级无效。每个冒泡继续直到到达应用程序入口起点，或者到达带有更新处理函数的模块（以最先到达为准）。如果它从入口起点开始冒泡，则此过程失败。
	- 之后，所有无效模块都被（通过 dispose 处理函数）处理和解除加载。然后更新当前 hash，并且调用所有 "accept" 处理函数。runtime 切换回闲置状态，一切照常继续。

## 源码解析

- 入口：通过查看`package.json`可以看到`"main": "lib/webpack.js",`，得知这个仓库上传到`npm`上的入口是`lib/webpack.js`，所以从这里开始看起

### webpack's lib/webpack.js

```js

// 这个应该是用来标记这个脚本是否结束
process.exitCode = 0;

/**
 * @param {string} command process to run
 * @param {string[]} args commandline arguments
 * @returns {Promise<void>} promise
 */
const runCommand = (command, args) => {
	const cp = require("child_process");
	return new Promise((resolve, reject) => {
		const executedCommand = cp.spawn(command, args, {
			stdio: "inherit",
			shell: true
		});

		executedCommand.on("error", error => {
			reject(error);
		});

		executedCommand.on("exit", code => {
			if (code === 0) {
				resolve();
			} else {
				reject();
			}
		});
	});
};

/**
 * @param {string} packageName name of the package
 * @returns {boolean} is the package installed?
 */
const isInstalled = packageName => {
	try {
		require.resolve(packageName);

		return true;
	} catch (err) {
		return false;
	}
};

/**
 * @typedef {Object} CliOption
 * @property {string} name display name
 * @property {string} package npm package name
 * @property {string} binName name of the executable file
 * @property {string} alias shortcut for choice
 * @property {boolean} installed currently installed?
 * @property {boolean} recommended is recommended
 * @property {string} url homepage
 * @property {string} description description
 */

/** @type {CliOption[]} */
// 通过哪种方式调用webpack指令
const CLIs = [
	{
		name: "webpack-cli",
		package: "webpack-cli",
		binName: "webpack-cli",
		alias: "cli",
		// 引入webpack-cli的npm包，如果有的话
		installed: isInstalled("webpack-cli"),
		// 推介
		recommended: true,
		url: "https://github.com/webpack/webpack-cli",
		description: "The original webpack full-featured CLI."
	},
	{
		name: "webpack-command",
		package: "webpack-command",
		binName: "webpack-command",
		alias: "command",
		// 引入webpack-command的npm包，如果有的话
		installed: isInstalled("webpack-command"),
		// 不推介
		recommended: false,
		url: "https://github.com/webpack-contrib/webpack-command",
		description: "A lightweight, opinionated webpack CLI."
	}
];

// 过滤掉没有下载安装的client
const installedClis = CLIs.filter(cli => cli.installed);

if (installedClis.length === 0) {
	// 如果没有安装任何client
	const path = require("path");
	const fs = require("fs");
	const readLine = require("readline");

	let notify =
		"One CLI for webpack must be installed. These are recommended choices, delivered as separate packages:";

	for (const item of CLIs) {
		if (item.recommended) {
			notify += `\n - ${item.name} (${item.url})\n   ${item.description}`;
		}
	}
	// 打印出推介下载的npm包，这里是webpack-cli
	console.error(notify);
	// 询问你是否想安装webpack-cli以及用啥子安装
	const isYarn = fs.existsSync(path.resolve(process.cwd(), "yarn.lock"));

	const packageManager = isYarn ? "yarn" : "npm";
	const installOptions = [isYarn ? "add" : "install", "-D"];

	console.error(
		`We will use "${packageManager}" to install the CLI via "${packageManager} ${installOptions.join(
			" "
		)}".`
	);

	let question = `Do you want to install 'webpack-cli' (yes/no): `;

	const questionInterface = readLine.createInterface({
		input: process.stdin,
		output: process.stderr
	});
	questionInterface.question(question, answer => {
		questionInterface.close();

		const normalizedAnswer = answer.toLowerCase().startsWith("y");

		if (!normalizedAnswer) {
			console.error(
				"You need to install 'webpack-cli' to use webpack via CLI.\n" +
					"You can also install the CLI manually."
			);
			process.exitCode = 1;

			return;
		}

		const packageName = "webpack-cli";

		console.log(
			`Installing '${packageName}' (running '${packageManager} ${installOptions.join(
				" "
			)} ${packageName}')...`
		);
		runCommand(packageManager, installOptions.concat(packageName))
			.then(() => {
				// 如果成功了，就将webpack-cli引入
				// 查看webpack-cli可以看到package.json里面的main是bin/cli.js，这是一个自运行函数
				require(packageName); //eslint-disable-line
			})
			.catch(error => {
				console.error(error);
				process.exitCode = 1;
				// 退出进程
			});
	});
} else if (installedClis.length === 1) {
	const path = require("path");
	const pkgPath = require.resolve(`${installedClis[0].package}/package.json`);
	// eslint-disable-next-line node/no-missing-require
	const pkg = require(pkgPath);
	// eslint-disable-next-line node/no-missing-require
	// 查看webpack-cli可以看到package.json里面的main是bin/cli.js，这是一个自运行函数，同installedClis.length === 0的情况
	require(path.resolve(
		path.dirname(pkgPath),
		pkg.bin[installedClis[0].binName]
	));
} else {
	// 如果安装了两种cli，提示删除一个
	// 这里感觉可以直接默认使用webpack-cli而不是警告
	console.warn(
		`You have installed ${installedClis
			.map(item => item.name)
			.join(
				" and "
			)} together. To work with the "webpack" command you need only one CLI package, please remove one of them or use them directly via their binary.`
	);
	process.exitCode = 1;
}
```

- 可以看到这个入口主要实现了命令行参数的获取以及校验是否安装了相关的客户端或者指令，最终目的就是引入`webpack-cli`中的`./bin/cli.js`文件，下面来看看这个文件是干嘛的

### webpack-cli's bin/cli.js

```js

// 这行的作用是脚本用env启动的原因，是因为脚本解释器在linux中可能被安装于不同的目录，env可以在系统的PATH目录中查找。同时，env还规定一些系统环境变量。 

#!/usr/bin/env node

// 这是一个立即执行函数
(function() {
	// wrap in IIFE to be able to use return
	// 如果本地已经安装了npm包了，就使用本地的
	const importLocal = require("import-local");
	// Prefer the local installation of webpack-cli
	if (importLocal(__filename)) {
		return;
	}
	// 加快编译速度
	// [npm](https://www.npmjs.com/package/v8-compile-cache)
	require("v8-compile-cache");
	// 这里面注意exports的使用，写在node/note.md中了
	const ErrorHelpers = require("./errorHelpers");

	const NON_COMPILATION_ARGS = [
		"init",
		"migrate",
		"add",
		"remove",
		/*
		"update",
		"make",
		*/
		"serve",
		"generate-loader",
		"generate-plugin",
		"info"
	];

	const NON_COMPILATION_CMD = process.argv.find(arg => {
		if (arg === "serve") {
			global.process.argv = global.process.argv.filter(a => a !== "serve");
			process.argv = global.process.argv;
		}
		return NON_COMPILATION_ARGS.find(a => a === arg);
	});
	// 注册webpack-cli指令
	// 如何使用node注册终端指令：见node/note.md
	if (NON_COMPILATION_CMD) {
		return require("./prompt-command")(NON_COMPILATION_CMD, ...process.argv);
	}
	// 这个地方使用yargs模块来注册指令以及一些终端输入的配置
	const yargs = require("yargs").usage(`webpack-cli ${
		require("../package.json").version
	}

Usage: webpack-cli [options]
       webpack-cli [options] --entry <entry> --output <output>
       webpack-cli [options] <entries...> --output <output>
       webpack-cli <command> [options]

For more information, see https://webpack.js.org/api/cli/.`);

	require("./config-yargs")(yargs);

	const DISPLAY_GROUP = "Stats options:";
	const BASIC_GROUP = "Basic options:";

	yargs.options({
		silent: {
			type: "boolean",
			describe: "Prevent output from being displayed in stdout"
		},
		json: {
			type: "boolean",
			alias: "j",
			describe: "Prints the result as JSON."
		},
		progress: {
			type: "boolean",
			describe: "Print compilation progress in percentage",
			group: BASIC_GROUP
		},
		color: {
			type: "boolean",
			alias: "colors",
			default: function supportsColor() {
				if (process.stdout.isTTY === true) {
					return require("supports-color").supportsColor;
				}
			},
			group: DISPLAY_GROUP,
			describe: "Enables/Disables colors on the console"
		},
		"sort-modules-by": {
			type: "string",
			group: DISPLAY_GROUP,
			describe: "Sorts the modules list by property in module"
		},
		"sort-chunks-by": {
			type: "string",
			group: DISPLAY_GROUP,
			describe: "Sorts the chunks list by property in chunk"
		},
		"sort-assets-by": {
			type: "string",
			group: DISPLAY_GROUP,
			describe: "Sorts the assets list by property in asset"
		},
		"hide-modules": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe: "Hides info about modules"
		},
		"display-exclude": {
			type: "string",
			group: DISPLAY_GROUP,
			describe: "Exclude modules in the output"
		},
		"display-modules": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe: "Display even excluded modules in the output"
		},
		"display-max-modules": {
			type: "number",
			group: DISPLAY_GROUP,
			describe: "Sets the maximum number of visible modules in output"
		},
		"display-chunks": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe: "Display chunks in the output"
		},
		"display-entrypoints": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe: "Display entry points in the output"
		},
		"display-origins": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe: "Display origins of chunks in the output"
		},
		"display-cached": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe: "Display also cached modules in the output"
		},
		"display-cached-assets": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe: "Display also cached assets in the output"
		},
		"display-reasons": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe: "Display reasons about module inclusion in the output"
		},
		"display-depth": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe: "Display distance from entry point for each module"
		},
		"display-used-exports": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe:
				"Display information about used exports in modules (Tree Shaking)"
		},
		"display-provided-exports": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe: "Display information about exports provided from modules"
		},
		"display-optimization-bailout": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe:
				"Display information about why optimization bailed out for modules"
		},
		"display-error-details": {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe: "Display details about errors"
		},
		display: {
			type: "string",
			choices: [
				"",
				"verbose",
				"detailed",
				"normal",
				"minimal",
				"errors-only",
				"none"
			],
			group: DISPLAY_GROUP,
			describe: "Select display preset"
		},
		verbose: {
			type: "boolean",
			group: DISPLAY_GROUP,
			describe: "Show more details"
		},
		"info-verbosity": {
			type: "string",
			default: "info",
			choices: ["none", "info", "verbose"],
			group: DISPLAY_GROUP,
			describe:
				"Controls the output of lifecycle messaging e.g. Started watching files..."
		},
		"build-delimiter": {
			type: "string",
			group: DISPLAY_GROUP,
			describe: "Display custom text after build output"
		}
	});

	// yargs will terminate the process early when the user uses help or version.
	// This causes large help outputs to be cut short (https://github.com/nodejs/node/wiki/API-changes-between-v0.10-and-v4#process).
	// To prevent this we use the yargs.parse API and exit the process normally
	yargs.parse(process.argv.slice(2), (err, argv, output) => {
		Error.stackTraceLimit = 30;

		// arguments validation failed
		if (err && output) {
			console.error(output);
			process.exitCode = 1;
			return;
		}

		// help or version info
		if (output) {
			console.log(output);
			return;
		}

		if (argv.verbose) {
			argv["display"] = "verbose";
		}

		let options;
		try {
			options = require("./convert-argv")(argv);
		} catch (err) {
			if (err.name !== "ValidationError") {
				throw err;
			}

			const stack = ErrorHelpers.cleanUpWebpackOptions(err.stack, err.message);
			const message = err.message + "\n" + stack;

			if (argv.color) {
				console.error(`\u001b[1m\u001b[31m${message}\u001b[39m\u001b[22m`);
			} else {
				console.error(message);
			}

			process.exitCode = 1;
			return;
		}

		/**
		 * When --silent flag is present, an object with a no-op write method is
		 * used in place of process.stout
		 */
		const stdout = argv.silent
			? {
				write: () => {}
			  } // eslint-disable-line
			: process.stdout;

		function ifArg(name, fn, init) {
			if (Array.isArray(argv[name])) {
				if (init) init();
				argv[name].forEach(fn);
			} else if (typeof argv[name] !== "undefined") {
				if (init) init();
				fn(argv[name], -1);
			}
		}

		function processOptions(options) {
			// process Promise
			if (typeof options.then === "function") {
				options.then(processOptions).catch(function(err) {
					console.error(err.stack || err);
					process.exit(1); // eslint-disable-line
				});
				return;
			}

			const firstOptions = [].concat(options)[0];
			const statsPresetToOptions = require("webpack").Stats.presetToOptions;

			let outputOptions = options.stats;
			if (
				typeof outputOptions === "boolean" ||
				typeof outputOptions === "string"
			) {
				outputOptions = statsPresetToOptions(outputOptions);
			} else if (!outputOptions) {
				outputOptions = {};
			}

			ifArg("display", function(preset) {
				outputOptions = statsPresetToOptions(preset);
			});

			outputOptions = Object.create(outputOptions);
			if (Array.isArray(options) && !outputOptions.children) {
				outputOptions.children = options.map(o => o.stats);
			}
			if (typeof outputOptions.context === "undefined")
				outputOptions.context = firstOptions.context;

			ifArg("env", function(value) {
				if (outputOptions.env) {
					outputOptions._env = value;
				}
			});

			ifArg("json", function(bool) {
				if (bool) {
					outputOptions.json = bool;
					outputOptions.modules = bool;
				}
			});

			if (
				typeof outputOptions.colors === "undefined" &&
				process.stdout.isTTY === true
			)
				outputOptions.colors = require("supports-color").stdout;

			ifArg("sort-modules-by", function(value) {
				outputOptions.modulesSort = value;
			});

			ifArg("sort-chunks-by", function(value) {
				outputOptions.chunksSort = value;
			});

			ifArg("sort-assets-by", function(value) {
				outputOptions.assetsSort = value;
			});

			ifArg("display-exclude", function(value) {
				outputOptions.exclude = value;
			});

			if (!outputOptions.json) {
				if (typeof outputOptions.cached === "undefined")
					outputOptions.cached = false;
				if (typeof outputOptions.cachedAssets === "undefined")
					outputOptions.cachedAssets = false;

				ifArg("display-chunks", function(bool) {
					if (bool) {
						outputOptions.modules = false;
						outputOptions.chunks = true;
						outputOptions.chunkModules = true;
					}
				});

				ifArg("display-entrypoints", function(bool) {
					outputOptions.entrypoints = bool;
				});

				ifArg("display-reasons", function(bool) {
					if (bool) outputOptions.reasons = true;
				});

				ifArg("display-depth", function(bool) {
					if (bool) outputOptions.depth = true;
				});

				ifArg("display-used-exports", function(bool) {
					if (bool) outputOptions.usedExports = true;
				});

				ifArg("display-provided-exports", function(bool) {
					if (bool) outputOptions.providedExports = true;
				});

				ifArg("display-optimization-bailout", function(bool) {
					if (bool) outputOptions.optimizationBailout = bool;
				});

				ifArg("display-error-details", function(bool) {
					if (bool) outputOptions.errorDetails = true;
				});

				ifArg("display-origins", function(bool) {
					if (bool) outputOptions.chunkOrigins = true;
				});

				ifArg("display-max-modules", function(value) {
					outputOptions.maxModules = +value;
				});

				ifArg("display-cached", function(bool) {
					if (bool) outputOptions.cached = true;
				});

				ifArg("display-cached-assets", function(bool) {
					if (bool) outputOptions.cachedAssets = true;
				});

				if (!outputOptions.exclude)
					outputOptions.exclude = [
						"node_modules",
						"bower_components",
						"components"
					];

				if (argv["display-modules"]) {
					outputOptions.maxModules = Infinity;
					outputOptions.exclude = undefined;
					outputOptions.modules = true;
				}
			}

			ifArg("hide-modules", function(bool) {
				if (bool) {
					outputOptions.modules = false;
					outputOptions.chunkModules = false;
				}
			});

			ifArg("info-verbosity", function(value) {
				outputOptions.infoVerbosity = value;
			});

			ifArg("build-delimiter", function(value) {
				outputOptions.buildDelimiter = value;
			});

			const webpack = require("webpack");

			let lastHash = null;
			let compiler;
			try {
				compiler = webpack(options);
			} catch (err) {
				if (err.name === "WebpackOptionsValidationError") {
					if (argv.color)
						console.error(
							`\u001b[1m\u001b[31m${err.message}\u001b[39m\u001b[22m`
						);
					else console.error(err.message);
					// eslint-disable-next-line no-process-exit
					process.exit(1);
				}

				throw err;
			}

			if (argv.progress) {
				const ProgressPlugin = require("webpack").ProgressPlugin;
				new ProgressPlugin({
					profile: argv.profile
				}).apply(compiler);
			}

			if (outputOptions.infoVerbosity === "verbose") {
				compiler.hooks.beforeCompile.tap("WebpackInfo", compilation => {
					console.log("\nCompilation starting…\n");
				});
				compiler.hooks.afterCompile.tap("WebpackInfo", compilation => {
					console.log("\nCompilation finished\n");
				});
			}

			function compilerCallback(err, stats) {
				if (!options.watch || err) {
					// Do not keep cache anymore
					compiler.purgeInputFileSystem();
				}
				if (err) {
					lastHash = null;
					console.error(err.stack || err);
					if (err.details) console.error(err.details);
					process.exit(1); // eslint-disable-line
				}
				if (outputOptions.json) {
					stdout.write(
						JSON.stringify(stats.toJson(outputOptions), null, 2) + "\n"
					);
				} else if (stats.hash !== lastHash) {
					lastHash = stats.hash;
					if (stats.compilation && stats.compilation.errors.length !== 0) {
						const errors = stats.compilation.errors;
						if (errors[0].name === "EntryModuleNotFoundError") {
							console.error(
								"\n\u001b[1m\u001b[31mInsufficient number of arguments or no entry found."
							);
							console.error(
								"\u001b[1m\u001b[31mAlternatively, run 'webpack(-cli) --help' for usage info.\u001b[39m\u001b[22m\n"
							);
						}
					}
					const statsString = stats.toString(outputOptions);
					const delimiter = outputOptions.buildDelimiter
						? `${outputOptions.buildDelimiter}\n`
						: "";
					if (statsString) stdout.write(`${statsString}\n${delimiter}`);
				}
				if (!options.watch && stats.hasErrors()) {
					process.exitCode = 2;
				}
			}
			if (firstOptions.watch || options.watch) {
				const watchOptions =
					firstOptions.watchOptions ||
					firstOptions.watch ||
					options.watch ||
					{};
				if (watchOptions.stdin) {
					process.stdin.on("end", function(_) {
						process.exit(); // eslint-disable-line
					});
					process.stdin.resume();
				}
				compiler.watch(watchOptions, compilerCallback);
				if (outputOptions.infoVerbosity !== "none")
					console.log("\nwebpack is watching the files…\n");
			} else compiler.run(compilerCallback);
		}

		processOptions(options);
	});
})();
```

- 总的来说`webpack-cli`完成了指令的封装

> webpack和webpack-cli主要实现了一些注入配置的读取和终端指令的封装，更进一步的打包操作封装在webpack中，可以将一些配置传递给webpack

## 实现原理

> [阿里云社区](https://yq.aliyun.com/articles/610004)

> [官网参考](https://webpack.docschina.org/concepts/)

### 模块

- 在模块化编程中，开发者将程序分解成离散功能块

- 每个模块具有比完整程序更小的接触面，使得校验、调试、测试轻而易举。精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中的每个模块都具有条理清晰的设计和明确的目的

- node.js从一开始就支持模块化编程，在web，模块化的支持正缓慢到来

#### webpack模块

- 对比node.js模块，webpack模块能够以各种方式表达它们的依赖关系：
	- ES2915 import 语句
	- CommonJS require() 语句
	- AMD define 和 require 语句
	- css/sass/less 文件中的 @import 语句
	- 样式(url(...)) 或 HTML 文件(<img src=...>)中的图片链接(image url)

> [commonJS、AMD/CMD、ES6 Modules区别](https://github.com/muwoo/blogs/issues/28)
