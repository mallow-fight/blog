---
title: mysql
order: 1
type: mysql
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