/**
 * 模块捆绑将小块的代码编译成更大且更复杂的可以运行在浏览器的代码块。
 * 这些小的块是js文件，它们之间的依赖通过一个模块系统表示。
 * 
 * 模块捆绑者通过一个入口文件拥有这个概念。
 * 我们让捆绑者知道哪个文件是我们应用的主要文件而不是添加一些脚本标签。
 * 那是一个应该引导整个应用的文件。
 * 
 * 我们的捆绑者应该从这个入口文件开始，而且他会尝试理解哪个文件是它依赖的。
 * 然后，它会尝试理解它的依赖的依赖，一直到执行完毕，这样每个模块的依赖就都知道了。
 * 
 * 对一个项目的理解叫做依赖图
 * 
 */
const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const {transformFromAst} = require('babel-core');

let ID = 0;

// 首先创建一个函数，它接受一个文件的路径，读取它的内容，分析它的依赖。

function createAsset(filename) {
  // content是string类型的
  const content = fs.readFileSync(filename, 'utf-8');

  // 现在我们试着去弄清楚这个文件依赖哪些文件，我们可以通过查找文件内容里面的import关键字来实现。
  // 但是，那是一种很笨拙的方法，所以，我们使用一个js语法分析器。

  // js语法分析器是可以阅读和理解js代码的工具。
  // 它们通常有一个更抽象的名字叫AST（abstract syntax tree）（抽象语法树）。

  // 强烈推荐一个生成AST的网站（https://astexplorer.net)，上面可以看到AST长什么样子。

  // AST包含了很多关于我们代码的信息，我们可以通过查询它来知道这段代码试图去干什么。
  // babylon是一个js语法分析器。
  const ast = babylon.parse(content, {
    sourceType: 'module'
  })

  // 使用一个数组来保存入口文件所依赖的文件的相对路径。
  const dependencies = [];

  // 我们翻译AST来尝试和理解这个文件的依赖。为了做到那些，我们检查AST中的每个import声明。
  traverse(ast, {
    // EcmaScript模块是相当简单的，因为他们是静态的。这意味着你不能导入一个变量，或者根据条件导入其它模块。
    // 我们只能每次将看到的import声明的值计算成一个依赖。
    ImportDeclaration: ({node}) => {
      // 我们将我们导入的值放到依赖数组中
      dependencies.push(node.source.value);
    }
  });

  // 同样安排一个独一无二的标识符给这个模块，简单的增加ID来实现。
  const id = ID++;

  // 我们使用EcmaScript模块和其他有可能不被所有浏览器支持的JS特性来确保我们编译之后的文件可以运行在所有浏览器中。
  // 为了达到这种效果，我们使用了babel来翻译这个文件

  // `presets`选项是一组规则来告诉babel如何翻译我们的代码。
  // 我们使用`babel-preset-env`来翻译我们的代码使得大多数浏览器都可以运行。

  const {code} = transformFromAst(ast, null, {
    presets: ['env']
  });

  // 返回所有关于这个模块的信息
  return {
    id,
    filename,
    dependencies,
    code
  }
}

// 我们已经将单个模块的依赖抽象出来了，之后我们将要提取入口文件的依赖

