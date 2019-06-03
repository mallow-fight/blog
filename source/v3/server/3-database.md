---
title: 数据库
order: 3
type: v3/server
---

> [在线练习网站](http://sqlzoo.net/wiki/SELECT_basics)
> [w3schools](https://www.w3schools.com/sql/default.asp)

## 定义
**最流行的关系型数据库（建立在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据）管理系统，在web应用方面mysql是最好的RDBMS应用软件之一**

## 什么是数据库
- **按照数据结构来组织、存储和管理数据的仓库**
- **每个数据库都有一个或多个不同的API用于创建、访问、管理、搜索和复制所保存的数据**
- **可以将数据存储在文件中，但是在文件中读写速度比较慢**
- **RDBMS（Relational Database Management System）特点：**
  - 数据以表格的形式从出现
  - 每行 为 各种记录名称
  - 每列为记录名称所对应的数据域
  - 许多行和列组成一张表单
  - 若干的表单组成database

## RDBMS术语
- 数据库：一些关联表的集合
- 数据表：表是数据的矩阵
- 列：包含了相同类型的数据
- 行：一组相关的数据
- 冗余：存储两倍数据，降低了性能，但提高了数据的安全性
- 主键：唯一，一个表中只能包含一个，可以用来查询数据
- 外健：用于关联两个表
- 复合健：将多个列作为一个索引健，一般用于复合索引
- 索引：可快速访问表中的特定信息，是对数据库表中一列或者多列值进行排序的一种结构，类似于书籍的目录
- 参照完整性：要求关系中不允许引用不存在的实体，与实体完整性是关系模型必须满足的完整性约束条件，目的是保证数据的一致性

## 创建数据库
```sql
CREATE DATABASE 数据库名;
```

## 删除数据库
```sql
DROP DATABASE 数据库名;
```

## 选择数据库
```sql
USE 数据库名;
```

## 数据类型
**大致分为三类：数值、日期/时间和字符串**

### 数值类型
类型 | 大小 | 范围（有符号） | 范围（无符号） | 用途
--- | --- | --- | --- | ---
TINYINT | 1字节 | (-128, 127) | (0, 255) | 小整数值
SMALLINT | 2字节 | (-32 768, 32 767) | (0, 65 535) | 大整数值
MEDIUMINT | 3字节 | (-8 388 608, 8 388 607) | (0, 16 777 215) | 大整数值
INT/INTEGER | 4字节 | (-2 147 483 648, 2 147 483 647) | (0, 4 294 967 295) | 大整数值
BIGINT | 8字节 | (-9 233 372 036 854 775 808, 9223 372 036 854 775 807) | (0, 18 446 744 073 709 551 615) | 极大整数值
FLOAT | 4字节 | (-3.402 823 466 E+38, -1.175 494 351 E-38, 3.402 823 466 E+38) | 0, (1.175 494 351 E-38，3.402 823 466 E+38) | 单精度浮点数值
DOUBLE | 8字节 | (-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 双精度浮点数值
DECIMAL | 对DECIMAL(M,D) ，如果M>D，为M+2否则为D+2 | 依赖于M和D的值 | 小数值

### 日期和时间类型
表示时间值的日期和时间类型为 `DATETIME`、`DATE`、`TIMESTAMP`、`TIME` 和 `YEAR`。
每个时间类型有一个有效值范围和一个"零"值，当指定不合法的`MySQL`不能表示的值时使用"零"值。
`TIMESTAMP`类型有专有的自动更新特性，将在后面描述。

类型 | 大小（字节） | 范围 | 格式 | 用途
--- | --- | --- | --- | ---
DATE | 3 | 1000-01-01/9999-12-31 | YYYY-MM-DD | 日期值
TIME | 3 | '-838:59:59'/'838:59:59' | HH:MM:SS | 时间值或持续时间
YEAR | 1 | 1901/2155 | YYYY | 年份值
DATETIME | 8 | 1000-01-01 00:00:00/9999-12-31 23:59:59 | YYYY-MM-DD HH:MM:SS | 混合日期和时间值
TIMESTAMP | 4 | 1970-01-01 00:00:00/2038 结束时间是第 2147483647 秒，北京时间 2038-1-19 11:14:07，格林尼治时间 2038年1月19日 凌晨 03:14:07 | YYYYMMDD HHMMSS | 混合日期和时间值，时间戳

### 字符串类型
字符串类型指CHAR、VARCHAR、BINARY、VARBINARY、BLOB、TEXT、ENUM和SET。

类型 | 大小 | 用途
--- | --- | ---
CHAR | 0-255字节 | 定长字符串
VARCHAR | 0-65535字节 | 变长字符串
TINYBLOB | 0-255字节 | 不超过255个字符的二进制字符串
TINYTEXT | 0-255字节 | 短文本字符串
BLOB | 0-65 535字节 | 二进制形式的长文本数据
TEXT | 0-65 535字节 | 长文本数据
MEDIUMBLOB | 0-16 777 215字节 | 二进制形式的中等长度文本数据
MEDIUMTEXT | 0-16 777 215字节 | 中等长度文本数据
LONGBLOB | 0-4 294 967 295字节 | 二进制形式的极大文本数据
LONGTEXT | 0-4 294 967 295字节 | 极大文本数据

## 创建数据表
- 表名
- 表字段名
- 定义每个表字段

**语法：**
```sql
CREATE TABLE table_name (column_name column_type);
```

**例子：**
```sql
CREATE TABLE IF NOT EXISTS `runoob_tbl`(
  `runoob_id` INT UNSIGNED AUTO_INCREMENT,
  `runoob_title` VARCHAR(100) NOT NULL,
  `runoob_author` VARCHAR(40) NOT NULL,
  `submission_date` DATE,
  PRIMARY KEY ( `runoob_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

## 插入数据
```sql
INSERT INTO table_name ( field1, field2, ...fieldN ) VALUES ( value1, value2, ...valueN);
```

## 查询数据
```sql
SELECT column_name, column_name FROM table_name [WHERE Clause] [LIMIT N][OFFSET M];
```

## WHERE子句
```sql
SELECT field1, field2, ...fieldN FROM table_name1, table_name2... [WHERE condition1] [AND [OR]] condition2......
```

## UPDATE查询
```sql
UPDATE table_name SET field1=new-value1, field2=new-value2 [WHERE Clause]
```

## DELETE语句
```sql
DELETE FROM table_name [WHERE Clause]
```

## LIKE子句
使用百分号`%`字符来表示任意字符，类似于`UNIX`或正则表达式中的星号`*`
如果没有使用百分号`%`，`LIKE`子句与等号`=`的效果是一样的

```sql
SELECT field1, field2, ...fieldN FROM table_name WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue'
```

## UNION操作符
```sql
SELECT expression1, expression2, ...expression_n FROM tables [WHERE conditions] UNION [ALL | DISTINCT]
SELECT expression1, expression2, ...expression_n FROM tables [WHERE conditions];
```

## 排序
```sql
SELECT field1, field2, ...fieldN table_name1, table_name2... ORDER BY field1, [field2...] [ASC [DESC]]
```

## GROUP BY
```sql
SELECT column_name, function(column_name) FROM table_name WHERE column_name operator value GROUP BY column_name;
```
使用`WITH ROLLUP`可以实现在分组统计数据基础上再进行相同的统计(SUM, AVG, COUNT...)。

## 连接
- INNER JOIN(内连接，或等值连接)：获取两个表中字段匹配关系的记录
- LEFT JOIN(左连接)：获取左表所有记录，即使右表没有对应匹配的记录
- RIGHT JOIN(右连接)：与LEFT JOIN相反，用于获取右表所有记录，即使左表没有对应匹配记录

## NULL值处理
- IS NULL：当列的值是NULL，此运算符返回true
- IS NOT NULL：当列的值不为NULL，运算符返回true
- <=>：比较操作符（不同于=运算符），当比较的两个值为NULL时返回true

## 正则表达式
[参考资料](http://www.runoob.com/mysql/mysql-regexp.html)
**实例：**
```sql
SELECT name FROM person_tbl WHERE name REGEXP '^st';
```

## mysql事务
主要用于处理操作量大，复杂度高的数据。
- 在MySQL中只有使用了Innodb数据库引擎的数据库或表才支持事务
- 事务处理可以用来维护数据库的完整性，保证成批的sql语句要么全部执行，要么全部不执行
- 事务用来管理insert、update、delete语句

满足四个条件（ACID）：
- 原子性：一个事务中的所有操作，要么全部完成，要么全部不完成，不会结束在中间的某个环节。如果执行过程中发生错误，会被回滚到事务开始前的状态，就像这个事务从来没有执行过一样
- 一致性：在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作
- 隔离性：数据库允许多个并发事务同时对其数据进行读写和修改能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交、读提交、可重复读和串行化
- 持久性：事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失

方法：
**用 BEGIN, ROLLBACK, COMMIT来实现**
  - BEGIN 开始一个事务
  - ROLLBACK 事务回滚
  - COMMIT 事务确认
**直接用SET来改变MySQL的自动提交模式**
  - SET AUTOCOMMIT=0 禁止自动提交
  - SET AUTOCOMMIT=0 开启自动提交

## ALTER命令
**删除，添加或修改表字段**
```sql
ALTER TABLE testalter_tbl DROP i;
```

**修改字段类型及名称**
```sql
ALTER TABLE testalter_tbl MODIFY c CHAR(10);
```

**修改字段默认值**
```sql
ALTER TABLE testalter_tbl ALTER i SET DEFAULT 1000;
```

**修改表名**
```sql
ALTER TABLE testalter_tbl RENAME TO alter_tbl;
```

## MySQL索引
索引的建立对于MySQL的高效运行是很重要的，索引可以大大提高MySQL的检索速度
索引分单列索引和组合索引。单列索引，即一个索引只包含单个列，一个表可以有多个单列索引，但这不是组合索引。组合索引，即一个索引包含多个列。
创建索引时，你需要确保该索引是应用在	SQL 查询语句的条件(一般作为 WHERE 子句的条件)。
实际上，索引也是一张表，该表保存了主键与索引字段，并指向实体表的记录。
上面都在说使用索引的好处，但过多的使用索引将会造成滥用。因此索引也会有它的缺点：虽然索引大大提高了查询速度，同时却会降低更新表的速度，如对表进行INSERT、UPDATE和DELETE。因为更新表时，MySQL不仅要保存数据，还要保存一下索引文件。
建立索引会占用磁盘空间的索引文件。
[参考资料](http://www.runoob.com/mysql/mysql-index.html)

## MySQL临时表
MySQL 临时表在我们需要保存一些临时数据时是非常有用的。临时表只在当前连接可见，当关闭连接时，Mysql会自动删除表并释放所有空间。
临时表在MySQL 3.23版本中添加，如果你的MySQL版本低于 3.23版本就无法使用MySQL的临时表。不过现在一般很少有再使用这么低版本的MySQL数据库服务了。
MySQL临时表只在当前连接可见，如果你使用PHP脚本来创建MySQL临时表，那每当PHP脚本执行完成后，该临时表也会自动销毁。
如果你使用了其他MySQL客户端程序连接MySQL数据库服务器来创建临时表，那么只有在关闭客户端程序时才会销毁临时表，当然你也可以手动销毁。
[参考资料](http://www.runoob.com/mysql/mysql-temporary-tables.html)

## MySQL复制表
[参考资料](http://www.runoob.com/mysql/mysql-clone-tables.html)

## MySQL元数据
- 查询结果信息：SELECT，UPDATE或DELETE语句影响的记录数
- 数据库和数据表的信息：包含了数据库及数据表的结构信息
- MySQL服务器信息：包含了数据库服务器的当前状态，版本号等

## MySQL序列使用
[参考资料](http://www.runoob.com/mysql/mysql-using-sequences.html)

## MySQL处理重复数据
[参考资料](http://www.runoob.com/mysql/mysql-handling-duplicates.html)

## MySQL及SQL注入
[参考资料](http://www.runoob.com/mysql/mysql-sql-injection.html)

## MySQL导出数据
[参考资料](http://www.runoob.com/mysql/mysql-database-export.html)

## MySQL 导入数据
[参考资料](http://www.runoob.com/mysql/mysql-database-import.html)

## mysql实例

```sql
-- 使用一条INSERT语句来插入多条记录
INSERT INTO users(name, age) VALUES('p1', 25),('p2',50),('p3',60);

-- 查询重复记录
select * from jindashi group by name having count(*)>1; 

-- 插入数据
INSERT INTO tabel1 (name,pwd,did,role,phone,nickname) SELECT name,pwd,did,role,phone,nickname FROM tabel2
-- (如果字段有默认值，不能插入)

-- 更新数据
UPDATE `user` SET `change` = '0'  where `change`='1'

-- 替换数据
replace into test_tbl (id,dr) values (1,'2'),(2,'3'),...(x,'y');
insert into test_tbl (id,dr) values  (1,'2'),(2,'3'),...(x,'y') on duplicate key update dr=values(dr);

-- replace into  和insert into on duplicate key update的不同在于：
-- replace into　操作本质是对重复的记录先delete 后insert，如果更新的字段不全会将缺失的字段置为缺省值
-- insert into 则是只update重复记录，不会改变其它字段。

-- 出现验证错误
UPDATE Time SET overTime=${overTime+o},restedTime=${restedTime+r},lastRestTime=${lastRestTime+l} WHERE uid=${uid} AND department=${department};
-- 原因：未加上department=${department};导致的约束条件不严格
```


## 一些重要的sql命令
- SELECT：从数据库中提取数据
- UPDATE：在数据库中更新数据
- DELETE：从数据库中删除数据
- INSERT INTO：插入新的数据到数据库
- CREATE DATABASE：创建一个新的数据库
- ALTER DATABASE：修改数据库
- CREATE TABLE：创建新表
- ALTER TABLE：修改表
- DROP TABLE：删除一个表
- CREATE INDEX：创建索引（搜索键）
- DROP INDEX：删除索引

## 示例表字段
- Customers
  - CustomerID
  - CustomerName
  - ContactName
  - Address
  - City
  - PostalCode
  - Country

## select(查询)

### 所有数据
```sql
select * from Customers;
```

### 部分数据
```sql
select CustomerName, Address from Customers;
```

### 唯一数据

> 如果选择了两个distinct字段，则以这两个字段为distinct id，这两个字段结合起来不相等就行了。

```sql
select distinct CustomerName from Customers;
```

### 数据个数
- 全部数据
```sql
select count(CustomerName) from Customers;
```
- 唯一数据
```sql
select count(distinct CustomerName) from Customers;
```
- 将唯一数据个数保存为字段
```sql
select Count(*) as DistinctCountries from (select distinct Country from Customers);
```

### 条件查询
- 查询条件是字符串
```sql
select * from Customers where Country='Mexico';
```
- 查询条件是数字
```sql
select * from Customers where CustomerID=1;
```
- 查询操作符
操作符 | 描述
--- | ---
`=` | 相等
`<>` | 不相等，某些版本的SQL可能写作`!=`
`>` | 大于
`<` | 小于
`>=` | 大于等于
`<=` | 小于等于
`between and` | 再某个范围内，闭区间
`like` | 模糊查询
`in` | 指定某些可能的列集合
`and` | 同时满足几个条件，可使用多个`and`联合查询
`or` | 满足某个条件，可使用多个`or`联合查询
`not` | 筛选出不满足某些条件的集合
- 例子
```sql
select * from Customers where CustomerID=2;
select * from Customers where CustomerID<>1;
select * from Customers where CustomerID>1;
select * from Customers where CustomerID<2;
select * from Customers where CustomerID>=3;
select * from Customers where CustomerID<=3;
select * from Customers where CustomerID between 1 and 3;
select * from Customers where CustomerName like 'An%'; -- %代表任意值
select * from Customers where CustomerID in (1, 2, 3);
select * from Customers where CustomerID=1 and ContactName='Maria Anders' and City='Berlin';
select * from Customers where CustomerID=1 or CustomerID=2 or CustomerID=3;
select * from Customers where not CustomerID=1 and not CustomerID=2; -- 筛选出不包含id为1和2的数据
select * from Customers where not CustomerID=1 and not ContactName='Maria Anders'; -- 筛选出不同时满足条件的记录
select * from Customers where Country='Germany' and (City='Berlin' OR City='München'); -- 多种操作符结合筛选
```

## 数据排序
- ASC: ascend 升序排列
- DESC: descend 降序排列
```sql
select * from Customers order by City;
select * from Customers order by City, Country;
select * from Customers order by City asc;
select * from Customers order by City desc;
select * from Customers order by City asc, Country desc;
```

## 插入数据
```sql
insert into Customers (CustomerName, ContactName, Address, City, PostalCode, Country) values ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');
```

## 空值
当某个字段是可选的时候，如果插入数据的时候没有插入该字段，该字段就会保存一个空值

### 如何测试空值
```sql
select City from Customers where City is null;
select City from Customers where City is not null;
```

## 更新数据
```sql
update Customers set ContactName='Alfred Schmidt', City='Frankfurt'
where CustomerID=1;
update Customers set ContactName='Mallow'; -- it will update all ContactName
```

## 删除数据
```sql
delete from Customers where ContactName='Mallow';
delete from table_name; -- delete all records;
delete * from table_name; -- delete all records;
```

## 取固定量数据
### sql sever / MS Access Syntax:
```sql
select top number|percent column_name(s)
from table_name
where condition;
```

### mysql Syntax:
```sql
select column_name(s)
from table_name
where condition
limit number;
```

### oracle Syntax:
```sql
select column_name(s)
from table_name
where ronum <= number;
```

### example
```sql
select top 3 * from Customers; -- sql server
select * from Customers limit 3; -- mysql
select * from Customers where Country='Germany' and rownum <= 3;
```

## 最大/小值
```sql
select min(price) from Products;
select min(price) as smallestPrice from Products;
select max(price) as largestPrice from Products;
```

## 计数
```sql
select count(column_name) from table_name where condition;
```

## 平均值
```sql
select avg(column_name) from table_name where condition;
```

## 求和
```sql
select sum(column_name) from table_name where condition;
```

## like操作符
```sql
select column1, column2 from table_name where column2 like pattern;
select column1, column2 from table_name where column2 not like pattern;
```

pattern | description
--- | ---
'a%' | 从a开始
'%a' | 以a结束
'%or%' | 包含or
'_r%' | 第二个字符是r
'a_%_%' | 以a开始且最少三个字符长度
'a%o' | 从a开始，以o结束
'[bsp]%' | 从b、s、p其中一个开始
'[a-z]%' | 从a～z开始
'[!bsp]' | 不从b、s、p其中一个开始

## in操作符
```sql
select * from Customers where Country in ('Germany', 'France', 'UK');
select * from Customers where Country not in ('Germany', 'France', 'UK');
select * from Customers where Country in (select Country from supplies);
```

## between
```sql
select * from Customers where CustomerID between 1 and 10;
select * from Customers where CustomerID not between 10 and 20;
select * from Customers where (CustomerID between 5 and 15) and not CustomerID in (10, 11, 12);
select * from Products
where ProductName between 'Carnarvon Tigers' and 'Mozzarella di Giovanni'
order by ProductName;
select * from Products
where ProductName not between 'Carnarvon Tigers' and 'Mozzarella di Giovanni'
order by ProductName;
select * from Orders
where OrderDate between #07/04/1996# and #07/09/1996#; -- select date.
```

## as
```sql
select CustomerID as ID, CustomerName as Customer from Customers;
select CustomerID as ID, CustomerName as [customer name] from Customers; -- 带空格的字段名
select CustomerID, Address + ', ' + PostalCode + ' ' + City + ', ' + Country as Address from Customers;
select CustomerName, concat(Address,', ',PostalCode,', ',City,', ',Country) as Address from Customers; -- in mysql
select o.OrderID, o.OrderDate, c.CustomerName
from Customers as c, Orders as o
where c.CustomerName='Around the Horn' and c.CustomerID=o.CustomerID; -- 给表名来个简写
select Orders.OrderID, Orders.OrderDate, Customers.CustomerName
from Customers, Orders
where Customers.CustomerName="Around the Horn" and Customers.CustomerID=Orders.CustomerID; -- 未简写的表名
```

## joins
```sql
select Orders.OrderID, Customers.CustomerName, Orders.OrderDate from Orders inner join Customers on Orders.CustomerID=Customers.CustomerID;
select o.orderID, c.CustomerName, o.OrderDate from Orders as o inner join Customers as c on o.CustomerID=c.CustomerID; -- 使用别名
```

### 区别

- 也就是说，innerjoin是左右两张表都有的，结果中没有空值
- leftjoin一定会返回左表中的所有值，如果记录匹配不到右表，右表中的相应字段出现空值
- rightjoin一定会返回右表中的所有值，如果记录匹配不到左表，左边中的相应字段出现空值

![img_innerjoin](../../images/img_innerjoin.gif)
---
![img_leftjoin](../../images/img_leftjoin.gif)
---
![img_rightjoin](../../images/img_rightjoin.gif)
---
![img_fulljoin](../../images/img_fulljoin.gif)

### innerjoin
```sql
select Orders.OrderID, Customers.CustomerName from Orders inner join Customers on Orders.CustomerID = Customers.CustomerID;
select o.OrderID, c.CustomerName, s.shipperName from ((Orders as o inner join Customers as c on o.CustomerID = c.CustomerID) inner join Shippers as s on o.ShipperID = s.ShipperID); -- 使用别名，三表innerjoin
```

### leftjoin
```sql
select c.CustomerName, o.OrderID from Customers as c left join Orders as o on c.CustomerID=o.CustomerID order by c.CustomerName;
```

### rightjoin
```sql
select o.OrderID, e.LastName, e.FirstName from Orders as o right join Employees as e on o.EmployeeID=e.EmployeeID order by o.OrderID;
```

### full outer join
```sql
select c.CustomerName, o.OrderID from Customers as c full outer join Orders as o on c.CustomerID=o.CustomerID order by c.CustomerName;
```

### self join
```sql
select a.CustomerName as c1, b.CustomerName as c2, a.City from Customers a, Customers b where a.CustomerID<>b.CustomerID and a.City=b.City order by a.City;
```

## union

### 规则
- 每个选择声明必须有相同数量的列
- 每列必须要有类似的数据结构
- 查询的每列顺序必须相同

### union(去重)
```sql
select City from Customers
union -- 占据一整行，看着更清晰
select City from Suppliers
order by City;
```

### union all（不去重）
```sql
select City from Customers
union all
select City from Suppliers
order by City;
```

### 结合where
```sql
select City, Country from Customers
where Country='Germany'
union -- 去重
select City, Country from Suppliers
where Country='Germany'
order by City;

select City, Country from Customers
where Country='Germany'
union all -- 不去重
select City, Country from Suppliers
where Country='Germany'
order by City;

select 'Customer' as Type, ContactName, City, Country from Customers
union -- 多了一行type，下面的Supplier只是占位
select 'Supplier', ContactName, City, Country from Suppliers;
```

## group by

```sql
select count(CustomerID), Country from Customers group by Country;
select count(CustomerID), Country from Customers group by Country order by count(CustomerID) desc;
select s.ShipperName, count(o.OrderID) as NumberOfOrders from Orders as o left join Shippers as s on o.ShipperID=s.ShipperID group by ShipperName;
```

## having
对比于where，having和函数对象一起用

```sql
select count(CustomerID), Country from Customers group by Country having count(CustomerID)>5;

select count(CustomerID), Country from Customers group by Country having count(CustomerID)>5 order by count(CustomerID) desc;

select e.lastName, count(o.OrderID) as NumberOfOrders from (Orders as o inner join Employees as e on o.EmployeeID=e.EmployeeID) group by LastName having count(o.OrderID)>10;

select e.lastName, count(o.OrderID) as NumberofOrders from Orders as o inner join Employees as e on o.EmployeeID=e.EmployeeID where lastName='Davolio' or LastName='Fuller' group by LastName having count(o.OrderID)>25;
```

## exists
check if records is exists.

```sql
select SupplierName from Suppliers as s where exists (select ProductName from Products where SupplierId=s.supplierId and Price<20);

select SupplierName from Suppliers as s where exists (select ProductName from Products as p where SupplierId=s.supplierId and Price=22);
```

## any&all
any：某条记录满足条件
all：所有记录满足条件
```sql
select ProductName from Products where ProductID=any(select ProductID from OrderDetails where Quantity=10);

select ProductName from Products where ProductID=any(select ProductID from OrderDetails where Quantity>99);

select ProductName from Products where ProductID=all(select ProductID from OrderDetails where Quantity=10);
```

## select into
copy data from one table into a new table.

```sql
select * into CustomersBackup2017 from Customers;

select * into CustomersBackup2017 in 'Backup.mdb' from Customers;

select * into CustomersBackup2017 in 'Backup.mdb' from Customers;

select CustomerName, ContactName into CustomersBackup2017 from Customers;

select * into CustomersGermany from Customers where Country='Germany';

select c.CustomerName, o.OrderID into CustomersOrderBackup2017 from Customers as c left join Orders as o on c.CustomerID=o.CustomerID;

select * into newtable from oldtable where 1=0;
```

## insert into
```sql
insert into Customers (CustomerName, City, Country) select SupplierName, City, Country from Suppliers;

insert into Customers (CustomerName, ContactName, Address, City, PostalCode, Country) select SupplierName, ContactName, Address, City, PostalCode, Country from Suppliers;

insert into Customers (CustomerName, City, Country) select SupplierName, City, Country from Suppliers where Country='Germany';
```

## null functions
```sql
select ProductName, UnitPrice * (UnitsInStock + ifnull(UnitsOnOrder, 0)) from Products; -- mysql

select ProductName, UnitPrice * (UnitsInStock + coalesce(UnitsOnOrder, 0)) from Products; -- mysql

select ProductName, UnitPrice * (UnitsInStock + isnull(UnitsOnOrder, 0)) from Products; -- sql server

select ProductName, UnitPrice * (UnitsInStock + iif(isnull(UnitsOnOrder), 0, UnitsOnOrder)) from Products; -- ms access

select ProductName, UnitPrice * (UnitsInStock + nvl(UnitsOnOrder, 0)) from Products; -- oracle
```

## stored procedure
```sql
create procedure SelectAllCustomers as select * from Customers
go;
exec SelectAllCustomers;

create procedure SelectAllCustomers @City nvachar(30) as select * from Customers where City=@City
go;
exec SelectAllCustomers City = "London";

create procedure SelectAllCustomers @City nvarcahr(30), @PostalCode nvarchar(10)
as
select * from Customers where City=@City and PostalCode=@PostalCode
go;
exec SelectAllCustomers City='London', PostalCode='WALLDP';
```

## comments
```sql
-- Select all:
select * from Customers;

-- where City='Berlin':
select * from Customers;

-- select * from Customers:
select * from Products;

/* Select all the columns of all the records in the Customers table: */
select * from Customers;

/* select * from Customers;
select * from Products;
select * from Orders;
select * from Categories; */
select * from Suppliers;

select CustomerName, /* City, */
Country from Customers;

select * from Customers where (CustomerName like 'L%' or CustomerName like 'R%' /* or CustomerName like 'S%' or CustomerName like 'T%' */ or CustomerName like 'W%') and Country='USA' order by CustomerName;

```

## create database
```sql
create database testDB;
```

## drop
```sql
drop database testDB;
```

## truncate
```sql
truncate table table_name;
```

## create table
```sql
create table Persons (
  PersonID int,
  LastName varchar(255),
  FirstName varchar(255),
  Address varchar(255),
  City varchar(255)
);
```

## alter table

- alter add命令用来增加表的字段。

- alter add命令格式：alter table 表名 add字段 类型 其他;

- 例如，在表MyClass中添加了一个字段passtest，类型为int(4)，默认值为0：
  - mysql> alter table MyClass add passtest int(4) default '0';

1) 加索引
   mysql> alter table 表名 add index 索引名 (字段名1[，字段名2 …]);

例子： mysql> alter table employee add index emp_name (name);

2) 加主关键字的索引
    mysql> alter table 表名 add primary key (字段名);

例子： mysql> alter table employee add primary key(id);

3) 加唯一限制条件的索引
   mysql> alter table 表名 add unique 索引名 (字段名);

例子： mysql> alter table employee add unique emp_name2(cardnumber);

4) 删除某个索引
   mysql> alter table 表名 drop index 索引名;

例子： mysql>alter table employee drop index emp_name;

5) 增加字段
    mysql> ALTER TABLE table_name ADD field_name field_type;

6) 修改原字段名称及类型
    mysql> ALTER TABLE table_name CHANGE old_field_name new_field_name field_type;

7) 删除字段
    MySQL ALTER TABLE table_name DROP field_name;

```sql
alter table table_name alter column column_name datatype; -- sql server / ma access

alter table table_name modify column column_name datatype; -- my sql / oracle

alter table table_name modify column_name datatype; -- oracle 10g and later

alter table Presons alter column DateOfBirth year;

alter table Persons drop column DateOfBirth;
```

## sql constraints(约束)

```sql
create table table_name (
  column1 datatype constraint,
  column2 datatype constraint,
  column3 datatype constraint
)
```

type:
- not null: 不能为空
- unique: 唯一值，不能和其它值相同
- primary key: 即不为空又是唯一的，一般用作id，一般是自增的id
- foreign key: 另一个表的唯一标示
- check: 确保某一列的所有值满足一个特定的条件
- default: 当没有设置值的时候设置一个默认值
- index: 使用索引加快数据检索速度

```sql
-- not null constraint
create table Persons (
  ID int not null,
  LastName varchar(255) not null,
  FirstName varchar(255) not null,
  Age int
)
```

```sql
-- unique constraint

-- sql server/oracle/ma access
create table Persons (
  ID int not null unique,
  LastName varchar(255) not null,
  Firstname varchar(255),
  Age int
);

-- mysql
create table Persons (
  ID int not null,
  LastName varchar(255) not null,
  FirstName varchar(255),
  Age int,
  unique (ID)
);

-- mysql/ sql server / oracle / ms access:
create table Persons (
  ID int not null,
  LastName varchar(255) not null,
  FirstName varchar(255),
  Age int,
  constraint UC_Person unique (ID, LastName)
)

alter table Persons add unique (ID);

alter table Persons add constraint UC_Person unique (ID, LastName);

-- mysql
alter table Persons drop unique UC_Person;

-- sql server / oracle / ms access:
alter table Persons drop constraint UC_Person;

-- mysql
create table Persons (
  ID int not null,
  LastName varchar(255) not null,
  FirstName varchar(255),
  Age int,
  primary key (ID)
);

-- sql sever / oracle / ms access:
create table Persons (
  ID int not null primary key,
  LastName varchar(255) not null,
  FirstName varchar(255),
  Age int
)

-- mysql / sql server/ oracle / ms access:
create table Persons (
  ID int not null,
  Lastname varchar(255) not null,
  FirstName varchar(255),
  Age int,
  constraint PK_Preson primary key (ID, LastName)
);

alter table Persons add primary key (ID);

alter table Persons add constraint PK_Person primary key (ID, LastName);

-- mysql
alter table Persons drop primary key;

-- sql server / oracle / ms access:
alter table Persons drop constraint PK_Person;

-- mysql
create table Orders (
  OrderID int not null,
  OrderNumber int not null,
  PersonID int,
  primary key (OrderID),
  foreign key (PersonID),
  references Persons(PersonID)
);

-- sql server / oracle / ms access:
create table Orders (
  OrderID int not null primary key,
  OrderNumber int not null,
  PersonID int foreign key references Persons(PersonID)
);

-- mysql / sql server / oracle / ms access:
create table Orders (
  OrderID int not null,
  OrderNumber int not null,
  PersonID int,
  primary key (OrderID),
  constraint FK_PersonOrder foreign key (PersonID) references Persons(PersonID)
);

alter table Orders add foreign key (PersonID) references Persons(PersonID);

alter table Orders add constraint FK_PersonOrder foreign key (PersonID) references Persons(PersonID);

-- mysql
alter table Orders drop foreign key FK_PersonOrder;

-- sql server/ oracle/ ms access:
alter table Orders drop constraint FK_PersonOrder;

-- mysql
create table Persons (
  ID int not null,
  LastName varchar(255) not null,
  FirstName varchar(255),
  Age int,
  check (Age>=18)
);

-- sql server/ oracle/ ms access:
create table Persons (
  ID int not null,
  LastName varchar(255) not null,
  FirstName varchar(255),
  Age int check (Age>=18)
);

-- mysql/ sql server/ oracle/ ms access:
create table Persons (
  ID int not null,
  LastName varchar(255) not null,
  FirstName varchar(255),
  Age int,
  City varchar(255),
  constraint CHK_Person check (Age>=18 and City='Sandnes')
);

-- mysql/ sql server / oracle / ms access:
alter table Persons add check (Age>=18);

alter table Persons add constraint CHK_PersonAge check (Age>=18 and City='Sandnes');

-- sql server / oracle / ms access:
alter table Persons drop constraint CHK_PersonAge;

-- mysql
alter table Persons drop check CHK_PersonAge;

--- mysql / sql server / oracle / ms access:
create table Persons (
  ID int not null,
  LastName varchar(255) not null,
  FirstName varchar(255),
  Age int,
  City varchar(255) default 'Sandnes'
);

create table Orders (
  ID int not null,
  OrderNumber int not null,
  OrderDate date default getdate()
)

-- mysql:
alter table Persons
alter City set default 'Sandnes';

-- sql server / ms access:
alter table Persons
alter column City set default 'Sandnes';

-- oracle:
alter table Persons
modify City default 'Sandnes';

-- mysql:
alter table Persons
alter City drop default;

-- sql server/ oracle/ ms access:
alter table Persons
alter column City drop default;

create index idx_lastname on Persons (LastName);

create index idx_pname on Persons (LastName, FirstName);

-- ms access:
drop index index_name on table_name;

-- sql server:
drop index table_name.index_name;

-- db2/oracle:
drop index index_name;

-- mysql:
alter table table_name
drop index index_name;

create table Persons (
  ID int not null auto_increment,
  LastName varchar(255) not null,
  FirstName varchar(255),
  Age int,
  primary key (ID)
);

alter table Persons auto_increment=100;

insert into Persons (FirstName, LastName) values ('Lars', 'Monsen');

create table Persons (
  ID int identity(1, 1) primary key,
  LastName varchar(255) not null,
  FirstName varchar(255),
  Age int
);

insert into Persons (FirstName, LastName) values ('Lars', 'Monsen');

create table Persons (
  ID integer primary key autoincrement,
  LastName varchar(255) not null,
  FirstName varchar(255),
  Age int
);

insert into Persons (FirstName, LastName) values ('Lars', 'Monsen');

create sequence seq_person minvalue 1 start with 1 increment by 1 cache 10;

insert into Persons (ID, FirstName, LastName) values (seq_person.nextval, 'Lars', 'Monsen');

select * from Orders where OrderDate='2008-11-11';

select * from Orders where OrderDate='2008-11-11';

create view view_name as select column1, column2, ... from table_name where condition;

select * from Users where UserId=105 or 1=1;
```