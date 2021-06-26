from django.core.management.base import BaseCommand
from rest_framework.schemas.openapi import SchemaGenerator
from rest_framework import renderers


class Command(BaseCommand):
    help = 'generate api schema'

    def handle(self, *args, **options):
        generator = SchemaGenerator(
            title='Coaching API',
            version='0.0.1',
        )
        schema = generator.get_schema()
        renderer = renderers.JSONOpenAPIRenderer()
        output = renderer.render(schema, renderer_context={})
        self.stdout.write(output.decode())
