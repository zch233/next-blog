## 清空此前的开发环境
```
docker kill 容器id
docker rm 容器id
// 新版 docker
rm -rf 容器id
// 旧版 docker
docker container prune
docker image prune
docker volume rm blog-data
```
## 启动数据库
```
// 创建目录，与下列命令对应
mkdir blog-data
// 启动 docker 容器
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
// 旧版 dokcer 不需要创建blog-data文件夹
docker run -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
// 进入虚拟机
docker exec -it 对应ID bash
// 进入数据库
psql -U blog
// 查看目前有那些表
\l 或 \dt 或 \d
// 删除数据库
drop database blog_development;
// 创建数据库
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
// 检查 ormconfig.json 中的配置
// 升级数据表 or 降级数据表
yarn migration:run or yarn migration:revert
// 填充数据
// node dist/seed.js
```

## 清空
```
docker kill 容器
docker rm 容器

rm -rf blog-data
或
docker volume ls
docker container prune
docker valume rm blog-data
```
## 开发
```
yarn dev:babel
```