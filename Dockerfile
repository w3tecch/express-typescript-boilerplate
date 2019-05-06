FROM node:8-alpine

# Install Python
RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*

# Create work directory
WORKDIR /usr/src/app

# Install runtime dependencies
RUN npm install yarn -g

# Install app dependencies
COPY package*.json yarn.lock ./
RUN yarn install

# Copy app source to work directory
COPY . /usr/src/app

# Build and run the app
CMD npm start serve
