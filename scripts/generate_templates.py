from jinja2 import Environment, FileSystemLoader, select_autoescape
from pathlib import Path
import os
from dotenv import load_dotenv
import argparse

env_path = Path("../") / ".env"
load_dotenv(dotenv_path=env_path)


def main(args):
    script_dir = os.path.dirname(os.path.realpath(__file__))

    PROJECT_NAME = os.environ.get("PROJECT_NAME", "undefined")
    DATABASE_NAME = os.environ.get("DATABASE_NAME", "undefined")
    DATABASE_USER = os.environ.get("DATABASE_USER", "undefined")
    DATABASE_PASSWORD = os.environ.get("DATABASE_PASSWORD", "undefined")
    EXTERNAL_HOST = os.environ.get("EXTERNAL_HOST", "undefined")
    EXTERNAL_PROTOCOL = os.environ.get("EXTERNAL_PROTOCOL", "undefined")
    DJANGO_SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "undefined")

    config = {
        "PROJECT_NAME": PROJECT_NAME,
        "DATABASE_NAME": DATABASE_NAME,
        "DATABASE_USER": DATABASE_USER,
        "DATABASE_PASSWORD": DATABASE_PASSWORD,
        "VIRTUAL_HOST": EXTERNAL_HOST,
        "EXTERNAL_HOST": EXTERNAL_HOST,
        "EXTERNAL_PROTOCOL": EXTERNAL_PROTOCOL,
        "DJANGO_SECRET_KEY": DJANGO_SECRET_KEY,
        "DEBUG": "True"
    }

    env = Environment(
        loader=FileSystemLoader(os.path.join(script_dir, "templates")),
        autoescape=select_autoescape(["yml", "conf"]),
    )

    generated_dir = os.path.join(script_dir, "generated")
    if not os.path.exists(generated_dir):
        os.makedirs(generated_dir)

    # docker-compose
    template_name = "docker-compose-local.yml"
    template = env.get_template('docker-compose/'+template_name)
    template.stream(config).dump(generated_dir + "/" + template_name)

    template_name = "docker-compose-prod.yml"
    template = env.get_template('docker-compose/'+template_name)
    template.stream(config).dump(generated_dir + "/" + template_name)

    template_name = "docker-compose-build-prod-frontend.yml"
    template = env.get_template('docker-compose/'+template_name)
    template.stream(config).dump(generated_dir + "/" + template_name)

    # docker
    directory = 'docker'

    deploy_config_dir = generated_dir

    template_name = 'Dockerfile'
    template = env.get_template(os.path.join(directory, template_name))
    template.stream(config).dump(
        os.path.join(deploy_config_dir, template_name))

    template_name = 'requirements.txt'
    template = env.get_template(os.path.join(directory, template_name))
    template.stream(config).dump(
        os.path.join(deploy_config_dir, template_name))

    #  NGINX
    nginx_config_dir = generated_dir + '/config/nginx'
    if not os.path.exists(nginx_config_dir):
        os.makedirs(nginx_config_dir)

    directory = 'nginx'

    template_name = 'site.conf'
    template = env.get_template(directory + '/' + template_name)
    template.stream(config).dump(os.path.join(nginx_config_dir, template_name))

    template_name = 'site-prod.conf'
    template = env.get_template(directory + '/' + template_name)
    template.stream(config).dump(os.path.join(nginx_config_dir, template_name))

    #  BASH
    directory = 'bash'

    deploy_config_dir = os.path.join(generated_dir, directory)
    if not os.path.exists(deploy_config_dir):
        os.makedirs(deploy_config_dir)

    template_name = 'run-local.sh'
    template = env.get_template(os.path.join(directory, template_name))
    template.stream(config).dump(os.path.join(
        deploy_config_dir, template_name))

    template_name = 'run-prod.sh'
    template = env.get_template(os.path.join(directory, template_name))
    template.stream(config).dump(os.path.join(
        deploy_config_dir, template_name))

    template_name = 'gen_schema.sh'
    template = env.get_template(os.path.join(directory, template_name))
    template.stream(config).dump(os.path.join(
        deploy_config_dir, template_name))

    template_name = 'build_front.sh'
    template = env.get_template(os.path.join(directory, template_name))
    template.stream(config).dump(os.path.join(
        deploy_config_dir, template_name))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Lugati config generation")

    parser.add_argument(
        "--prod",
        action="store_true",
        dest="prod",
        default=False,
        help="Build mode",
    )

    args = parser.parse_args()

    main(args)
