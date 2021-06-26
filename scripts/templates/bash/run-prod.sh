#!/bin/bash

SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

cd ${SCRIPT_DIR}/../../..

DOCKER_CONFIG_DIR=`pwd`/scripts/generated

make build_prod_frontend

# building
docker-compose -f ${DOCKER_CONFIG_DIR}/docker-compose-prod.yml stop 
docker-compose -f ${DOCKER_CONFIG_DIR}/docker-compose-prod.yml build

docker-compose \
  -f ${DOCKER_CONFIG_DIR}/docker-compose-prod.yml up -d {{ PROJECT_NAME }}_db

sleep 10

echo "================INIT SITE====================="
docker-compose \
  -f ${DOCKER_CONFIG_DIR}/docker-compose-prod.yml \
  run --rm {{ PROJECT_NAME }}_site_prod bash -c "python manage.py makemigrations"

docker-compose \
  -f ${DOCKER_CONFIG_DIR}/docker-compose-prod.yml \
  run --rm {{ PROJECT_NAME }}_site_prod bash -c "python manage.py migrate"
echo "=============================================="

docker-compose \
  -f ${DOCKER_CONFIG_DIR}/docker-compose-prod.yml up
