---
title: antd
order: 7
type: v3/frontend
---

## form

### FormCreator

1. FormList：数组，里面每一个元素都是一个指定类型的表单元素。
2. touchAction：函数，代理了所有表单元素的交互事件，参数有Form，以及交互产生的值。通过Form来修改其他表单元素的值，通过修改state中的FormList来修改options等配置选项。

- 优点：表单联动很方便，事件驱动，更容易控制事件触发动作。
- 缺点：扩展组件写起来略麻烦，每个事件都要代理touchAction，业务逻辑分离不太好做，不熟悉的人不太容易上手。

### FormBuilder

1. 格式化Props为Form和FormItems需要的属性。
2. 将格式化之后的属性通过Provider给到Control中的Consumer。
3. Control消费Consumer来控制显示的表单元素。

- 优点：减少代码量
- 缺点：联动非常难，代码比较混乱，维护和拓展比较难，嵌套比较多。

### FormItems

1. 只渲染Form.Items。
2. 通过renderMap拓展表单元素类型。

- 优点：减少代码量，实现简单，结构清晰，可以很方便的扩展表单元素类型，各个类型隔离性比较好。
- 缺点：刚开始，表单元素类型没有那么多，没有那么成熟。

### 最佳实践

1. 同一个页面使用一个表单。
2. config属性尽量贴近原生。
3. 通过form对象来修改表单的值，通过修改state模版来修改诸如options之类的配置项。

### 已完成

1. 大部分表单类型。
2. 提示和校验中文化。

### 待开发

1. 可封装一个类型使得枚举类无感知嵌入。
2. 更方便修改options等配置项。
3. 更多类型。

### 意见收集

1. 是否需要使用到Provider和Consumer