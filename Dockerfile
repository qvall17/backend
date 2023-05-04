FROM node:10
# ENV NODE_ENV=production

RUN apt-get update && \
    apt-get -y install libbcprov-java libcommons-lang3-java default-jre-headless pdftk && \
    apt-get clean

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "./build/server.ts" ]
