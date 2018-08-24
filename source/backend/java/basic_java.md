---
title: Basic Java
order: 6
type: java
---

# Java基础

## 1、Hello World
```java
	package basic_java;
	public class HelloWorld {
		public static void main(String[] args) {
			System.out.println("Hello World!");
		}
	}
```
> 在basic_java包中，新建一个HelloWorld类，运行后可在控制台看到输出"Hello World!"字样。
> 运行方式：界面空白处右键选择run或者debug

## 2、八大基本数据类型

类型 | 名称 | 字节数 | 取值范围
:-: | :-: | :-: | :-:
byte | 整型 | 1 | -128 ~ 127
short | （短）整型 | 2 | -32768 ~ 32767
int | 整型（默认） | 4 | -2147483648 ~ 2147483647（正好超过20亿）
long  | （长）整型 | 8 | -9223372036854775808 ~ 9223372036854775807
float | （单精度）浮点数 | 4 | 大约±3.40282347E+38F（有效位数为6 ~ 7位）
double | （双精度）浮点数（默认） | 8 | 大约±1.79769313486231570E+308（有效位数为15位）
char  | 字符型 | 2 | 0 ~ 65535
boolean | 布尔型 | 1 or 4 | true or false


### 练习

````java
package basic_java;

/**
 * 八大基本类型的练习
 */
public class DataType {
    public static void main(String[] args) {
        //基本类型的转换
        int a = 5; //数字 5 默认为int类型
        long b = a; // 自动类型转换 - 小类型转换为大类型
        int c = (int) b; // 强制类型转换 - 大类型转换为小类型

        long d = 5; //自动类型转换
        double e = 5; //自动类型转换

        long f = 100000000000L;
        int g = (int) f; // 超出int范围，强转会溢出
        System.out.println("g~" + g);
        //~ 1215752192 当超过int所能最大值时，会从最小值开始依次向上取值

        double h = 365.98745;
        int i = (int) h; //强转会丢失精度
        System.out.println("i~" + i); //~ 365

        byte b1 = 5;
        byte b2 = 6;
        byte b3 = (byte)(b1 + b2);
        System.out.println("b3~" + b3); //~ 11

        //char - 字符型，2个字节，必须放在单引号中，有且仅有一个
        char c1 = 'J';
        char c2 = '字';
        char c3 = '9';
        char c4 = ' '; //空白字符
        //char c5 = 你; //编译错误，必须放在单引号内
        //char c6 = '你好'; // 编译错误，只能有一个
        //char c7 = ''; //编译错误，必须有一个字符
        char c8 = 97; //数字必须在0~65535之间
        System.out.println("c8~" + c8); //~ a
        System.out.println(2 + 2); //4
        System.out.println('2' + '2'); //100 -- '2'的ASCII码50，加上，'2'的ASCII码50
        char c9 = '\'';
        System.out.println("c9~" + c9); //~ '

        //boolean - 布尔型，1或4个字节，只能取值为true和false
        boolean bool1 = true; //true 为布尔型直接量
        boolean bool2 = false; //false 为布尔型直接量
        //boolean b3 = 250; // 编译错误，数据类型不匹配
    }
}

````
>基本类型间的转换小结
1. 两种形式
	* 自动类型转换：从小类型到大类型
	* 强制类型转换：从大类型到小类型；语法：（要转换的类型）	 变量，强转有可能会溢出或丢失精度
2. 两点规则
	* 整数直接量可以直接赋值给byte，short，char，但不能超范围
	* byte，short，char型变量参与运算时，先一律转为int再运算

## 3、变量

### 简要说明

1. 变量用来指代它所存放的数据，由数据类型+变量名称构成
2. 变量命名规则
	* 只能包含字母、数字、_和$符，且不能以数字开头
	* 严格区分大小写
	* 不能使用关键字
	* 可以中文命名，但不建议；建议见名知意，使用驼峰命名法
3. 变量初始化 -- 第一次赋值
	* 声明的同时初始化
	* 先声明，后初始化
4. 变量的使用
	* 必须与数据类型匹配
	* 对变量的操作即为对所存数据的操作
	* 变量在使用之前必须声明并初始化


### 练习

```java
package basic_java;

/**
 * 变量
 */
public class Var {
    public static void main(String[] args) {
        //变量的声明
        int i; //声明一个整型变量，名为i
        int j,k,l; //声明三个整型变量，名为j,k,l

        //变量的命名：数字、字母、下划线、$组成
        int a1,a_5$,_5,_$;
        //int a*b; //编译错误，不能包含*号
        //int 1a; //编译错误，不能以数字开头
        int a = 5;
        //System.out.println(A); //编译错误，严格区分大小写
        //int class; //编译错误，不能使用关键字
        int 年龄; //正确，但不建议
        int age; //建议“见名知意”
        int score,myScore,myJavaScore; //建议“驼峰命名法”

        //变量的使用
        // 1)必须与数据类型匹配
        // 2)对变量的操作就是对它所存的那个数的操作
        // 3)变量在用之前必须声明并初始化
        // int a = 56.78; //编译错误，数据类型不匹配
        int aa = 5; //声明整型变量aa并赋值为5
        int b = aa + 10; //取出aa的值5，加10后，再赋值给整型变量b
        aa = aa + 10; //取出aa的值5，加10后，再赋值给整型变量aa，在aa本身基础之上增10
        System.out.println("aa~" + aa); //输出aa的值15
        System.out.println("aa"); //aa，双引号中的原样输出
        //System.out.println(m); //编译错误，m未声明
        int m;
        //System.out.println(m); //编译错误，m未初始化

        //变量的初始化：第一次赋值
        //  1)声明的同时初始化
        //  2)先声明后初始化
        int a3 = 250; // 声明整型变量a3，并赋值为250
        int b3; //声明整型变量b
        b3 = 250; //给变量b赋值为250

    }
}

```