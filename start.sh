#!/bin/bash
app="portfolio-full-stack"
docker stop ${app}
docker rm ${app}
docker rmi ${app}
docker build -t ${app} .
docker run -d -p 5000:5000 \
  --name=${app} \
  -v $PWD:/app ${app}
read -n1 -s