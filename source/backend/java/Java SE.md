---
title: Java SE
order: 8
type: java
---


## 1、JAVA DOC

### 简要说明
1. 文档注释，只修饰三个地方，分别是类、常量、方法
    * 文档注释会被javadoc命令生成为一个文档手册

### 练习
````java
package basic_java;

/**
 * 文档注释，只修饰三个地方，分别是类、常量、方法
 * 文档注释会被javadoc命令生成为一个文档手册
 *
 * 在类上使用文档注释用来说明当前类的设计目的
 *
 * 当前类是用来测试文档注释的使用
 */
public class APIDocDemo {
    /**
     * sayHello 方法需要的问候短语
     */
    public static final String INFO = "你好！";

    /**
     * 该方法用于为指定用户生成一个问候语
     * @param name 给定的用户的名字
     * @return 问候语
     */
    public static String sayHello(String name){
        return INFO + name;
    }
}

````
## 2、String 、 StringBuilder

### 简要说明
1. String是不变对象，即：对象内容不可改变。若改变字符串内容，一定是创建新对象。推荐使用字面量形式创建字符串

2. StringBuilder
    * 是为了解决字符串频繁修改内容所导致的资源消耗问题
    * StringBuilder内部是一个可变的字符数组，所以所有的字符串内容修改都是在这一个对象内完成，而不会因为每次的内容修改创建新对象。
    * StringBuilder提供了包括增、删、改、插入这些编辑字符串操作的相关方法。

### 练习
#### String
````java
package basic_java;

/**
 * 字符串练习
 * 字符串是不变对象，即：对象内容不可改变。
 * 若改变字符串内容一定创建新对象。
 * 字符串推荐使用字面量形式创建（有优化效果）
 */
public class StringDemo {
    public static void main(String[] args) {
        String s1 = "123abc";
        String s2 = "123abc";
        String s3 = "123abc";
        System.out.println(s1 == s2); //~ true
        System.out.println(s1 == s3); //~ true
        String s4 = new String("123abc");
        System.out.println(s1 == s4); //~ false
        /*
            编译器有一个优化措施，即：当一个计算表达式的计算符
            两边都是字面量时，那么编译器会直接将结果计算出来并编译到
            .class文件中。
            所以，下面的代码在class文件中为：
            String s5 = "123abc";
         */
        String s5 = "123" + "abc";
        System.out.println(s1 == s5); //~ true
        String s6 = "123";
        String s7 = s6 + "abc";
        System.out.println(s1 == s7); //~ false
        String s8 = 1 + "2" + "3abc";
        System.out.println(s1 == s8); //~ true
        String s9 = 1 + '2' + 3 + "abc";
        System.out.println(s1 == s9); //~ false

        /*
            字符串方法：int length()
            返回当前字符串长度，无论中英文，每个字符一个长度
         */
        System.out.println("length: " + s1.length()); //~ 6

        /*
            int indexOf(String str)
            返回给定字符串在当前字符串中的位置
            若当前字符串不包含给定字符串则返回-1
         */
        //查找a的位置
        int index = s1.indexOf("a");
        System.out.println(index); //~ 3
        //从指定位置开始查找
        index = s1.indexOf("a",2);
        System.out.println(index); //~ 3
        //查找最后一次出现的位置
        index = s1.lastIndexOf("a");
        System.out.println(index); //~ 3

        /*
            String subString(int start,int end)
            截取字符串
            传入的两个参数分别为要截取边界的下标
            在java api中，通常使用两个数字表示范围时，都是
            含头不含尾的，即，包含起始下标对应内容，但不包含
            结束下标处对应的内容。
         */
        //截取指定内容
        String subStr = s1.substring(3,5);
        System.out.println(subStr); //~ ab

        subStr = s1.substring(3);
        System.out.println(subStr); //~ abc

        int start = s1.indexOf("3") + 1;
        int end = s1.indexOf("c",start);
        subStr = s1.substring(start,end);
        System.out.println(subStr); //~ ab

        /*
            String trim()
            去除一个字符串两边的空白字符
         */
        String str = "   hello      ";
        System.out.println(str);
        String trim = str.trim();
        System.out.println(trim); //~ hello

        /*
            char charAt(int index)
            返回当前字符串中指定位置的字符
         */
        String str1 = "thinking in java";
        char c = str1.charAt(9);
        System.out.println("c: " + c); //~ i

        /*
            boolean startsWith(String str)
            boolean endsWith(String str)
            判断当前字符串是否是以给定的字符串开始或结束的
         */
        boolean starts = str1.startsWith("thi");
        System.out.println("starts: " + starts); //~ true
        boolean ends = str1.endsWith("va");
        System.out.println("ends: " + ends); //~ true

        /*
            String toUpperCase()
            String toLowerCase()
            将当前字符串中的英文部分转换为全大写或全小写
         */
        String str2 = "HelloWorld";
        String upper = str2.toUpperCase();
        System.out.println(upper); //~ HELLOWORLD
        String lower = str2.toLowerCase();
        System.out.println(lower); //~ helloworld

        /*
            static String valueOf(...)
            String提供了若干的静态重载方法valueOf，可以将
            java中的其他类型转换为字符串类型。
            常用于将基本类型转换为字符串类型
         */
        int a = 123;
        String astr = String.valueOf(a);
        System.out.println(astr + 4); //~ 1234
        double d = 123.123;
        String dstr = String.valueOf(d);
        System.out.println(dstr + 4); //~ 123.1234

        //频繁修改字符串将带来很大的性能损耗
    }
}
````

#### StringBuilder
````java
package basic_java;

/**
 * StringBuilder是为了解决字符串频繁修改内容所导致的
 * 资源消耗问题。
 * StringBuilder内部是一个可变的字符数组，所以所有的
 * 字符串内容修改都是在这一个对象内完成的，而不会因为
 * 每次的内容修改创建新对象。
 * StringBuilder提供了编辑字符串操作的相关方法，
 * 包括：增、删、改、插入
 */
public class StringBuilderDemo {
    public static void main(String[] args) {
        String str = "好好学习java";
        StringBuilder stringBuilder = new StringBuilder(str);
        /*
            StringBuilder apped(String str)
            在当前字符串某位追加指定内容

            好好学习java，努力成为一个java大师！
         */
        stringBuilder.append("，成为一个java大师！");
        str = stringBuilder.toString();
        System.out.println(str); //~ 好好学习java，成为一个java大师！

        /*
            StringBuilder replace(int start,int end,String str)

            好好学习java，努力成为一个java大师
         */
        stringBuilder.replace(9,19,"成为一个架构师");
        System.out.println(stringBuilder.toString()); //~ 好好学习java，成为一个架构师！

        /*
            StringBuilder delete(int start,int end)
            将当前字符串中指定范围内的内容删除
         */
        stringBuilder.delete(0,8);
        System.out.println(stringBuilder.toString()); //~ ，成为一个架构师！

        /*
            StringBuilder insert(int i,String str)
            将给定字符串插入到指定位置处
         */
        stringBuilder.insert(0,"活着");
        System.out.println(stringBuilder.toString()); //~ 活着，成为一个架构师！

        //反转字符串
        stringBuilder.reverse();
        System.out.println(stringBuilder.toString()); //~ ！师构架个一为成，着活

    }
}

````