# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

# production environment
FROM node:13.12.0-alpine
COPY --from=build /app/build /app
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "/app", "-s"]
