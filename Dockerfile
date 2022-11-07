#packageインストール
FROM node:16.15.1-alpine AS package

WORKDIR /blog-site
COPY ./package.json ./package-lock.json ./
RUN npm install --no-progress

#実行環境
FROM node:14.16.1-alpine as runtime

WORKDIR /blog-site
COPY ./public ./public 
COPY ./src ./src
COPY package.json package-lock.json .
COPY --from=package /blog-site/node_modules ./node_modules

EXPOSE 3000
CMD ["npm","start"]