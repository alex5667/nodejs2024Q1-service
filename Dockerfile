FROM node:21-alpine3.18

ARG PORT
ENV PORT=$PORT
WORKDIR  /app
COPY package*.json .

RUN npm i && npm cache clean --force
COPY . .
RUN npx prisma generate
EXPOSE $PORT

CMD ["npm", "run",  "start:prisma"]