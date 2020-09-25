FROM node:12-slim as builder

RUN apt-get update -y
RUN apt-get install -y git python python-dev make gcc g++

WORKDIR /vue-app
COPY . .
RUN npm i --force
RUN npm run build

FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY ./k8s/nginx.conf /etc/nginx
COPY --from=builder /vue-app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
