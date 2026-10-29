#!/bin/bash
app="portfolio-full-stack"
docker stop ${app}
docker rm ${app}
docker rmi ${app}
docker build -t ${app} -f Dockerfile.prod .
docker run -d -p 443:443 \
  --name=${app} \
  -v $PWD:/app \
  -v $PWD/../projects:/app/projects \
  ${app}
read -n1 -s
