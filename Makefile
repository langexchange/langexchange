.PHONY: build

DOCKER_USERNAME ?= narutosimaha
APPLICATION_NAME ?= lec-langexchange
 
build:
	docker build -t ${DOCKER_USERNAME}/${APPLICATION_NAME} .

run:
	docker run --rm -p 8010:80 --env NGINX_HOST=localhost  narutosimaha/lec-langexchange

# compose:
# 	docker compose up -d --force-recreate