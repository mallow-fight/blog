---
title: 类与对象
order: 7
type: java
---


## 1、类与对象的概念

### 简要说明
1. 什么是类？什么是对象？

    * 现实生活是由很多很多对象组成的，基于对象抽出了类
    * 对象：真实存在的单个个体  
        类：类别，代表一类个体
    * 类中包含
        * 所有对象所共有的特征/属性 --- 变量
        * 所有对象所共有的行为 --- 方法
    * 一个类可以创建多个对象，同一个类型的多个对象，结构相同，数据不同
    * 类是对象的模板，对象是类的具体的实例

2. 如何创建类？如何创建对象？

3. 引用类型使用“=”，表示两个引用指向同一个对象

4. null与NullPointerException
    * null表示空，没有指向任何对象
    * 若引用的值为null，则不能再进行任何操作了，若进行操作，则会提示空指针异常

## 2、方法

### 简要说明
1. 方法的签名：方法名 + 参数列表

2. 方法的重载（overload）：
    * 在同一个类中，方法名称相同，参数列表不同
    * 编译器在编译时会自动根据签名来绑定调用不同的方法

3. 构造方法：构造器、构建器、构造函数
    * 常常用于给成员变量赋初值
    * 与类同名，没有返回值类型
    * 在创建对象时被自动调用
    * 若自己不写构造，则默认一个无参的空构造，  
      若自己写了构造，则不再提供默认构造。
    * 构造方法可以重载

4. this：指代当前对象，哪个对象调用指的就是哪个对象，方法中访问成员变量之前默认有个this
    * this的用法：
        * this.成员变量 -- 访问成员变量  
          this.方法名() -- 调用方法  
          this() -- 调用构造方法

5. 引用类型数组：
    * Object[] objs = new Object[n];

### 练习
````java
package basic_java;

/**
 * 重载的演示
 * 补充：
 *  1.java一个文件中可以包含多个类
 *  2.public修饰的类只能有一个
 *  3.public修饰的类的类名必须与文件名相同
 */
public class OverloadDemo {
    public static void main(String[] args) {
        ABC abc = new ABC();
        abc.say();
        abc.say("zhangsan");
        abc.say(25);
        abc.say("zhangsan",25);
        abc.say(25,"zhangsan");
    }
}

class ABC {
    void say(){}
    void say(String name){}
    void say(int age){}
    void say(String name,int age){}
    void say(int age,String name){}
    //int say(){return 1;} // 编译错误，与返回值类型无关
    //void say(String address){} //编译错误，与参数名称无关
}
````

## 3、继承

### 简要说明

1. 内存管理 -- 由JVM来分配管理，仅做了解
    * 堆 --
        * 存储所有new出来的对象（包括成员变量）
        * 成员变量的声明周期：  
            创建对象时在堆中存在，垃圾回收器回收对象时一并消失
        * 垃圾回收器（GC），不定时到内存中清理垃圾  
          没有任何引用指向的对象就是垃圾  
          回收过程是透明的，System.gc（）建议快一些回收
        * 内存泄漏：不再使用的内存没有被及时的回收，建议将不再使用的对象引用及时设置为null
    * 栈 --
        * 存储正在执行的方法中的所有局部变量
        * JVM为每一个正在调用中的方法在栈中分配一块对应的栈帧，栈帧中包含方法中的所有局部变量，方法执行完以后，栈帧被清除，局部变量一并消失
        * 局部变量生命周期：  
            调用方法时存在栈中，方法结束栈帧被清除时消失        
    * 方法区 --
        * 用于存储字节码文件（.class）以及方法
        * 方法只有一份，通过this来区分具体的对象
2. 继承
    * 作用：代码复用，避免代码的重复
    * 通过extends实现继承
    * 父类： 所有子类所共有的属性和行为  
      子类： 子类所特有的属性和行为
    * 子类继承父类后，子类具有：
        父类的 + 子类的
    * 一个父类可以有多个子类  
      一个子类只能有一个父类 -- 单一继承
    * 继承具有传递性
    * java规定：构造子类之前必须先构造父类  
      在子类构造方法若没有通过super调用父类的构造方法，则默认super()调用父类的无参构造，若子类构造方法中自己调用了，则不再默认提供super调用父类构造方法，必须位于子类构造方法的首行位置。
