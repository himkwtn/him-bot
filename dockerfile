FROM node:12-alpine
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY ./tsconfig.json ./tsconfig.build.json ./
COPY ./src ./src
RUN yarn build
CMD yarn start:prod
