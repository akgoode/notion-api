FROM node

WORKDIR /usr/src/notion-api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "index.js"]