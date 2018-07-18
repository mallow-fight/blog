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