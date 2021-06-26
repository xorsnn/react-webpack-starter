#!/bin/bash

SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

cd ${SCRIPT_DIR}/../../..

DOCKER_CONFIG_DIR=`pwd`/scripts/generated

echo "===============BUILDING FRONTEND============="
docker-compose \
  -f ${DOCKER_CONFIG_DIR}/docker-compose-build-prod-frontend.yml \
  run --rm {{ PROJECT_NAME }}_build_frontend_prod \
  bash -c "cd /app/frontend && npm install && npm run build"
echo "=============================================="
