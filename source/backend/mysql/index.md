---
title: mysql
order: 1
type: mysql
---

## mysql

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