#!/bin/bash

CONTAINER=factory-control

if [ "x$(which docker)" == "x" ]; then
  echo "docker is missing" # "UNKNOWN - Missing docker binary"
  exit 1
fi

docker info > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "UNKNOWN - Unable to talk to the docker daemon"
  exit 1
fi

RUNNING=$(docker inspect --format="{{.State.Running}}" $CONTAINER 2> /dev/null)

if [ $? -eq 1 ]; then
  docker run --detach --name $CONTAINER -p 5432:5432 --env POSTGRES_DATABASE=factorydb --env POSTGRES_USER=factory-user --env POSTGRES_PASSWORD=password --env POSTGRES_ROOT_PASSWORD=rootpassword -d postgres
elif [ "$RUNNING" == "false" ]; then
  docker start $CONTAINER
fi
wait

RESTARTING=$(docker inspect --format="{{.State.Restarting}}" $CONTAINER)

if [ "$RESTARTING" == "true" ]; then
  echo "WARNING - $CONTAINER state is restarting."
  exit 1
fi

until [ "`docker inspect -f {{.State.Running}} $CONTAINER`"=="true" ]; do
    sleep 0.1;
done;

if [ "x$(which yarn)" != "x" ]; then
  echo "yarn found!"
  yarn prisma
else
  echo "NPM found!"
  npm run prisma
fi

wait

exit
