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

## 4、扫描器 -- Scanner

### 简要说明
1. Java5的新特性，可以简化文本扫描
2. 最实用的地方表现在获取控制台输入

### 练习
````java
package basic_java;

import java.util.Scanner;

/**
 * Scanner类的演示 -- 读取控制台输入内容
 */
public class ScannerDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入年龄：");
        //扫描内容，并返回int类型的值
        int age = scanner.nextInt();
        System.out.println("请输入价格：");
        //扫描内容，并返回double类型的值
        double price = scanner.nextDouble();
        System.out.println("年龄：" + age);
        System.out.println("价格：" + price);
    }
}

````

## 5、运算符

### 简要说明
1. 算术运算符：+、-、*、/、%、++、--
    * % ： 取余/取模，余数为0即为整除
    * ++/-- ：自增1/自减1，可在变量前，也可在变量后
        * 单独使用时，在前在后无差别
        * 被使用时，在前在后由差别
            a++的值为a
            ++a的值为a+1

2. 关系运算符
    *  \>（大于），<（小于），\>=（大于或等于），<=（小于或等于），==（等于），!=（不等于）
    * 关系运算的结果为boolean型。
      关系成立则为true，关系不成立则为false
    

3. 逻辑运算符
    * &&：短路与（并且），两边都为真则为真，见false则false。若第一个数为false，则发生短路（后边的不执行了）
    * ||：短路或（或者），由一边为真则为真，见true则true。若第一个数为true，则发生短路（后边的不执行了）
    * ! ：逻辑非（取反），非真则假，非假则真
    * 逻辑运算是建立在关系运算的基础之上的，
    逻辑运算的结果也是boolean型

4. 赋值运算符
    * 简单赋值：=
    * 扩展赋值：+=、-=、*=、/=、%=
        * a += b <=> a = a + b
        * a -= b <=> a = a - b
        * a *= b <=> a = a * b
        * a /= b <=> a = a / b
        * a %= b <=> a = a % b

5. 字符串连接运算符：+
    * 两种用法
        * 若两边都是数字，则做加法运算
        * 若有一边为字符串，则做字符串连接

6. 三目/条件运算符
    * 语法
        boolean ? 数1 : 数2
    * 执行过程
        * 计算Boolean的值
            * 若为true，则整个表达式的结果为数1
            * 若为false，则整个表达式的结果为数2


### 练习
````java
package basic_java;

/**
 * 运算符测试
 */
public class OperationDemo {
    public static void main(String[] args) {
        //算术运算符：+、-、*、/、%、++、--
        int a = 5, b = 5;
        System.out.println(a--); //~5
        System.out.println(a); //~4
        System.out.println(--b); //~4
        System.out.println(b); //4

        int c = 5, d = 5;
        int e = c++; //c++ 的值为c(5)
        int f = ++d; //++d的值为d+1(6)
        System.out.println(c); //~6
        System.out.println(d); //~6
        System.out.println(e); //~5
        System.out.println(f); //~6

        System.out.println(5 % 2); //1，商2余1
        System.out.println(6 % 2); //0，商3余0
        System.out.println(2 % 5); //2，商0余2

        //关系运算符：>、<、>=、<=、==、!=
        int g = 5, h = 10, i = 5;
        boolean bool = g > h;
        System.out.println(bool); //~false
        System.out.println(i < h); //~true
        System.out.println(h >= g); //~true
        System.out.println(g <= i); //~true
        System.out.println(g == i); //~true
        System.out.println(g != i); //~false

        //逻辑运算符：&&、||、!
        int j = 5, k = 10, l = 5;
        boolean bool2 = j < k || l++ > 2;
        System.out.println(bool2); //~true
        System.out.println(l); //~5，发生短路了
        boolean bool3 = j > k || l++ > 2;
        System.out.println(bool3); //~false
        System.out.println(l);  //~5，发生短路了
        boolean bool4 = !(j > k);
        System.out.println(bool4); //~ true,!false = true
        System.out.println(!(j < k)); //~ false,!true = false
        System.out.println(j > k || l <= k); //~true,false || true = true
        System.out.println(j == l || k < j); //~true,true || false  = true
        System.out.println(k >= j || l < k); //~true,true || true = true
        System.out.println(j > k || j != l); //~false,false || false = false
        boolean bool5 = j > k && l <= k;
        System.out.println(bool5); //~false,false && true = false
        System.out.println(j == l && k < j); //~true,true && false  = false
        System.out.println(j > k && j != l ); //~false,false && false = false
        System.out.println(k >= j && j < k); //~true,true && true

        //赋值运算符：=、+=、-=、*=、/=
        int m = 5;
        m += 10; //相当于m = m + 10
        System.out.println(m); //~15
        m *= 2; //相当于 m = m * 2
        System.out.println(m); //~30
        m /= 5; //相当于  m = m / 5
        System.out.println(m); //~6

        //字符串连接运算符：+
        int age = 25;
        System.out.println("age="); //~age=
        System.out.println(age); //~25
        System.out.println("age=" + age); //~age=25
        System.out.println("我的年龄是:" + age);
        System.out.println("我今年" + age + "岁了");
        System.out.println(10 + 20 + 30 + ""); //~"60"
        System.out.println(10 + 20 + "" + 30); //~"3030"
        System.out.println("" + 10 + 20 + 30); //~"102030"

        //三目 or 条件 运算符
        int n = 55, o = 8;
        int max = n > o ? n : o;
        System.out.println("max=" + max);
    }
}

