FROM node:8.12.0-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node wellCalculations.js
EXPOSE 3200