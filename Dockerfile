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
RUN yarn build

# Stage 2: Serve the built app

# FROM nginx:1.23.3

# COPY ./conf/*.conf.template /etc/nginx/templates/
# COPY ./conf/nginx.conf /etc/nginx/
# COPY ./certs /etc/nginx/certs

# COPY --from=build /app/build /usr/local/src/langex
# # ARG REACT_APP_API_URL_ROOT
# # ENV REACT_APP_API_URL_ROOT=$REACT_APP_API_URL_ROOT

# EXPOSE 80/tcp
# EXPOSE 443
# =======
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]