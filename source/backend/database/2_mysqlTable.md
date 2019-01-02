---
title: mysql表操作
order: 2
type: mysql
---

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