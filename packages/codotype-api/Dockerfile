# FROM ubuntu:latest
FROM node:latest

# Create a directory where our app will be placed
RUN mkdir /app

# Get all the in this repository
COPY ./ /app

# Installs global NPM dependencies
RUN npm install -g forever
# RUN npm install -g glob-run
# RUN npm install -g js-beautify

# Change to the app directory
# Install app dependecies
WORKDIR /app
RUN npm install

# Serve the app
# CMD ["sudo", "node", "server.js"]
CMD ["node", "server.js"]
