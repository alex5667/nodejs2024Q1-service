FROM node:21-alpine

ARG PORT
ENV PORT=$PORT
WORKDIR  /app
COPY package*.json .

RUN npm install
COPY . .
EXPOSE $PORT
CMD ["npm", "run",  "start:dev"]