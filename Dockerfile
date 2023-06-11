# Stage 1: Build the React app
FROM node:14-alpine AS build
WORKDIR /app

ARG REACT_APP_API_URL_ROOT=http://localhost:7777
# ARG REACT_APP_API_UPLOAD=http://localhost:5000

ENV REACT_APP_API_URL_ROOT=$REACT_APP_API_URL_ROOT
# ENV REACT_APP_API_UPLOAD=$REACT_APP_API_UPLOAD

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

ARG REACT_APP_API_URL_ROOT
ENV REACT_APP_API_URL_ROOT=$REACT_APP_API_URL_ROOT

ARG REACT_APP_API_UPLOAD
ENV REACT_APP_API_UPLOAD=$REACT_APP_API_UPLOAD

ARG REACT_APP_CHAT_HOST
ENV REACT_APP_CHAT_HOST=$REACT_APP_CHAT_HOST

ARG REACT_APP_CHAT_URL
ENV REACT_APP_CHAT_URL=$REACT_APP_CHAT_URL

RUN yarn build

# Stage 2: Serve the built app
# =======
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]