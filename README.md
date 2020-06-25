# 初始代码

## 启动数据库
```
// 创建目录，与下列命令对应
mkdir blog-data
// 启动 docker 容器
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
// 进入虚拟机
docker exec -it 对应ID bash
// 进入数据库
psql -U blog
// 查看目前有那些表
\l
// 删除数据库
drop database blog_development;
// 创建数据库
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
// 
```

## 开发
```
yarn dev:babel
```