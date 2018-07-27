---
title: react
type: framework
order: 2
---

- [ ] vue和react 虚拟dom更新机制差异
- [ ] 为什么vue不需要使用shouldComponentUpdate

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
- 装载过程（Mount）：第一次把组件渲染到DOM树的过程
  - constructor：构造函数，经常是为了初始化state或者绑定成员函数的this环境，建议直接使用箭头函数，则需要在构造函数中进行函数的bind操作。
  - componentWillMount：预装载函数，不能进行修改state的操作，即使做了，也不会进行数据状态的渲染。在该函数中做的操作，都可以提前到构造函数中，比较鸡肋。
  - render：渲染函数，唯一不能省略的函数，必须有返回值，返回null或false表示不渲染任何dom元素。它是一个仅仅用于渲染的纯函数，返回值完全取决于this.state和this.props，不能在函数中任何修改props、state、拉取数据等具有副作用的操作。render函数返回的是jsx对象，该函数并不因为这渲染到DOM树，何时进行真正的渲染是由React库决定的。
  - componentDidMount：挂载成功函数，该函数不会在render函数调用完成之后立即调用，因为render函数仅仅是返回了JSX的对象，并没有立即挂载到DOM树上，而componentDidMount是在组件被渲染到DOM树之后被调用的。另外，componentDidMount函数在进行服务器端渲染时不会被调用。
  - 在React中，除了render函数之外，都有默认的函数实现，如果不要使用相应的生命周期函数则可以省略。constructor通常用于state的初始化操作，this.state = {}；函数绑定this建议在定义的时候直接使用箭头函数来实现，就不需要在constructor函数中进行this绑定操作了。componentWillMount用的很少，比较鸡肋。render函数必须实现，可以返回null来进行不渲染。componentDidMount通常用于服务器数据的拉取操作，之所以在componentDidMount中而不是在构造函数中进行数据拉取的原因：如果数据拉取回来了，即props已经有值了，但是组件还没有渲染出来，会报错。但是这里有一些把数据拉取提前到constructor函数的思路：在constructor函数中，通过promise来进行数据的拉取，并且绑定到this对象上，然后在componentDidMount中执行promise把数据更新到props上。

- 更新过程（Update）：组件进行渲染更新的过程
  - 当组件挂载到DOM树上之后，props/state被修改会导致组件进行更新操作，更新过程会以此调用如下的生命周期函数：
  - componentWillReceiveProps(nextProps)：该函数在组件进行更新以及父组件render函数（不管数据是否发生了变化）被调用后执行，this.props取得当前的props，nextProps传入的是要更新的props
  - shouldComponentUpdate(nextProps, nextState)：返回bool值，true表示要更新，false表示不更新，使用得当将大大提高React组件的性能，避免不需要的渲染。
  - componentWillUpdate：预更新函数
  - render：渲染函数
  - componentDidUpdate：更新完成函数
  - 相比装载过程的生命周期函数，更新过程的生命周期函数使用的相对来说要少一些。常用的是componentWillReceiveProps、componentShouldUpdate，前者经常用于根据前后两个数据去设置组件的状态，而后者则是常用于优化，避免不必要的渲染。

- 卸载过程（Unmount）：组件从DOM树中删除的过程
  - 卸载过程只涉及一个函数componentWillUnmount，当React组件要从DOM树上删除前，会调用一次这个函数。这个函数经常用于去除componentDidMount函数带来的副作用，例如清除定时器、删除componentDidMount中创造的非React元素。

- setState
  - 要修改state，只能使用this.setState()，不能使用this.state.value=2类似方式设置state，一是不会驱动重新渲染，二是很可能被后面的操作替换，造成无法预知的错误。此外，React利用状态队列来实现setState的异步更新，避免频繁地重复更新state。
  - setState的调用是有风险的，在某些生命周期函数中调用可能会无用甚至造成循环调用导致崩溃。state的初始化一般在构造函数中实现：setState可以在装载过程的componentWillMount、componentDidMount中调用，可以在更新过程中的componentWillReceiveProps、componentDidUpdate中调用。

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
- 点击事件或者其他事件的`e`是一个合成事件，React根据标准自定义了这些合成事件，所以你不需要担心跨浏览器兼容性问题
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