---
title: mysql练习
order: 2
type: mysql
---

> [在线练习网站](http://sqlzoo.net/wiki/SELECT_basics)
> [w3schools](https://www.w3schools.com/sql/default.asp)

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
```
