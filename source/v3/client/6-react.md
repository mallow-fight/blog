---
title: react
order: 6
type: v3/client
---

> [手搓react、react-router、redux](https://github.com/mallow-fight/mini-react)
> 这个仓库中有react、react-router、redux的简单实现。
> 如果想深入了解源码的设计思想，一行行读源码并不是最好的选择，因为源码有很多不需要关注的代码，可以尝试先了解一些设计思想的文章，按照它们的设计思想自己去实现一个简单版本。这样实现的过程中一些疑难点就会引刃而解，对它们是怎么实现的认知也会上升一个档次。

## react

1. 写一个简单版的react最重要的是定义好虚拟DOM树的结构，使用这个结构来适配所有的JSX类型，这样就可以统一操作，不容易出错，处理逻辑复用程度就很高。
2. 其次应该分清各个模块的职责，每个模块之间的功能都是单一且稳定的。
3. 最后是弄清楚树状结构各个层级之间的关系。
4. 主要会用到各种递归以及处理各种类型的DOM元素的差异性。
5. 对比新旧VDOM的算法也挺有意思的，加上一些启发性的算法可以加快对比速度。

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