3. super -- 指代当前对象的父类对象
4. 向上造型：
    * 父类型的引用指向子类的对象
    * 能调用什么方法，看引用的类型

### 练习

#### super
````java
package basic_java;

/**
 * super的演示
 */
public class SuperDemo {
    public static void main(String[] args) {
        BBB bbb = new BBB();
    }
}

class AAA {
    AAA(){
        System.out.println("父类构造器");
    }
}
class BBB extends AAA {
    BBB(){
        //super(); //默认的
        System.out.println("子类构造器");
    }
}
class CCC {
    CCC (int a){

    }
}
class DDD extends CCC{

    DDD(int a) {
        super(a);
    }
}
````

#### 向上造型
````java
package basic_java;

/**
 * 向上造型的演示
 */
public class UpTypeDemo {
    public static void main(String[] args) {
        EEE e = new EEE();
        e.e = 1;
        e.show();
        //e.f = 2; //编译错误，父不能放问子
        FFF f = new FFF();
        f.f = 1;
        f.say();
        f.e = 2; // 正确，子可以访问父
        f.show();

        EEE e2 = new FFF(); //向上造型
        e2.e = 1;
        e2.show();
        //e2.f = 2; //编译错误，能调用什么，看引用的类型
    }
}

class EEE {
    int e;
    void show(){}
}
class FFF extends EEE {
    int f;
    void say(){}
}
````

## 4、方法的重载、重写、访问控制修饰符

### 简要说明
1. 方法的重写（override）：覆盖、重新写
    * 发生在父子类中，方法签名相同，方法体不同
    * 重写方法被调用时，看对象的类型
2. 重写与重载的区别：
    * 重写（override）：  
        * 发生在父子类中，方法名相同，参数列表相同，方法体不容
        * 遵循“运行期”绑定，根据对象的类型调用方法
    * 重载（overload）：
        * 发生在一个类中，方法名相同，参数列表不同，方法体不同
        * 遵循“编译期”绑定，根据引用的类型绑定调用方法
3. package：
    * 作用：避免类名的冲突
    * 包名常常有层次结构，建议包名所有字母都小写
    * 类的全名：包名.类名
    * 同包中的类不能同名
    * import：
        * 同包中的类可以直接访问，不同包中的类不能直接访问，有如下两种方式：
            * 先import声明/引入，后使用 -- 建议
            * 类的全称 -- 太长了，不建议
4. 访问控制修饰符
    * public：公共的，任何类
    * private：私有的，本类
    * protected：受保护的，奔雷、子类、同包类
    * 默认的：什么也不写，本类、同包类
    * 只能用public和默认的来修饰类，类的成员如上4中都可以
5. static：静态的
    * 静态变量：
        * 由static修饰
        * 属于类的，存在方法区中，只有一份
        * 常常通过类名.来访问
        * 何时用：所有对象数据都一样时使用
    * 静态方法：
        * 由static修饰
        * 存在方法区中，只有一份
        * 常常通过类名.来访问
        * 没有隐式this传递，静态方法中不能直接访问实例成员
        * 何时用：方法的操作仅与参数相关，而与对象无关时使用
    * 静态块：
        * 类被加载期间自动执行，因为类只被加载一次，所以静态块也只执行一次
        * 何时用：常常用于初始化静态资源（图片、音频、视频...）
6. final：最终的
    * 修饰变量：变量不能被改变
    * 修饰方法：方法不能被重写
    * 修饰类： 类不能被继承

### 练习
#### 重写
````java
package basic_java;

/**
 * 重写的演示
 */
public class OverrideDemo {
    public static void main(String[] args) {
        B b = new B();
        b.show(); // 子类show
        A a = new B(); // 向上造型
        a.show();// 子类show
        A a1 = new A();
        a1.show(); // 父类show
        B b1 = new B();
        b1.show();
    }
}

