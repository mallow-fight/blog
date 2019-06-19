---
title: JDBC
order: 9
type: java
---


## 1、JDBC

### 简要说明
1. 是java数据库连接
    * JDBC是一套标准的接口，规定了连接数据库的步骤与操作数据库的功能。不同的数据库提供商都提供了一套JDBC的实现类以操作该数据库，这一套实现类称为该数据库的驱动包。
2. JDBC的主要接口：
    * DriverManager：负责加载驱动，建立与数据库的连接
    * Connection：表示与数据库的一个连接，负责创建Statement
    * Statement: 负责向数据库执行SQL语句
    * ResultSet：表示数据库的一个查询结果集
3. Statement只适合执行静态SQL语句，因为执行动态SQL语句有两个缺点L:
    * 由于有动态信息，那么就需要先拼接SQL，这就可能出现SQL注入攻击的问题。
    * 大部分情况下，拼接SQL时，语义已经定好，拼接的内容无非就是一些数据，那么当大批量执行这样含有动态值的SQL时，数据库每当接受到Statement发送的SQL语句时，只要语句中的内容有区别，就会当作一条全新的SQL语句去执行。数据库执行SQL时会首先解析SQL语句并生成一个执行计划（开销大），那么批量执行这样内容有些微变化的SQL时会为每一个SQL生成一个执行计划，对数据库是负担。
4.PreparedStatement
    * 该接口是Statement的子接口。设计目的是为了执行动态SQL语句。这样的SQL称为预编译SQL，这种SQL语句会将动态信息以“？”代替，先进行占位。然后将该SQL发送给数据库生成执行计划。然后当需要执行该SQL时，只需要将？需要的实际数据再次传递给数据库即可。
        * 由于先将SQL语句发送给书库，并生成了执行计划，就不存在拼接SQL导致改变SQL语义的问题了。
        * 由于执行计划已经生成，当大批量执行SQL时，每次只需要将？表示的实际值传入，那么数据库会重用执行计划，这就减少了服务器的压力。
        
### 练习 PART1
````java 
package basic_java;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

/**
 * JDBC:java数据库连接
 * JDBC是一套标准的接口，规定了连接数据库的步骤与操作数据库的功能。
 * 不同的数据库提供商都提供了一套JDBC的实现类以操作该数据库，这一套
 * 实现类称为该数据库的驱动包。
 * JDBC中的主要接口：
 * DriverManager：负责加载驱动，建立与数据库的连接
 * Connection：表示与数据库的一个连接，负责创建Statement
 * Statement：负责向数据库执行SQL语句
 * ResultSet：表示数据库的一个查询结果集
 */
