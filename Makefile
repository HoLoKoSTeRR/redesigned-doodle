.PHONY: build help

PACKAGES_DIR := $(shell ls -d */)
help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## install dependencies
	for package in $(PACKAGES_DIR); do \
	    cd $${package}; \
		yarn; \
        cd ..; \
    done
clear: ## clear dependencies
	for package in $(PACKAGES_DIR); do \
	    cd $${package}; \
	    rm -fr node_modules; \
        cd ..; \
    done

run-backend: ## run backend	server
	@yarn -s run-backend

run-admin: ## run "admin panel"
	@yarn -s run-admin

run-test_case: ## run TestCase
	@yarn -s run-test_case

build-test_case: ## build TestCase
	@echo "Transpiling test_case files...";
	@cd ./test_case && yarn -s build

build-admin: ## build admin	panel
	@echo "Transpiling admin files...";
	@cd ./admin && yarn -s build