/*
   重写需遵循“两同两小一大”原则：
   1.两同：
    1）方法名相同
    2）参数列表相同
   2.两小：
    1）子类方法的返回值类型小于或等于父类的
        1.1）返回值类型为void时，必须相等
        1.2）返回值类型为基本类型时，必须相等
        1.3）返回值类型为引用类型时，小于或等于
     2）子类方法所抛出的异常小于或等于父类的 -- 异常之后
    3.一大
      1）子类方法的访问权限大于或等于父类的 -- 访问修饰符之后
 */

//父类大，子类小
class A {
    void show(){}
    double say(){
        return 0.0;
    }
    A test(){
        return null;
    }
    B showShow(){return null;}
}
class B  extends A{
    //int show(){return 1;} // 编译错误，void时必须相等
    //int say(){return 1;} //编译错误，基本类型时必须相等
    B test(){return null;} // 正确，小于
    //A showShow(){return null;} // 编译错误，只能小于或等于，不能大于

}
````
#### 重写与重载
````java
package basic_java;

/**
 * 重写与重载的区别
 */
public class OverrideAndOverloadDemo {
    public static void main(String[] args) {
        //重载看引用，重写看对象
        AA aa = new AA();
        BB bb = new CC();
        aa.test(bb);
    }
}

class AA{
    void test(BB bb){
        System.out.println("父型参数");
        bb.show();
    }
    void test(CC cc){
        System.out.println("子型参数");
        cc.show();
    }
}
class BB{
    void show(){
        System.out.println("父类show");
    }
}
class CC extends BB{
    @Override
    void show(){
        System.out.println("子类show");
    }
}
````
#### static修饰符
````java
package basic_java;

/**
 * static 的演示
 */
public class StaticDemo {
    public static void main(String[] args) {
        Loo o1 = new Loo();
        o1.show();
        Loo o2 = new Loo();
        o2.show();
        System.out.println(Loo.b); // 建议写法
        System.out.println(o1.b); //不建议

        Moo.test();
        //静态块只会在第一次加载的时候加载一次资源，之后不再加载
        Noo o3 = new Noo();
        Noo o4 = new Noo();
        Noo o5 = new Noo();
    }
}

class Noo{
    Noo(){
        System.out.println("构造方法");
    }
    static {
        System.out.println("静态块");
    }
}

class Moo { //演示静态方法
    int a;
    static int b;
    void show(){
        this.a = 1;
        Moo.b = 2;
    }
    static void test(){ //没有隐式的this传递
        //a = 1;//没有this就意味着没有对象，而实例变量a必须通过对象点来访问，所以此处编译错误
        Moo.b = 2;
    }
}

class Loo { //演示静态变量
    int a;
    static int b;
    Loo(){
        a++;
        b++;
    }
    void show(){
        System.out.println("a=" + a);
        System.out.println("b=" + b);
    }

}
````

#### final修饰符
````java
package basic_java;

/**
 * final的演示
 */
public class FinalDemo {
}

final class Roo {}  //演final修饰类
//class Soo extends Roo{} //编译错误，final修饰的类不能被继承
class Too{}
final class Uoo extends Too{} // 正确，final修饰的类可以继承别的类

class Poo{ //演示final修饰方法
    final void show(){}
    void say(){}
}

class Qoo extends Poo{
    //void show(){} // 编译错误，final修饰的方法不能被重写
    void say(){}
}
/*
    final修饰成员变量，只有两种初始化方法：
        1）声明的同时初始化
        2）构造方法中初始化
    final修饰局部变量，用之前赋值即可
 */
class Ooo{ //演示final修饰变量
    final int a = 5;
    final int b;
    Ooo(){
        b = 8;
    }
    void test(){
        final int c;//用之前赋值即可
        //a = 55; //编译错误，final修饰的变量不能被改变
    }
}

````

## 5、常量、抽象方法、接口
1. static final修饰常量
    * 必须声明的同时初始化
    * 通过类名.来访问，不能被改变
    * 建议常量名所有字母都大写
    * 编译器在编译时被自动替换为具体的值，效率高

