FROM node:16.8-alpine3.11
LABEL maintainer="Alan Perez <diegoalanperezz@gmail.com>"
LABEL version="1.0"
RUN apk update
RUN npm set strict-ssl false global

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY . .
# COPY src /app/src

# check files list
RUN ls -a

RUN npm install
RUN npm run build

EXPOSE 7777

CMD [ "npm", "start" ]
