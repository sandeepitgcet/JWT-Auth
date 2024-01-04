# Base image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json /app/

# Install app dependencies
RUN npm install

# Bundle app source
COPY . /app

EXPOSE 3000

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "src/index.js" ]