2. 抽象方法
    * 由abstract修饰
    * 包含抽象方法的类必须时抽象类，不包含抽象方法的类也可以声明为抽象类
    * 抽象类不能被实例化
    * 抽象类是需要被继承的，子类需要满足：
        * 重写父类的所有抽象方法
        * 也可以声明为抽象类
    * 抽象类的意义：
        * 封装子类共有的属性和行为，被子类共用
        * 为所有子类提供了公共的类型 -- 向上造型
        * 可以包含抽象方法，为所有子类提供一个统一的入口
3. 接口
    * 是一个标准、规范
    * 由interface定义
    * 只能包含常量和抽象方法
    * 接口不能被实例化
    * 接口是需要被实现/继承的，实现类/子类必须重写接口中所有抽象方法
    * 一个可以实现多个接口，用逗号隔开，若既继承又实现时，应先继承后实现
    * 接口可以继承接口

### 练习

#### 常量

````java
package basic_java;

/**
 * static final 常量的演示
 */
public class StaticFinalDemo {
    public static void main(String[] args) {
        System.out.println(Foo.PI);//常量通过类名.来访问
        //Foo.PI = 3.1415926; //编译错误，常量不能被改变
        //1)加载Doo.class到方法区中
        //2)count变量一并存在方法区中
        //3)到方法区中获取count的值并输出
        System.out.println(Doo.count);
        //编译器在编译时直接替换为
        //System.out.println(8); //效率更高
        System.out.println(Doo.NUM);
    }
}

class Doo {
    public static int count = 5; // 静态变量
    public static final int NUM = 8; //常量
}
class Foo {
    public static final double PI = 3.14159;
    //public static final int NUM; //编译错误，必须声明同时初始化
}
````
#### 抽象类与抽象方法
````java
package basic_java;

/**
 * 抽象类与抽象方法
 */
public class ShapeTest {
    public static void main(String[] args) {
        //Shape s = new Shape(); //编译错误，抽象类不能被实例化
        Shape[] shapes = new Shape[4];
        shapes[0] = new Square(1); // 向上造型
        shapes[1] = new Square(2);
        shapes[2] = new Circle(1);
        shapes[3] = new Circle(2);
    }
}

abstract class Shape{//抽象类
    protected double c; // 周长
    public abstract double area(); // 抽象方法
}

class Square extends Shape{
    public Square(double c){
        this.c = c;
    }

    //重写抽象方法
    //注解更方便验证是否正确重写了该方法，即父类中是否存在
    @Override
    public double area() {
        return 0.0625*c*c;
    }
}

class Circle extends Shape{
    public Circle(double c){
        this.c = c;
    }

    @Override
    public double area() {
        return 0.0796*c*c;
    }
}
````
#### 接口

````java
package basic_java;

/**
 * 接口的演示
 */
public class InterfaceDemo {
}
//接口的语法
interface Inter4{
    public static final int NUM = 250;
    public abstract void show();
    double PI = 3.14159;// 默认public static final
    void say(); // 默认public abstract
    //int count; // 编译错误，接口中的数据默认为常量，常量必须声明同时初始化
    //void sayHi(){} // 编译错误，接口中的方法默认为抽象的，抽象方法不能有方法体
}

//接口的实现
interface InterTest{
    void show();
    void say();
}

class Ioo implements InterTest{

    @Override
    public void show() {

    }

    @Override
    public void say() {

    }
}

//接口继承接口
interface Inter5{
    void show();
}
interface Inter6 extends Inter5{
    void say();
}
class Eoo implements Inter6{

    @Override
    public void show() {

    }

    @Override
    public void say() {

    }
}

//一个类可以实现多个接口
//又继承又实现时，应先继承后实现
interface Inter7{
    void show();
}
interface Inter8{
    void say();
    void sayHi();
}
abstract class Goo{
    abstract void test();
}
class Hoo extends Goo implements Inter7,Inter8{

    @Override
    public void show() {

    }

    @Override
    public void say() {

    }

    @Override
    public void sayHi() {

    }

    @Override
    void test() {

    }
}
````

## 6、多态、内部类

### 简要说明

