FROM node:20.17.0-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx tsc

FROM node:20.17.0-alpine as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci 

COPY --from=build /usr/src/app/dist /usr/src/app/

COPY .env /usr/src/app/

ENV TZ=America/Sao_Paulo

EXPOSE 5002

CMD ["node", "server.js"]