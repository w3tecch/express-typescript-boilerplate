FROM node:17-alpine3.14

# Update apk
RUN apk add --update --no-cache curl py-pip

# Create work directory
WORKDIR /usr/src/app

# Copy app source to work directory
COPY . /usr/src/app

# Install app dependencies
RUN yarn install

# Build and run the app
CMD npm start serve
