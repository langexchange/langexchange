# Stage 1: Build the React app
FROM node:14-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Serve the built app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
ARG REACT_APP_API_URL_ROOT
ENV REACT_APP_API_URL_ROOT=$REACT_APP_API_URL_ROOT
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]