#!/bin/bash

SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

cd ${SCRIPT_DIR}/../../..

DOCKER_CONFIG_DIR=`pwd`/scripts/generated

echo "===============GENERATING SCHEMA============="
docker-compose \
  -f ${DOCKER_CONFIG_DIR}/docker-compose-local.yml \
  run --rm {{ PROJECT_NAME }}_site bash -c "python manage.py gen_api_schema > /app/openapi/schema.json"
echo "=============================================="