public class JDBCDemo {
    public static void main(String[] args) {
        try{
            /*
                1.加载驱动，不同的数据库字符串的内容不一样。
             */
            Class.forName("oracle.jdbc.driver.OracleDriver");
            /*
                2.使用DriverManager通过加载的驱动与数据库
                建立连接
                DriverManager的静态方法getConnection用于
                与数据库建立连接，需要传入三个参数
                参数1：数据库的地址（不同数据库格式不一样）
                参数2：数据库的用户名
                参数3：数据库的密码
             */
            Connection conn = DriverManager.getConnection("url","username","password");
            /*
                3.创建Statement以发送SQL语句
             */
            Statement state = conn.createStatement();
            /*
                针对不同的SQL语句，Statement也提供了
                相应的执行方法：
                1.int executeUpdate(String sql)
                    专门用来执行DML语句的方法，返回值
                    为一个数字，表示执行DML操作后影响了
                    表中的记录数

                2.ResultSet executeQuery(String sql)
                    专门用来执行DQL语句的方法，返回值为
                    一个ResultSet实例，表示DQL执行后的
                    查询结果集

                3.boolean execute(Strign sql)
                    可以执行所有类型的SQL语句，由于DML，
                    DQL有专门的方法，所以通常使用execute
                    方法来执行DDL语句。返回值为boolean值，
                    当该值为true时，说明执行SQL后有查询结果集
             */
//            。。。
            //没有其他数据库操作则关闭数据库连接
            conn.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
````

### PART2
````java
package basic_java;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Properties;


import org.apache.commons.dbcp.BasicDataSource;
/**
 * 批量执行
 */
public class JDBCDemo2 {
    public static void main(String[] args) {
        /*
            当有大批量数据需要插入到数据库某张表时，
            影响插入性能的主要因素：
                1.事务，一条DML执行一次事务效率是很差的
                    可以考虑多条记录使用同一事务
                2.PreparedStatement的使用可以减少执行计划的
                生成
                3.减少网络使用，客户端一次发送一条SQL语句与一次
                发送多朵SQL语句到数据库服务端的效率也是不一样的。
             批量执行就是减少了网络调用。大批量SQL执行时，应当
             考虑使用批量执行操作。
         */
        Connection conn = null;
        try{
            conn = DBUtil.getConnection();
            /*
                在一个事务中插入1000条可以减少数据库
                对象的实际写操作次数，提高效率
             */
            //取消事务自动提交
            conn.setAutoCommit(false);
            String sql = "INSERT INTO userinfo " +
                    "(id,username,password,email,nickname,account) " +
                    "VALUES" +
                    "(?,?,'123456',?,?,5000)";
            /*
                使用PS可以使这1000条SQL使用同一个执行计划
                从而提高SQL执行效率
             */
            PreparedStatement ps = conn.prepareStatement(sql);
            long start = System.currentTimeMillis();
            for(int i = 20000; i < 30000; i++){
                ps.setInt(1,i);
                ps.setString(2,"test" + i);
                ps.setString(3,"test" + i + "@qq.com");
                ps.setString(4,"nick" + i);
                /*
                    执行executeUpdate方法，会将？对应的一组数据
                    发送给数据库服务端
                    那么调用10000次该方法就会发送10000次
                    提高了网络调用次数会降低网络传输效率
                 */
//                ps.executeUpdate();
                //添加到本地缓存中（添加到批中）
                ps.addBatch();
            }
            //执行批操作（将缓存的内容一次性发给数据库执行）
            int[] d = ps.executeBatch();
            conn.commit();
            long end = System.currentTimeMillis();
            System.out.println("插入完毕，耗时：" + (end - start) + "ms");
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            if(conn != null){
                DBUtil.closeConnection(conn);
            }
        }
    }
}

class DBUtil {
    //数据库连接池
    private static BasicDataSource ds;

    static{
        //初始化静态属性
        //1加载配置文件
        /*
         * java.util.Properties
         * 用来读取.properties文件，并解析其中
         * 每一行内容，然后以key-value的形式保存
         * 在当前实例中。
         */
        Properties prop = new Properties();
        try {
            prop.load(new FileInputStream("config.properties"));
            String className = prop.getProperty("classname");
            String url = prop.getProperty("url");
            String username = prop.getProperty("username");
            String password = prop.getProperty("password");
            int maxActive = Integer.parseInt(prop.getProperty("maxactive"));
            int maxWait = Integer.parseInt(prop.getProperty("maxwait"));
            //初始化连接池
            ds = new BasicDataSource();
            //将JDBC建立连接所需要的信息设置到连接池中

            //Class.forName(...)
            ds.setDriverClassName(className);

            //DriverManager.getConnection(...)
            ds.setUrl(url);
            ds.setUsername(username);
            ds.setPassword(password);

            //设置连接池最大连接数
            ds.setMaxActive(maxActive);
            //设置最大等待时间
            ds.setMaxWait(maxWait);


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        //2根据配置文件初始化

    }
    /**
     * 获取数据库连接
     * @return
     */
    public static Connection getConnection()
            throws Exception{
        /*
         * 连接池提供的方法:
         * Connection getConnection()
         * 该方法可以返回一个连接池中可用连接。
         * 这是一个阻塞方法，当连接池中有空闲连接
         * 可以使用时会立刻返回，若当前连接池没有
         * 可用连接时，会进入阻塞，阻塞时间由创建
         * 连接池时通过setMaxWait设置的时间为准
         * 在等待期间若有空闲连接着立即返回，当
         * 超过最大等待时间仍没有可用连接时，该方
         * 法会抛出超时异常。
         */
        return ds.getConnection();
    }
    /**
     * 关闭给定的连接
     * @param conn
     */
    public static void closeConnection(Connection conn){
        try {
            /*
             * 若该连接是通过连接池获取的，那么调用
             * 这个连接的close方法并不是与数据库断开
             * 连接了，而仅仅是将该连接还给连接池。
             */
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
````