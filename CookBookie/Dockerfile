# syntax=docker/dockerfile:1

FROM node:lts-alpine

WORKDIR /app

COPY . /app/

RUN npm i -g @angular/cli concurrently

RUN npm i

CMD [ "concurrently", "ng serve --host 0.0.0.0", "node server.js" ]
