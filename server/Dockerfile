FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN npm install
RUN npm ci --silent

# Bundle app source
COPY . .

RUN ls -a
RUN npm run tsc

EXPOSE 4000
CMD [ "node", "build/index.js" ]