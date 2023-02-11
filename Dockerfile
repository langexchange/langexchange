FROM node:alpine
WORKDIR '/langexchange'
COPY ./package.json /package.json
COPY ./yarn.lock /yarn.lock
RUN yarn install
COPY . .
CMD ["yarn", "start"]
