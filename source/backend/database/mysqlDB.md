---
title: mysql库操作
type: mysql
order: 3
---

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