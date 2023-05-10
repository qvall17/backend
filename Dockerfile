FROM node:16-alpine

RUN apt-get update && \
    apt-get -y install && \
    apt-get clean

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "./build/server.ts" ]
