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

## 部署
[https://nodejs.org/en/docs/guides/nodejs-docker-webapp/](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
按照文档来（目前用的是 yarn 所以略作修改）
```
touch Dockerfile
```
```
FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]
```
```
touch .dockerignore
```
```
node_modules
*.log
```
#### build：
```
// docker build -t <your username>/node-web-app .
docker build -t zch/node-web-app .
```
#### run:
```
// docker run -p 49160:8080 -d <your username>/node-web-app
docker run -p 3000:3000 -d zch/node-web-app
// docker run --network=host -p 3000:3000 -d zch/node-web-app // 服务器
```

## 连接服务器
- 上 aliyun.com 购买一台服务器，推荐镜像用 Ubuntu 18.04 64位的系统，教程最多
```
ssh root@服务器ip
```
> 如果记不住 ip 地址，可以在第一次输入以后，修改本地的 hosts 文件，增加如下
> 服务器ip 你想要的别名：如 dev
> 下次就可以 ssh root@dev 即可

#### 上传 ssh pub key
因为一直在用 github 的 ssh key
所以就不用再次新建了（一台机器一个 key 就够了），直接上传
```
// ssh-copy-id -i ~/.ssh/id_rsa.pub root@服务器ip
ssh-copy-id ssh root@服务器ip
```
以后再次连接就不用在输入密码了

#### 修改密码（可选）
```
passwd root
```

#### 如果想让别人登录你的服务器，两种方式
- 告诉他你服务器的密码
- 在你的服务器中加入他的 ssh 公钥
- vi ~/.ssh/authorized_keys


#### 分配用户
- 最好不要每次都用 root 登录服务器，因为权限太大了
- 我们创建一个 blog 用户
- adduser blog
- 输入密码以后，一直回车
- 切换用户 su - blog
- 以后就是用 ssh blog@dev 登录

#### 在服务器上安装 docker
- 用 root 进入服务器
- [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
- 按教程来

#### 给 blog 用户分配 docker 权限
- 查看所有权限：cat /etc/group
- 添加进组：usermod -a -G docker blog
- 验证：docker run hello-world

## 安装 docker nginx
```
docker run --name="nginx1" --net="host" -v /home/blog/nginx.conf:/etc/nginx/conf.d/default.conf -d nginx:1.19.1
docker run --name="nginx1" --net="host" -v /home/blog/nginx.conf:/etc/nginx/conf.d/default.conf -v /blog/app/.next/static/:/usr/share/nginx/html/_next/static -d nginx:1.19.1
docker exec -it nginx1 service nginx reload // 重启 nginx 服务
// nginx -t // 验证配置
// nginx -s reload // 重启配置
```

## 一键部署
#### 本地脚本在远程服务器上执行
// 执行本地脚前最好加上 chmod +x serve.sh ，不加也可以
```
// ssh root@服务器ip 'bash -s' < local_script.sh
ssh blog@dev 'bash -s' < bin/deploy.sh
```
#### 本地执行远程脚本
```
ssh root@服务器ip 'sh server.sh'
```