1. 多态
    * 多态的意义
        * 同一类型的引用指向不同的对象时，有不同的实现 -- 行为的多态
        * 同一个对象被造型成不同的类型时，有不同的功能 -- 对象的多态
    * 向上造型：
        * 父类的引用指向子类的对象
        * 能造型成的类型包括：父类 + 所实现的接口
        * 能调用什么，看引用的类型
    * 强制类型转换，须满足以下条件：
        * 引用所指向的对象就是该类型
        * 引用所指向的秀爱那个实现了该接口
    * 若不符合以上两个条件，则发生ClassCastException类型转换异常，另外，强转之前建议通过instance of判断引用指向的对象是否是该类型

2. 成员内部类：应用率比较低
    * 类中套类，外面的称为Outer外部类，里面的称为Inner内部类
    * 内部类通常之服务于外部类，对外不具备可见性
    * 内部类中可以直接访问外部类的成员（包括私有的），内部类隐式的引用指向了创建它的外部类对象

3. 匿名内部类：比较常用
    * 想创建一个类的对象，并且对象只创建一次，该类不必命名，称之为匿名内部类，前提是匿名内部类一定得是子类或实现类
    * 匿名内部类中想访问外部的变量，该变量必须是final的

4. 面向对象的三大特征：
    * 封装：
        * 类 - 封装的是对象的属性和行为
        * 方法： 封装的是具体的逻辑
        * 访问控制修饰符：封装访问的权限
    * 继承：
        * 代码的复用
        * 父类/基类：共有的属性和行为  
          子类/派生类：特有的属性和行为
        * 子类继承父类后，子类具有： 父 + 子
        * 单一继承、传递性
    * 多态：
        * 意义：行为的多态、对象的多态
        * 向上造型、强制类型转换、instance of
        * 多态的表现形式：重写、重载
        
### 练习

#### 多态

````java
package basic_java;

/**
 * 多态的演示
 */
public class MultiTypeDemo {
    public static void main(String[] args) {
        Aoo o1 = new Boo();// 向上造型 -- 自动类型转换
        Boo o2 = (Boo) o1; //引用o1所指向的对象Boo，就是Boo类型
        Inter1 o3 = (Inter1) o1; //引用o1所指向的对象Boo，实现了Inter1接口
        //Coo o4 = (Coo) o1; //ClassCastException 类型转换异常
        if(o1 instanceof Coo){ //false
            Coo o5 = (Coo) o1;
        }
    }
}

interface Inter1{ }
class Aoo{ }
class Boo extends Aoo implements Inter1{ }
class Coo extends Aoo{ }
````

#### 成员内部类

````java
package basic_java;

/**
 * 成员内部类的演示
 */
public class InnerClassDemo {
    public static void main(String[] args) {
        Mama m = new Mama();
        //Baby b = new Baby(); // 编译错误，内部类对外不具备可见性
        Mama.Baby  baby = m.createBaby(); // 可以调用Mama的成员方法常见内部类对象
    }
}
class Mama{
    private String name;
    Baby createBaby(){
        return new Baby(); // 内部类通常在外部类中创建
    }
    class Baby{
        void showMamaName(){
            System.out.println(name);
            System.out.println(Mama.this.name);
            //System.out.println(this.name); // 编译错误，this代表Baby类，而Baby类中没有name属性
        }
    }
}
````

#### 匿名内部类
````java
package basic_java;

/**
 * 匿名内部类
 */
public class NstInnerClassDemo {
    public static void main(String[] args) {
        //Inter2 o1 = new Inter2(); //编译错误，接口不能被实例化
        //1)为Inter2创建一个子类，但是没有名字
        //2)为该子类创建了一个对象，名为o1
        //3)大括号中的为子类的类体
        Inter2 o1 = new Inter2() {

        };
        //1)为Inter2创建一个子类，但是没有名字
        //2)为该子类创建了一个对象，名为o2
        //3)大括号中的为子类的类体
        Inter2 o2 = new Inter2() {

        };

        final int num = 250;
        Inter3 o3 = new Inter3() {
            @Override
            public void run() {
                System.out.println("runrun");
                System.out.println(num);
            }
        };
        o3.run();
    }
}

interface Inter2{ }
interface Inter3{
    void run();
}
````
