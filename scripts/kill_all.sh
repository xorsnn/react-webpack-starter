#!/bin/bash

SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

cd ${SCRIPT_DIR}

docker-compose \
  -f generated/docker-compose-local.yml  stop

yes Y | docker-compose \
  -f generated/docker-compose-local.yml rm -v

docker-compose \
  -f generated/docker-compose-prod.yml  stop

yes Y | docker-compose \
  -f generated/docker-compose-prod.yml rm -v
