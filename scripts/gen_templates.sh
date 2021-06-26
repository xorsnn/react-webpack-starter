#!/bin/bash

SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

cd ${SCRIPT_DIR}

[ ! -d "./.venv" ] && virtualenv -p python3 .venv
source ./.venv/bin/activate
pip install -r requirements.txt
python generate_templates.py
deactivate
