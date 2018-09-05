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
#### String (part1)
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
#### String (part2)
````java
package basic_java;

/**
 * String的其他内容演示
 */
public class StringDemo2 {
    public static void main(String[] args) {
        /*
            字符串支持正则表达式的相关方法之一：
            boolean matches(String regex)
            根据给定的正则表达式验证当前字符串是否满足格式要求，
            满足则返回true。
            需要注意，该方法是全匹配验证，
            即：无论正则表达式是否添加边界匹配都做全匹配验证
         */
        /*
            email的正则表达式：
            [a-zA-Z0-9_]+@[a-zA-Z0-9_]+(\.[a-zA-Z]+)+
         */
        String mail = "fancq@tedu.cn";
        String regex = "[a-zA-Z0-9_]+@[a-zA-Z0-9_]+(\\.[a-zA-Z]+)+";
        System.out.println(regex);
        boolean match = mail.matches(regex);
        if(match){
            System.out.println("是邮箱"); //~ 是邮箱
        } else {
            System.out.println("不是邮箱");
        }

        /*
            String[] split(String regex)
            将当前字符串按照满足正则表达式的部分进行拆分
            然后将所有拆分后的部分返回。
         */
        String str = "abc123def456ghi789jkl";
        //按照数字部分拆分字符串
        String[] data = str.split("[0-9]+");
        System.out.println("len: " + data.length); //~ 4
        for(int i = 0; i < data.length; i++){
            System.out.println(data[i]); //~ abc,def,ghi,jkl
        }

        /*
            String replaceAll(String regex,String str)
            将当前字符串中满足正则表达式的部分替换为给定的字符串内容
         */
        str = str.replaceAll("[a-z]+","#CHAR#");
        System.out.println(str); //~ #CHAR#123#CHAR#456#CHAR#789#CHAR#
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

## 3、包装类

### 简要说明

1. 包装类
    * 由于基本类型没有面向对象特性，所以不能直接参与面向对象开发，为了解决这个问题，java为8个基本类型提供了包装类，包装类可以以对象的形式表示一个基本类型的值。
    * 其中六个数字类型的包装类继承自Number，Number定义了数字类型包装类应具有的共同行为：  
        允许将其表示的基本类型数据在不同的数字类型直接互相转换。
    
### 练习
````java
package basic_java;

/**
 * 包装类
 * 由于基本类型没有面向对象特性，所以不能直接参与
 * 面向对象开发，为了解决这个问题，java为8个基本类型提供了
 * 包装类，包装类可以以对象的形式表示一个基本类型的值。
 * 其中六个数字类型的包装类继承自Number
 * Number定义了数字类型包装类应该具有的共同行为：
 * 允许将其表示的基本类型数据在不同的数字类型之间
 * 互相转换
 */
public class IntegerDemo {
    public static void main(String[] args) {
        //int --> Integer 基本类型 -> 引用类型
        /*
            所有包装支持静态方法valueOf，可以将对应的基本类型转换为包装类
            推荐使用这种方式，而不是直接new
         */
        Integer in1 = Integer.valueOf(128);
        Integer in2 = Integer.valueOf(128);

        System.out.println(in1 == in2); //~ false
        System.out.println(in1.equals(in2)); //~ true

        //引用类型转换为基本类型
        int i = in1.intValue();
        double d = in1.doubleValue();
        System.out.println(d); //~ 128.0
        byte b = in1.byteValue();
        System.out.println(b); //~ -128

        /*
            数字类型包装类提供了两个常量，可以查看
            其表示的基本类型的取值
         */
        int imax = Integer.MAX_VALUE;
        System.out.println("imax: " + imax); //~ imax: 2147483647
        int imin = Integer.MIN_VALUE;
        System.out.println("imin: " + imin); //~ imin: -2147483648

        long lmax = Long.MAX_VALUE;
        System.out.println("lmax: " + lmax); //~ lmax: 9223372036854775807

        /*
            所有的包装类都提供了一个静态方法:parseXXX()
            该方法可以将给定的字符串转换为对应的基本类型
            数字，但是前提是该字符串的内容必须能正确描述
            该类型可以保存的数据，否则会抛出异常
         */
        String str = "123";
        int inte = Integer.parseInt(str);
        double db = Double.parseDouble(str);
        System.out.println(inte + 1);
        System.out.println(db);

        /*
            JDK在1.5时推出了一个新的特性：自动拆装箱
            即：基本类型和引用类型之间可以直接互相赋值，
            无需再关注之间的转换，而编译器再编译程序时
            会自动补充代码，完成它们之间的转换工作。
            所以自动拆装箱是编译器认可，而不是虚拟机认可的
         */

        /*
            自动拆箱
            编译器会补充代码为：
            int i3 = new Integer(123).intValue()
         */
        int i3 = new Integer(123);
        /*
            自动装箱
            编译器会补充代码为
            Integer i4 = Integer.valueOf(123);
         */
        Integer i4 = 123;
    }
}
````

## 4、日历类

### 简要说明
1. Date
    * 该类的每一个实例用于表示一个具体的时间点，内部维护一个long值，该值位1970年元旦到该Date表示时间之间所经过的毫秒数。
    * Date 因为设计存在缺陷，所以大部分方法被修饰为过时的，不再建议使用。所以，现在仅用其表示一个时间。

2. Calendar
    * 通常使用该类对时间进行操作
    * 提供了获取各个时间分量的方法
    * 可以设置指定时间

3. SimpleDateFormat
    * 该类可以根据一个指定的日期格式将Date与String进行转换

### 练习
#### Date
````java
package basic_java;

import java.util.Date;

/**
 * Date类的每个实例用于表示一个具体的时间点
 * 内部维护一个long值，该值为1970年元旦到该Date
 * 表示的时间之间所经过的毫秒。
 * Date因为设计存在缺陷，所以大部分方法被修饰为过时的，不再建议使用。
 * 所以，现在仅用其表示一个时间
 */
public class DateDemo {
    public static void main(String[] args) {
        //表示当前系统时间
        Date date = new Date();
        /*
            Date 重写了toString方法
            但是显示的日期格式对非英语地区十分友好
         */
        System.out.println(date); //~ Mon Sep 03 13:35:52 CST 2018
        //获取Date内部维护的毫秒值
        long time = date.getTime();
        System.out.println(time); //~ 1535952952044
        time += 1000 * 60 * 60 * 24;

        date.setTime(time);
        System.out.println(date); //~ Tue Sep 04 13:35:52 CST 2018
    }
}
````

#### Calendar
````java
package basic_java;

import sun.awt.geom.AreaOp;

import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.CancellationException;

/**
 * Calendar
 * 日历类
 * 通常使用该类对时间进行操作
 */
public class CalendarDemo {
    public static void main(String[] args) {
        /*
            默认创建出来的Calendar的实现类表示当前时间
         */
        Calendar calendar = Calendar.getInstance();
        /*
            toString重写了，但是不能直观反映其表示的时间
         */
        System.out.println(calendar);
        //~ java.util.GregorianCalendar[time=1535952781831,areFieldsSet=true,
        //      areAllFieldsSet=true,lenient=true,zone=sun.util.calendar.ZoneInfo[id="Asia/Shanghai",
        //      offset=28800000,dstSavings=0,useDaylight=false,transitions=19,lastRule=null],firstDayOfWeek=1,minimalDaysInFirstWeek=1,ERA=1,YEAR=2018,MONTH=8,WEEK_OF_YEAR=36,WEEK_OF_MONTH=2,DAY_OF_MONTH=3,DAY_OF_YEAR=246,DAY_OF_WEEK=2,DAY_OF_WEEK_IN_MONTH=1,AM_PM=1,HOUR=1,HOUR_OF_DAY=13,MINUTE=33,SECOND=1,MILLISECOND=831,ZONE_OFFSET=28800000,DST_OFFSET=0]
        /*
            Calendar -> Date
            Calendar提供了方法：
            Date getTime()
            该方法会返回一个Date实例，该实例表示的时间
            就是当前Calendar所表示的时间
         */
        Date date = calendar.getTime();
        System.out.println(date); //~ Mon Sep 03 13:33:01 CST 2018

        /*
            Date -> Calendar
            Calendar 提供了方法：
            void setTime(Date date)
            该方法可以使当前Calendar表示给定的
            Date所表示的时间。
         */
        calendar.setTime(date);

        /*
            Calendar提供了获取各个时间分量的值的方法
         */
        //获取年
        int year = calendar.get(Calendar.YEAR);
        System.out.println("year: " + year); //~ year: 2018
        //获取月？月从0开始。即0表示1月
        int month = calendar.get(Calendar.MONTH) + 1;
        System.out.println("month: " + month); //~ month: 9
        //获取日
        /*
            和天相关的时间分量：
            DATE,DAY_OF_MONTH是一致的，表示月中的天
            DAY_OF_YEAR是表示年中的天
            DAY_OF_WEEK是表示周中的天
         */
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        System.out.println(year + "-" + month + "-" + day); //~ 2018-9-3
        int days = calendar.get(Calendar.DAY_OF_MONTH);
        System.out.println("今天是今年的第：" +days+"天"); //~ 今天是今年的第：3天
        /*
            一周的第一天是周日
         */
        int dow = calendar.get(Calendar.DAY_OF_WEEK) - 1;
        String[] data = {"日","一","二","三","四","五","六"};
        System.out.println("周" + data[dow]); //~ 周一
        /*
         *  HOUR,HOUR_OF_DAY
         */
        int h = calendar.get(Calendar.HOUR_OF_DAY);
        int m = calendar.get(Calendar.MINUTE);
        int s = calendar.get(Calendar.SECOND);
        System.out.println(h+":"+m+":"+s); //~ 13:48:43

        /*
            设置时间分量
            表示2008-08-08 20:08:08
         */
        //设置年
        calendar.set(Calendar.YEAR,2008);
        //设置月
        calendar.set(Calendar.MONTH,Calendar.AUGUST);
        //设置日
        calendar.set(Calendar.DAY_OF_MONTH,8);
        calendar.set(Calendar.HOUR_OF_DAY,20);
        calendar.set(Calendar.MINUTE,8);
        calendar.set(Calendar.SECOND,8);
        //超出某个时间分量允许最大值时，会自动进位
        calendar.set(Calendar.DAY_OF_MONTH,32);
        System.out.println(calendar.getTime()); //~ Mon Sep 01 20:08:08 CST 2008

        /*
            获取某一个时间分量所允许的最大值
         */
        //查看当月共有多少天
        int mdays = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
        System.out.println(mdays); //~ 30
        mdays = calendar.getActualMinimum(Calendar.DAY_OF_YEAR);
        System.out.println(mdays); //~ 1

        /*
            查看3年1个月零2天以后那周的周一是哪天

            void add(int field,int value)
            对指定的时间分量累加指定的值，若value是负数，则减去
         */
        calendar.add(Calendar.YEAR,3);
        calendar.add(Calendar.MONTH,1);
        calendar.add(Calendar.DAY_OF_YEAR,2);
        calendar.add(Calendar.DAY_OF_WEEK,2);
        System.out.println(calendar.getTime()); //~ Wed Oct 05 20:08:08 CST 2011

        /*
            要求用户输入一个日期，并对该日期进行一系列的计算后，将计算后的日期再
            以指定的个数输出给用户

            String --> SimpleDateFormat --> Date
            Date --> Calendar
            使用Calendar进行相应的计算
            Calendar --> Date
            Date --> SimpleDateFormat --> String
         */

    }
}
````
#### SimpleDateFormat
````java
package basic_java;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * SimpleDateFormat类可以根据一个指定的日期格式将Date与String
 * 之间进行相互转换
 */
public class SimpleDateFormatDemo {
    public static void main(String[] args) throws ParseException {
        /*
            Date -> String
         */
        Date now = new Date();
        System.out.println(now); //~ Mon Sep 03 16:56:16 CST 2018
        /*
            2016-08-24 09:55:23
            yyyy-MM-dd HH:mm:ss
         */
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        /*
            String format(Date date)
            将给定的Date所表示的时间按照当前SDF
            指定的日期格式转换为字符串
         */
        String str = sdf.format(now);
        System.out.println(str); //~ 2018-09-03 16:56:16

        str = "2008-08-08 20:08:08";
        /*
            Date parse(String str)
            将给定的字符串按照SDF指定的日期格式字符串
            解析为Date
         */
        Date date = sdf.parse(str);
        System.out.println(date); //~ Fri Aug 08 20:08:08 CST 2008
    }
}
````


## 5、集合

### 简要说明
1. Collection
    * 集合的操作 - 
    * 遍历集合元素 -
    * 泛型在集合中的应用 - 
    * 与数组间的转换
    * 
2. List - 可重复集，有序，特点是可以通过下标操作元素
    * ArrayList - 数组实现，查询性能更好
    * LinkedList - 链表实现，增删性能更好，尤其首尾增删
3. Map - 查找表，以key-value对的形式存储数据
    * key不允许重复
    * 一个key对应一个value
    * 常用的Map实现类：HashMap，使用散列算法实现
    * 遍历Map：
        * 遍历所有的key
        * 遍历所有的键值对
        * 遍历所有的value -- 相对来说不常用

### 练习
#### Collection
````java
package basic_java;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.Objects;

/**
 * 集合-Collection
 * 该接口是所有集合的父接口，规定了集合应当具有的
 * 相关方法。
 * 其派生了两个子接口：
 * List：可重复集，有序集，可以根据下标操作元素
 * Set：不可重复集，重复元素的判断标准是依靠元素自身equals比较的结果
 */
public class CollectionDemo {
    public static void main(String[] args) {
        Collection collection = new ArrayList();
        /*
            boolean add(E e)
            向当前集合中添加元素
         */
        ((ArrayList) collection).add("one");
        ((ArrayList) collection).add("two");
        ((ArrayList) collection).add("three");
        ((ArrayList) collection).add("four");
        ((ArrayList) collection).add("five");
        System.out.println(collection); //~ [one, two, three, four, five]

        /*
            int size()
            返回当前集合的元素个数
         */
        System.out.println("size: " + collection.size()); //~ size: 5
        /*
            boolean isEmpty()
            判断当前集合是否不含有任何元素
         */
        System.out.println("isEmpty：" + collection.isEmpty()); //~ isEmpty：false
        /*
            void clear()
            清空集合
         */
        collection.clear();
        System.out.println("集合已清空！"); //~ 集合已清空！
        System.out.println(collection); //~ []
        System.out.println("size:" + collection.size()); //~ size:0
        System.out.println("isEmpty:" + collection.isEmpty()); //~ isEmpty:true

        /*
            判断集合是否包含指定元素
            boolean contains(E e)
            判断当前集合是否包含给定的元素
            是否包含给定元素是依靠该元素雨集合现有元素
            有没有equals比较为true的，有的话则
            认为包含该元素
         */
        Collection collection1 = new ArrayList();
        ((ArrayList) collection1).add(new Point(1,2));
        ((ArrayList) collection1).add(new Point(3,4));
        ((ArrayList) collection1).add(new Point(5,6));
        System.out.println(collection1); //~ [(1,2), (3,4), (5,6)]

        Point p = new Point(1,2);
        if(collection1.contains(p)){ //通过给定元素的equals方法来判断
            System.out.println("包含"); //~ 包含
        } else {
            System.out.println("不包含");
        }
        System.out.println(collection1); //~ [(1,2), (3,4), (5,6)]

        /*
            集合只能保存引用类型元素并且保存的是元素的引用
         */
        Collection collection2 = new ArrayList();
        Point p1 = new Point(1,2);
        //存入集合
        ((ArrayList) collection2).add(p1);
        System.out.println(p1); //~ (1,2)
        System.out.println(collection2); //~ [(1,2)]

        p1.setX(2);
        System.out.println(p1); //~ (2,2)
        System.out.println(collection2); //~ [(2,2)]

        /*
            从集合删除元素
         */
        ((ArrayList) collection1).add(new Point(7,8));
        System.out.println(collection1); //~ [(1,2), (3,4), (5,6), (7,8)]
        /*
            boolean remove(E e)
            将给定对象从集合中删除
            只会删除集合中的一个元素，删除的是与
            给定元素第一个equals比较为true的元素
         */
        Point p2 = new Point(1,2);
        ((ArrayList) collection1).remove(p2);
        System.out.println(collection1); //~ [(3,4), (5,6), (7,8)]
        /*
            集合操作
         */
        Collection collection3 = new ArrayList();
        ((ArrayList) collection3).add("java");
        ((ArrayList) collection3).add(".net");
        ((ArrayList) collection3).add("android");
        ((ArrayList) collection3).add("c");
        System.out.println(collection3); //~ [java, .net, android, c]

        Collection collection4 = new ArrayList();
        ((ArrayList) collection4).add("c");
        ((ArrayList) collection4).add("c++");
        ((ArrayList) collection4).add("oc"); //objective-c
        System.out.println(collection4); //~ [c, c++, oc]

        /*
            boolean addAll(Collection c)
            将给定集合中的所有元素添加到当前集合中
            当执行完毕后，当前集合元素数量发生了改变，
            则返回true
         */
        collection4.addAll(collection3);
        System.out.println(collection4); //~ [c, c++, oc, java, .net, android, c]

        Collection collection5 = new ArrayList();
        ((ArrayList) collection5).add("java");
        ((ArrayList) collection5).add("c");
        ((ArrayList) collection5).add("php");

        /*
            boolean containsAll(Collection c)
            判断当前集合是否包含给定集合中的所有元素
         */
        boolean containsFlag = collection4.containsAll(collection5);
        System.out.println(containsFlag); //~ false

        /*
            boolean removeAll(Collection c)
            删除当前集合中与给定集合共有的元素
         */
        collection4.removeAll(collection5);
        System.out.println(collection4); //~ [c++, oc, .net, android]

        /*
            遍历集合元素
            Collection提供了方法：
            Iterator iterator()
            该方法会返回一个可以遍历当前集合的迭代器实例

            java.util.Iterator
            是迭代器接口，规定了遍历集合的方法，不同的集合
            实现类都实现了可以遍历自身的迭代器实现类。我们
            无需记忆每一个具体实现类，只要当作是Iterator看
            待并可以遍历该集合即可

            迭代器遍历集合遵循：
            问、取、删
            其中删除不是必须操作
         */
        Collection collection6 = new ArrayList();
        ((ArrayList) collection6).add("one");
        ((ArrayList) collection6).add("#");
        ((ArrayList) collection6).add("two");
        ((ArrayList) collection6).add("#");
        ((ArrayList) collection6).add("three");
        ((ArrayList) collection6).add("#");
        ((ArrayList) collection6).add("four");
        ((ArrayList) collection6).add("#");
        ((ArrayList) collection6).add("five");

        Iterator iterator = collection6.iterator();
        /*
            boolean hasNext()
            判断当前集合是否还有元素可以取出
         */
        while (iterator.hasNext()){
            /*
                E next()
                判断当前集合是否还有元素可以取出
             */
            String str = (String) iterator.next();
            if("#".equals(str)){
                /*
                    在使用迭代器遍历集合的过程中
                    是不能通过集合的方法删除元素的，
                    否则会抛出异常
                 */
//                ((ArrayList) collection6).remove(str);
                /*
                    通过迭代器的remove可以从集合中删除通过next
                    遍历出来的元素
                 */
                iterator.remove();

            }
            System.out.println(str);
            /*~
                one
                #
                two
                #
                three
                #
                four
                #
                five
             */
        }
        System.out.println(collection6);//~ [one, two, three, four, five]
        /*
            泛型在集合中的应用
            泛型在集合中被用来规定集合元素类型
         */
        Collection<String> collection7 = new ArrayList<>();
        //泛型要求只能存入字符串元素
        ((ArrayList<String>) collection7).add("one");
        ((ArrayList<String>) collection7).add("two");
        ((ArrayList<String>) collection7).add("three");
        ((ArrayList<String>) collection7).add("four");

        /*
            迭代器的泛型与其遍历的集合泛型一致即可
         */
        Iterator<String> iterator1 = collection7.iterator();
        while(iterator1.hasNext()){
            String str = iterator1.next();
            System.out.println(str);
            /*
                one
                two
                three
                four
             */
        }
        for(String str : collection7){
            System.out.println(str);
            /*
                one
                two
                three
                four
             */
        }

        /*
            集合转换为数组
            Collection提供了将集合转换为数组的方法:toArray()
         */
        String[] array = collection7.toArray(new String[collection7.size()]);
        System.out.println("len:" + array.length); //~ len:4
        for(String str : array){
            System.out.println(str);
            /*
                one
                two
                three
                four
             */
        }

    }
}

class Point {
    private int x;
    private int y;

    public Point(){

    }

    public Point(int x,int y){
        super();
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    @Override
    public String toString() {
        return "("  + x + "," + y + ")";
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        if (this == o) return true;
        if(o instanceof Point){
            Point point = (Point) o;
            return x == point.x &&
                    y == point.y;
        }
        return false;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }
}
````

#### List
````java
package basic_java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * java.util.list
 * List集合是可重复集，并且有序
 * 特点是可以通过下标操作元素
 * 常用实现类
 * ArrayList：数组实现，查询性能更好
 * LinkedList：链表实现，增删性能更好，尤其首尾增删
 */
public class ListDemo {
    public static void main(String[] args) {
        /*
            java.util.ArrayList
            java.util.LinkedList
         */
        List<String> list = new ArrayList<>();
        list.add("one");
        list.add("two");
        list.add("three");
        list.add("four");
        list.add("five");

        /*
            E get(int index)
            获取指定位置的元素
         */
        //获取第三个元素
        String str = list.get(2);
        System.out.println(str); //~ three

        /*
            E set(int index,E e)
            将给定元素设置到指定位置，返回值为
            原位置对应的元素
         */
        //[one,two,three,four,five]
        System.out.println(list); //~ [one, two, three, four, five]
        //[one,2,three,four,five]
        String old = list.set(1,"2");
        System.out.println(list); //~ [one, 2, three, four, five]
        System.out.println(old); //~ two

        /*
            List提供了一对重载的add，remove方法
         */
        /*
            void add(int index,E e)
            在当前集合指定位置插入指定元素
         */
        //[one,2,2,three,four,five]
        list.add(1,"2");
        System.out.println(list); //~ [one, 2, 2, three, four, five]
        /*
            E remove(int index)
            删除指定位置上的元素，返回值为被删除的元素
         */
        //[one,2,three,four,five]
        old = list.remove(2);
        System.out.println(list); //~ [one, 2, three, four, five]
        System.out.println(old); //~ 2

        /*
        对List取子集
         */
        /*
            List subList(int start,int end)
            截取指定范围内的元素
         */
        //取3-4
        List<String> subList = list.subList(3,4);
        /*
            对子集元素的修改就是对原集合相应元素的修改！
         */
        subList.set(0,"4");
        System.out.println(list); //~ [one, 2, three, 4, five]
        /*
            删除list中3的元素
         */
        list.subList(3,4).clear();
        System.out.println(list); //~ [one, 2, three, five]

        /*
            数组转换为集合
            需要注意，转换时依靠数组的工具类Arrays的方法
            该方法仅能将数组转换为List集合
         */
        String[] array = {"one","two","three","four","five"};
        List<String> strList = Arrays.asList(array);
        System.out.println(strList); //~ [one, two, three, four, five]
        /*
            对转换后的集合元素修改，就是对原数组
            相应元素的修改！
         */
        strList.set(1,"2");
        System.out.println(list); //~ [one, 2, three, five]

        for(String s : array){
            System.out.println(s);
            /*
                one
                2
                three
                four
                five
             */
        }

        /*
            从数组转换过来的集合，是不能添加元素的
            也不能删除元素，因为这会导致数组扩容或缩容，
            这就无法表示原来的数组
         */
        /*
            若想添加新元素，需要额外创建一个集合
         */
        List<String> list1 = new ArrayList<>(list);
        list1.add("six");
        System.out.println(list1);//~ [one, 2, three, five, six]

        /*
            对集合的排序
            Collections是集合的工具类，提供了而很多操作集合的方法。
            其中静态方法sort用来对List集合进行自然排序，即：从小到大
         */
        Collections.sort(list);
        System.out.println(list); //~ [2, five, one, three],按照ASCII码进行排序
    }
}
````

####  Map
````java
package basic_java;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * java.util.Map
 * 查找表，以key-value对的形式存储数据
 * 在Map中key是不允许重复的（equals比较）
 * 常用的Map实现类：HashMap，使用散列算法实现
 */
public class MapDemo {
    public static void main(String[] args) {
        Map<String,Integer> map = new HashMap<>();
        /*
            V put(K k,V v)
            将给定的key-value存入到Map中
            因为Map不允许有重复的key，所以若给定的
            key已经存在，这是替换value操作，返回值
            为被替换的value，若不是重复的key，返回值
            为null
         */
        map.put("语文",99);
        map.put("数学",98);
        map.put("英语",97);
        map.put("物理",96);
        Integer num = map.put("化学",99);
        System.out.println(num); //~ null
        System.out.println(map); //~ {物理=96, 数学=98, 化学=99, 语文=99, 英语=97}

        num = map.put("语文",80);
        System.out.println("old:" + num); //~ old:99
        System.out.println(map); //~ {物理=96, 数学=98, 化学=99, 语文=80, 英语=97}

        /*
            V get(K k)
            根据给定的key获取对应的value，若给定
            的key在Map中不存在，则返回值为null
         */
        num = map.get("物理");
        System.out.println("物理:" + num); //~ 物理:96
        num = map.get("体育");
        System.out.println("体育:" + num); //~ 体育:null

        /*
            遍历Map 遍历Map有三种方式：
            1. 遍历所有的key
            2. 遍历所有的键值对
            3. 遍历所有的value（相对不常用）
         */
        /*
            Set<K> keySet()
            将当前Map中的所有key存入一个Set集合
            后将其返回。那么遍历这个Set集合就等同于
            遍历了所有的key
         */
        Set<String> keySet = map.keySet();
        for(String key : keySet){
            System.out.println("key:" + key);
        }
        /*~
            key:物理
            key:数学
            key:化学
            key:语文
            key:英语
         */

        /*
            遍历每一组键值对
            在Map中每一组键值对是用一个Map的内部类
            Entry的实例保存，Entry提供了两个方法getKey，
            getValue来分别获取其表示的这组键值对的key和value

             Set<Entry> entrySet()
             该方法会将当前Map中每组键值对（若干的Entry实例）
             存入到一个Set集合，并将其返回。
         */
        Set<Map.Entry<String,Integer>> entrySet = map.entrySet();
        for(Map.Entry<String,Integer> e : entrySet){
            String key = e.getKey();
            Integer value = e.getValue();
            System.out.println(key + ":" + value);
        }

        /*~
            物理:96
            数学:98
            化学:99
            语文:80
            英语:97
         */

        /*
            Collection values()
            将当前Map中所有的value存入到一个集合中
            并将其返回
         */

        Collection<Integer> values = map.values();
        for(Integer value : values){
            System.out.println("value:" + value);
        }
        /*
            value:96
            value:98
            value:99
            value:80
            value:97
         */

        /*
            查看Map是否包含给定内容
         */
        /*
            是否包含指定的key
            boolean containsKey(Object k)
            判断当前Map是否包含给定的key
         */
        boolean containsFlag = map.containsKey("化学");
        System.out.println("是否包含该key：" + containsFlag); //~ 是否包含该key：true

        /*
            boolean containsValue(Object v)
            判断是否包含给定的value
         */
        containsFlag = map.containsValue(70);
        System.out.println("是否包含该value：" + containsFlag); //~ 是否包含该value：false
    }
}
````
##  6、文件处理

### 简要说明

1. File用于描述文件系统中的一个文件或目录
    * 访问文件或目录的属性信息
    * 访问一个目录中的所有子项
    * 操作文件或目录（创建、删除）
    * 不可以访问文件数据
2. RandomAccessFile用于读写文件数据。其基于指针对文件进行读写。
    * 创建RandomAccessFile有两种常用模式：
        * “r”，即只读模式，仅对文件数据进行读取操作
        * “rw”，即读写模式，对文件数据可以编辑。

### 练习
#### File
````java
package basic_java;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * java.io.File
 * 该类用于描述文件系统中的一个文件或目录
 * File可以：
 *  1：访问文件或目录的属性信息
 *  2：访问一个目录中的所有子项
 *  3：操作文件或目录（创建、删除）
 *  File不可以：
 *     File不可以访问文件数据
 */
public class FileDemo {
    public static void main(String[] args) throws IOException {
        /*
            路径尽量不写绝对路径
            常用的是使用相对路径：
             1.相对于项目目录（当前目录）
             2.相对于类加载目录（实际开发更常用）
         */
        File file = new File("." + File.separator + "test.txt");
        /*
            获取当前文件的属性信息
         */
        //获取文件或目录名
        String name = file.getName();
        System.out.println("name:" + name); //~ name:test.txt
        //获取文件长度（字节）
        long length = file.length();
        System.out.println("length:" + length + "字节"); //~ length:0字节
        //最后修改时间
        long time = file.lastModified();
        System.out.println("最后修改时间:" + time); //~ 最后修改时间:0
        Date date = new Date(time);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年M月d日，H:m:s");
        System.out.println("最后修改时间:" + sdf.format(date)); //~ 最后修改时间:1970年1月1日，8:0:0
        /*
            可读、可写、可运行
         */
        file.canRead();
        file.canExecute();
        boolean canWrite = file.canWrite();
        System.out.println("只读:" + !canWrite); //~ 只读:true
        file.isHidden();

        /*
            使用File创建文件
            在当前目录下创建demo.txt文件
            不写"./"默认就是在当前目录下
         */
        File demo = new File("demo.txt");
        /*
            判断File表示的文件或目录是否真实存在
         */
        if(!file.exists()){
            file.createNewFile();
            System.out.println("创建完毕");
        } else {
            System.out.println("该文件已存在!");
        }

        /*
            删除文件
         */
        if(file.exists()){
            file.delete();
            System.out.println("已删除!");
        } else {
            System.out.println("该文件不存在!");
        }
        /*
            创建一个目录
            在当前目录下创建目录demo
         */
        File dir = new File("demo");
        if(!dir.exists()){
            dir.mkdir();
            System.out.println("创建完毕!");
        } else {
            System.out.println("该目录已经存在!");
        }
        /*
            创建多级目录

            在当前目录下创建a/b/c/d/e/f目录
         */
        dir = new File(
        "a" + File.separator +
                "b" + File.separator +
                "c" + File.separator +
                "d" + File.separator +
                "e" + File.separator +
                "f"
        );
        if(!dir.exists()){
            /*
                该方法会将所有不存在的父级目录一同
                创建出来
             */
            dir.mkdir();
            System.out.println("创建完毕!");
        } else {
            System.out.println("该目录已经存在!");
        }
        /*
            删除目录
         */
        dir = new File("demo");
        if(dir.exists()){
            /*
                删除目录要求该目录必须是一个空目录
             */
            dir.delete();
            System.out.println("删除完毕!");
        }
        /*
            获取一个目录中的所有子项
         */
        File curDir = new File(".");
        /*
            boolean isFile()
            判断当前File对象表示的是否为一个吻技安

            boolean isDirectory()
            判断是否表示的是一个目录
         */
        if(curDir.isDirectory()){
            /*
                File[] listFiles()
                查看当前File表示的目录中的所有子项
                每个子项以一个File对象表示。所有子项
                存入一个File对象数组返回。
             */
            File[] subs = curDir.listFiles();
            for(File sub : subs){
                if(sub.isFile()){
                    System.out.println("文件:");
                } else {
                    System.out.println("目录:");
                }
                System.out.println(sub.getName());
                /*
                    目录:
                    .idea
                    文件:
                    my-project.iml
                    目录:
                    out
                    目录:
                    src
                 */
            }
        }

        /*
            获取一个目录中的部分子项
            File支持一个重载的listFile方法，要求传入
            一个文件过滤器，这样只会返回该目录中满足该
            过滤器要求的子项。
            仅获取当前目录中的所有文件
         */
        MyFilter myFilter = new MyFilter();
        File[] subs = curDir.listFiles(myFilter);
        /*
            正在过滤:.idea
            正在过滤:my-project.iml
            正在过滤:out
            正在过滤:src
         */
        for(File sub : subs) {
            System.out.println(sub.getName()); //~ my-project.iml
        }
    }
}

class MyFilter implements FileFilter {
    @Override
    public boolean accept(File file) {
        System.out.println("正在过滤:" + file.getName());
        return file.isFile();
    }
}
````

#### RandomAccessFile

````java
package basic_java;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;

/**
 * java.io.RandomAccessFile
 * 用于读写文件数据。其基于指针对文件进行读写。
 * 创建RandomAccessFile有两种常用模式：
 *  1：“r”，即只读模式，仅对文件数据进行读取操作
 *  2：“rw”，即读写模式，对文件数据可以编辑
 */
public class RandomAccessFileDemo {
    public static void main(String[] args) throws IOException {
        /*
            RandomAccessFile(File f,String mode)
            RandomAccessFile(String path,String mode)

            其中mode是操作模式：“r”、“rw”
         */
        RandomAccessFile raf = new RandomAccessFile("raf.dat","rw");

        /*
            void write(int d)
            写出1个字节，写出的是该整数对应的2进制
            中的“低八位”

            00000000 00000000 00000000 00000001
         */
        raf.write(97); //01100001
        raf.write(98); //01100010
        raf.write(99); //01100011

        /*
            raf.dat 中文件数据有3个字节了，内容
            为：
            01100001 01100010 01100011
         */
        System.out.println("写出完毕!");
        /*
            读写完毕后关闭raf
         */
        raf.close();

        /*
            读取字节
         */
        RandomAccessFile raf_r = new RandomAccessFile("raf.dat","r");
        /*
            int read()
            从文件中指针当前位置读取该字节，并以
            10进制的数字形式返回。
            若返回值为-1.则表示读取到了文件末尾

            00000000 00000000 00000000 11111111
         */
        int d = raf_r.read();
        System.out.println(d); //~ 97

        d = raf_r.read();
        System.out.println(d); //~ 98

        d = raf_r.read();
        System.out.println(d); //~ 99

        d = raf_r.read();
        System.out.println(d); //~ -1
        raf_r.close();

    }
}
````

#### 文件复制

````java
package basic_java;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;

/**
 * 复制文件
 */
public class CopyDemo {
    public static void main(String[] args) throws IOException {
        RandomAccessFile src = new RandomAccessFile("G:"+ File.separator+"CopyDemo.java","r");
        RandomAccessFile desc = new RandomAccessFile("G:"+ File.separator+"CopyDemo_cp.java","rw");
        int d = -1;
        while((d = src.read()) != -1){
            desc.write(d);
        }
        src.close();
        desc.close();

        /*
            若希望提供读写效率，需要提高每次读写的数据量
            来减少读写次数从而达到提高读写效率的目的
         */
        /*
            int read(byte[] d)
            一次性读取给定的数组总长度的字节量，
            并存入到该数组中，返回值为实际读取到
            的字节量，若返回值为-1.则表示读到了文件
            末尾
         */
        src = new RandomAccessFile("G:"+ File.separator+"CopyDemo.java","r");
        desc = new RandomAccessFile("G:"+ File.separator+"CopyDemo_cp.java","rw");
        int len = -1; // 记录每次读到的实际字节量
        byte[] buf = new byte[1024*10]; //10k
        while((len = src.read(buf)) != -1){
            /*
                void write(byte[] d)
                将给定的字节数组中的所有字节一次性
                写入到文件中

                void write(byte[] d,int offset,int len)
                将给定的字节数组中从下标为offset处的字节开始的
                连续len个字节一次性写入到文件中
             */
            desc.write(buf,0,len);
        }
        src.close();
        desc.close();
    }
}

````