FROM python:3

MAINTAINER Sergey Grigorev "xors.nn@gmail.com"

RUN mkdir /requirements
COPY ./requirements.txt /requirements/requirements.txt
RUN pip install -r /requirements/requirements.txt
RUN rm -rf /requirements

RUN mkdir /app
RUN mkdir /app/core
WORKDIR /app/core/

EXPOSE 80
