cd /home/blog/ &&
mkdir blog-data;
docker kill psql1;
docker rm psql1;
docker run --name="psql1" --net="host" -v "/home/blog/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2 &&
cd app/ &&
echo "SECRET_COOKIE_PASSWORD=c2a85490-cc60-4f21-94e8-8dc5dd32" > .env.local &&
git pull &&
yarn install --production=false &&
yarn compile &&
yarn migration:run &&
yarn build &&
docker build -t zch/node-web-app . &&
docker kill app1;
docker rm app1;
docker run --name="app1" --net="host" -p 3000:3000 -d zch/node-web-app &&
echo "部署完成"