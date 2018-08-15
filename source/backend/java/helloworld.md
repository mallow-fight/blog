---
title: HelloWorld
order: 3
type: java
---

## 你的第一个Java程序

### 代码

```
	public class HelloWorld {
		public static void main(String[] args){
			System.out.println("Hello Wolrd!");
		}
	}
```
### 代码描述

```
	1. 要求已经配置好JDK环境  
	2. 可直接用记事本编辑代码，完成后修改后缀名为.java即可  
	3. 打开CMD（命令提示符），进入文件所在目录，执行**javac HelloWorld.java** 命令进行编译，会在相应目录下生成HelloWorld.class字节码文件  
	4. 执行**java HelloWorld**运行代码，可在控制台看到输出Hello World! 
```

### 问题描述
```
	1. 若提示找不到javac命令，请检查JDK环境配置；如无法确定问题所在，请重新配置JDK环境
	2. 若提示HelloWorld类是公共的，请在HelloWorld.java中声明...等信息，请检查文件名与类名是否一致，保证二者一致
	3. 若提示编码问题，请注意代码中应使用英文符号
```

---

>注意：此处使用CMD进行编译和运行，之后代码将使用IntelliJ IDEA开发工具进行