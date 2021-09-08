FROM node:16.8-alpine3.11
LABEL maintainer="Alan Perez <diegoalanperezz@gmail.com>"
LABEL version="1.0"

RUN npm set strict-ssl false global

#Install Nodemon, rimraf, typescript adn PM2
ENV DEBIAN_FRONTEND noninteractive

RUN npm i -g nodemon typescript pm2 rimraf
WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN npm run build
RUN chmod +x ./start.sh
ENTRYPOINT [ "./start.sh" ]
