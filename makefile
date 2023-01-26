.PHONY: up
up: ## start docker container
	docker-compose up -d

.PHONY: stop
stop: ## Stop and remove a running container
	docker-compose stop