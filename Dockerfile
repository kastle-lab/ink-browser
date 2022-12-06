FROM node:19-alpine

WORKDIR /app

COPY ./browser/package.json .

RUN npm install

COPY ./browser .

EXPOSE 3000

CMD ["npm", "start"]
