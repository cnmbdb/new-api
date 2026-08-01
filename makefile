WEB_DIR = ./web
API_DIR = .
DEV_WEB_PORT ?= 5173
DEV_COMPOSE_FILE = docker-compose.dev.yml
DEV_API_SERVICE = new-api
DEV_SQLITE_PATH ?= one-api.db

.PHONY: all build-web build-all-web start-api dev dev-pull dev-api dev-api-rebuild dev-web reset-setup test

all: build-all-web start-api

build-web:
	@echo "Building web frontend..."
	@cd $(WEB_DIR) && bun install --frozen-lockfile
	@cd $(WEB_DIR) && DISABLE_ESLINT_PLUGIN='true' VITE_REACT_APP_VERSION=$$(cat ../VERSION) bun run build

build-all-web: build-web

start-api:
	@echo "Starting api dev server..."
	@cd $(API_DIR) && go run main.go &

dev-api:
	@echo "Starting SQLite api service from the remote development image..."
	@docker compose -f $(DEV_COMPOSE_FILE) up -d new-api

dev-api-rebuild:
	@echo "Refreshing the remote development image and recreating the api service..."
	@docker compose -f $(DEV_COMPOSE_FILE) pull $(DEV_API_SERVICE)
	@docker compose -f $(DEV_COMPOSE_FILE) up -d --force-recreate $(DEV_API_SERVICE)

dev-web:
	@echo "Starting web frontend from the remote development image..."
	@echo "Web frontend: http://localhost:$(DEV_WEB_PORT)"
	@docker compose -f $(DEV_COMPOSE_FILE) up web

dev:
	@docker compose -f $(DEV_COMPOSE_FILE) up

dev-pull:
	@docker compose -f $(DEV_COMPOSE_FILE) pull

# The main package embeds the ignored web/dist output and is covered after build-web.
test:
	@echo "Testing root Go module..."
	@root_module=$$(GOWORK=off go list -m); \
		root_packages=$$(GOWORK=off go list -e ./... | grep -vxF "$$root_module"); \
		GOWORK=off go test $$root_packages
	@echo "Testing relaykit Go module..."
	@cd relaykit && GOWORK=off go test ./...

reset-setup:
	@echo "Resetting local setup wizard state..."
	@if docker compose -f $(DEV_COMPOSE_FILE) ps --services --status running | grep -qx "$(DEV_API_SERVICE)"; then \
		echo "Detected running Docker SQLite development service. Removing setup record and root users..."; \
		docker compose -f $(DEV_COMPOSE_FILE) exec -T $(DEV_API_SERVICE) \
			sqlite3 /data/one-api.db \
			"DELETE FROM setups; DELETE FROM users WHERE role = 100; DELETE FROM options WHERE key IN ('SelfUseModeEnabled', 'DemoSiteEnabled');"; \
		echo "Restarting docker dev api so setup status is recalculated..."; \
		docker compose -f $(DEV_COMPOSE_FILE) restart $(DEV_API_SERVICE); \
	elif db_path="$${SQLITE_PATH:-$(DEV_SQLITE_PATH)}"; db_path="$${db_path%%\?*}"; [ -f "$$db_path" ]; then \
		db_path="$${SQLITE_PATH:-$(DEV_SQLITE_PATH)}"; \
		db_path="$${db_path%%\?*}"; \
		echo "Detected local SQLite database: $$db_path"; \
		sqlite3 "$$db_path" \
			"DELETE FROM setups; DELETE FROM users WHERE role = 100; DELETE FROM options WHERE key IN ('SelfUseModeEnabled', 'DemoSiteEnabled');"; \
		echo "SQLite setup state reset. Restart the local api process before testing the setup wizard."; \
	else \
		echo "No running Docker dev API or local SQLite database found."; \
		echo "Start the dev stack with 'make dev-api', or set SQLITE_PATH/DEV_SQLITE_PATH to your local SQLite database."; \
		exit 1; \
	fi
