---
title: JDK环境配置
order: 1
type: java
---


## 安装JDK开发工具包

### [下载JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
	JDK是Java Development Kit的缩写，包含JRE(Java Runtime Environment,即Java运行时环境)以及一些必要的Jar包。

#### 注意
 *  需要的时JDK而不是JRE
 *  Windows或Linux: 32位选择x86，64位选择x64
 *  Linux:选择.tar.gz版本
 *  接收许可协议，然后下载文件

### 设置JDK
    下载JDK后，需要安装这个开发包并明确要在哪里安装，后面还会需要这个信息
##### 开始安装
 * 在Windows上，启动安装程序。一般默认安装目录会是相应的Program Files，自己也可以自定义安装在其他目录
 * 在MAC上，运行安装程序。这会把软件安装到/Library/Java?JavaVirtualMachines/jdk1.8.0_version_jdk/Contents/Home。用Finder找到这个目录。
 * 在Linux上，只需要把.tar.gz文件解压缩到你选择的某个位置，如你的主目录，或者/opt。如果从RPM文件安装，则要反复检查是否安装在/user/java/jdk1.8.0_version。
##### 注意
 在Windows或Linux上安装JDK时，还需要另外完成一个步骤：将JDK安装目录添加到执行路径中--执行路径是操作系统查找可执行文件时所遍历的目录列表。
 -- 在Linux上，需要在~/.bashrc或~/.bash_profile文件的最后增加这样一行：
 export PATH=jdk/bin:$PATH,其中jdk指JDK安装路径。一定要使用JDK的正确路径。
 -- 在Windows上，启动控制面板，选择“系统与安全”，再选择“系统”，选择高级系统设置。在系统属性对话框中，点击“高级”标签页，然后点击“环境变量”按钮。
	滚动“系统变量列表”，直到找到名为Path的变量。点击“编辑”按钮，再点击“新建”，将jdk/bin目录增加到其中。主要要把jdk替换为具体的Java安装路径。
	保存所做的设置。之后新打开的所有控制台窗口都会有正确的路径。
	可以如下测试设置是否正确：打开一个终端窗口，键入：
	javac -version
	然后按回车键。应该能看到显示以下信息：
	javac 1.8.0_31
	如果得到诸如"javac:commond not found"（javac:命令未找到）或"The name specified is no recognized as an internal or external command,operable program or batch file"（指定名不是一个内部或外部命令、可执行的程序或批文件），就需要退回去反复检查你的安装。

#### 文本内容为参考资料所写，有问题请提交至git