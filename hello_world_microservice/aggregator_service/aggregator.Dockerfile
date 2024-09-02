FROM node:22

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3003

CMD ["node", "aggregator.service.js"]