function createGraph(entry) {
  // 从分析入口文件开始
  const mainAsset = createAsset(entry);

  // 我们使用一个队列来解析每个资源的依赖。
  // 使用一个只包含入口资源的数组来实现。
  const queue = [mainAsset];

  // 我们使用一个`for ... of`循环来迭代这个队列。
  // 开始的时候只有一个资源，但是随着我们的迭代，它会向队列中推入新的资源。
  // 如果队列空了，那么循环将会终止。
  for (const asset of queue) {
    // 我们的每个资源都保存着一个依赖模块相对路径列表。
    // 我们将会不断的迭代他们，用我们的`createAsset()`函数解析他们。
    // 同时会追踪这个对象的依赖。
    asset.mapping = {};

    // 这是模块的目录
    const dirname = path.dirname(asset.filename);

    // 我们迭代依赖列表的相对路径
    asset.dependencies.forEach(relativePath => {
      // 我们的`createAsset()`函数期待一个绝对路径。
      // 依赖数组是一个相对路径的数组。
      // 这些路径相对于导入它们的文件。
      // 我们可以将这些相对路径转化为绝对路径通过连接父级资源的目录。
      const absolutePath = path.join(dirname, relativePath);

      // 解析资源，读取它的内容，并且提取它的依赖。
      const child = createAsset(absolutePath);

      // 我们本质上知道`asset`依赖于`child`。
      // 我们通过添加一个属性给`mapping`来描述这种关系，这个属性是`child`的id
      asset.mapping[relativePath] = child.id;

      // 最后，我们将孩子的资源放到队列中，这样孩子的依赖也会被迭代和解析
      queue.push(child);
    });
  }
  // 到了这一步，队列仅仅只是一个包含了每个目标模块的数组。
  // 这就是我们表示图的方式
  return queue;
}

// 接下来，我们定义了一个会使用我们的图，并且生成一个可以在浏览器中运行的bundle
// 我们的bundle只有一个自运行的函数：(function() {})()
// 这个函数将会接受一个参数：一个带有我们的图中的每个模块信息的对象。

function bundle(graph) {
  let modules = '';

  // 在我们得到函数体之前，我们需要建造一个作为参数传递的对象。
  // 注意我们建造的字符串被{}环绕了，所以针对每个模块，我们添加了一个格式化的字符串：`key: value,`。

  graph.forEach(mod => {
    // 每个图中的模块都有一个入口。
    // 我们使用模块的id作为键，一个数组作为值，这样每个模块我们有2个值。

    // 第一个值是每个模块的代码主体。
    // 这是因为模块应该是闭合的：在一个模块中声明一个变量不应该影响其它或者全局的东西。

    // 我们的模块，当我们使用CommonJS模块系统翻译了之后：
    // 他们期待的是一个`require`，一个`module`以及一个`exports`对象可以被使用。
    // 他们通常在浏览器中都是不可获取的，所以我们声明了它们并将它们注射到包装函数中

    // 关于第二个值，我们在模块和它的依赖之间将mapping字符串化。
    // 看起来像这个对象：{ './relative/path': 1 }

    // 这是因为翻译过后的模块代码通过相对路径来使用`require()`。
    // 当这个函数被调用，我们应该知道图中的相对路径对应着哪个模块
    modules += `\n${mod.id}: [
      function (require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)},
    ],\n`;
  });

  // 最后，我们声明这个自运行函数体。

  // 我们以创建一个`require()`函数开始：它接受一个模块ID，然后在之前创建的`modules`对象上查找它。
  // 我们解构包含两个值的数组来获得我们的包装函数和`mapping`对象。

  // 我们模块的代码以相对路径通过`require()`调用而不是模块ID。
  // 我们需要的的函数期待模块ID进行调用。
  // 同样，两个模块可能`require()`同样的相对路径但是是不同的两个模块。

  // 为了解决这个问题，当一个模块被引用，我们为它创建一个新的，专用的`require`函数去使用。
  // 具体来说就是模块会根据模块的`mapping`对象来将相对路径转化为ids。
  // `mapping`对象就是相对路径和模块IDs的图。

  // 最后，通过CommonJs，当一个模块被引用，它可以通过`exports`对象暴露值。
  // `exports`对象，当它被模块代码修改之后，会从`require()`函数返回。

  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        
        function localRequire(name) {
          return require(mapping[name]);
        }

        const module = { exports: {} };

        fn(localRequire, module, module.exports);

        return module.exports;
      }

      require(0);
    })({${modules}})
  `
  
  return result;
}

const graph = createGraph('./example/entry.js');
const result = bundle(graph);

console.log(result)