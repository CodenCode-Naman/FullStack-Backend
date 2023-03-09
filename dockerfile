FROM alpine:latest

# install node and npm
RUN apk add --update nodejs npm
# set working directory
WORKDIR /app

# install dependencies
COPY package.json package.json
RUN npm install
RUN npm install -g nodemon
# install redis
# RUN apk add --update redis

ENV NODE_ENV=docker

# copy source code
COPY . .

# expose port
EXPOSE  8001

# start app
CMD ["nodemon", "src/app.js"]