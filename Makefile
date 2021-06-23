gen_templates:
	bash scripts/gen_templates.sh

gen-schema-local: gen_templates
	bash scripts/generated/bash/gen_schema.sh

gen-api: gen-schema-local
	docker run --rm -v ${PWD}/web/src/openapi:/local openapitools/openapi-generator-cli:latest generate \
		-i /local/schema.json \
    -g typescript-fetch \
    -o /local/client

run_local: gen_templates
	bash scripts/generated/bash/run-local.sh

run_prod: gen_templates
	bash scripts/generated/bash/run-prod.sh

build_prod_frontend: gen_templates
	bash scripts/generated/bash/build_front.sh

kill_all:
	bash scripts/kill_all.sh