````

## 6、控制流程

### 简要说明
> 与任何程序设计语言一样，Java使用条件语句和循环结构确定控制流程

1. 条件语句
    * 格式1：
    ````java
         if(condition) statement1;
    ````
     这里的condition必须要用括号括起来，执行块只有一条语句时，可以省略大括号，但不建议。
    * 格式2：
    ````java
        if(condition) {
            statement1;
            statement2;
        }
    ````
    * 格式3：
    ````java
        if(condition) {
            statement1;
            statement2;
        } else {
            statement3;
            statement4;
        }
    ````
    * 格式4：
    ````java
        if(condition1) {
            statement1;
        } else if(condition2) {
            statement2;
        } ...
    ````   
2. 循环结构
    * while循环：
    ````java
        while(condition) {
            statement
        }
    ````
        当条件为true时，while循环执行一条语句（也可以是一个语句块）；当开始循环条件的值就为false，则while循环体依次也不执行。
    * do...while循环：
    ````java
        do statement while (condition)
    ````
    * for循环语句
    ````java
        for(int i = 0;i <= 10; i++) {
            System.out.println(i);
        }
    ````
        for循环语句是支持迭代的一种通用结构，利用每次迭代之后更新的计数器或类似的变量来控制迭代次数。for语句的第1部分通常用于对计数器初始化；第2部分给出每次新一轮循环执行前要检测的循环条件；第3部分指示如何更新计数器。
3. 多重选择--switch语句

    ````java
        switch(condition) {
            case condition1:
                statement1;
                break;
            case condition2:
                statement2;
                break;
            ...
        }
    ````
    switch语句将从与选项值相匹配的case标签处开始执行直到遇到break语句，或者执行到switch语句的结束处为止。如果没有相匹配的case标签，而有default子句，就执行这个子句。
    
4. 中断控制流程语句
    * goto关键字 -- 尽管Java的设计者将goto作为保留字，但实际上并没有打算在语言中使用它。通常使用goto语句被认为是一种拙劣的程序设计风格。当然，也有一部分程序员认为反对goto的呼声似乎有些过分。例如，Donald Knuth就曾编著过一篇名为《Structured Programming with goto statements》的著名文章，这篇文章说：无限制地使用goto语句确实是导致错误的根源，但在有些情况下，偶尔使用goto跳出循环还是有益处的。
    * break关键字 -- 用于跳出多重嵌套的循环语句。
    * continue -- 将控制转移到最内层循环的首部。

### 练习
````java
package basic_java;

public class Demo {
    public static void main(String[] args) {
        //简单的if结构
        int num = 5;
        if(num % 2 == 0){
            System.out.println(num + "是个偶数");
        } else {
            System.out.println(num + "是个奇数");
        }

        //while循环结构
        int index = 1; // 1.循环变量的初始化
        while(index <= 9){ // 2.循环的条件
            System.out.println(index + "*9 = " + num * 9);
            index++; // 3.循环变量的改变
        }
        System.out.println("over~");

        //do - while 循环结构
        index = 1; // 1.循环变量的初始化
        do{
            System.out.println(index + "*9 = " + num * 9);
            index++; // 3.循环变量的改变
        }while(index <= 9);// 2.循环的条件
        System.out.println("over~");

        //for循环结构
        int sum = 0 ;
        for(int i = 1; i <= 100; i++){
            if(i % 10 != 3){
                sum = sum + num;
            }
        }
        System.out.println("sum = " + sum);

        //continue
        sum = 0; // 重新赋初值
        for(int j = 0; j <= 100; j++){
            if(j % 10 == 3){
                continue; // 跳过循环体中剩余语句而进入下一次循环
            }
            sum = sum + j;
        }
        System.out.println("sum = " + sum);

        //break
        sum = 0; //重新赋初值
        for(int k = 0; k <= 100; k++) {
            if(k % 10 == 0){
                break; // 跳出循环
            }
            sum = sum + k;
        }
        System.out.println("sum = " + sum);
    }
}

````