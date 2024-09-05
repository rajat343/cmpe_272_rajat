For this assignement I created 3 separate services hello-service, world-service and aggregator-service.

All these 3 services are inside separate folders.
Use npm install to install modules for each service.

Also since aggregator-service calls hello-service and world-service separately to get the final output "Hello World" (using docker), they need to be present inside a same docker network.

Create a docker network using below command.
docker network create <network_name> (eg. docker network create my_network)

## Hello Service

To build docker image for hello-service, go to the hello directory and run below commands.

docker build -t hello-service -f hello.Dockerfile .

Run the image using below command:

docker run -d --name hello-container --network my_network -p 3001:3001 hello-service
(If container is running you could test it by going to url http://localhost:3001/hello => returns "Hello")

For kubernetes we need to push it to the docker hub.
Use below commands to tag the image:

docker tag hello-service:latest rajatmishra343/hello-service:latest (rajatmishra343 is my docker username)

Use below commands to push the image:

docker push rajatmishra343/hello-service:latest

## World Service

To build docker image for world-service, go to the world directory and run below commands.

docker build -t world-service -f world.Dockerfile .

Run the image using below command:

docker run -d --name world-container --network my_network -p 3002:3002 world-service
(If container is running you could test it by going to url http://localhost:3002/world => returns "World")

For kubernetes we need to push it to the docker hub.
Use below commands to tag the image:

docker tag world-service:latest rajatmishra343/world-service:latest

Use below commands to push the image:

docker push rajatmishra343/world-service:latest

## Aggregator service

To build docker image for aggregator-service, go to the aggregator directory and run below commands.

docker build -t aggregator-service -f aggregator.Dockerfile .

Run the image using below command:

docker run -d --name aggregator-container --network my_network -p 3003:3003 aggregator-service
(If container is running you could test it by going to url http://localhost:3003/helloworld => returns "Hello World")

For kubernetes we need to push it to the docker hub.
Use below commands to tag the image:

docker tag aggregator-service:latest rajatmishra343/aggregator-service:latest

Use below commands to push the image:

docker push rajatmishra343/aggregator-service:latest

Now all 3 docker images are added to docker hub

To create deployment, services, pods and ingress use below commands
kubectl apply -f hello-deployment.yaml (in hello directory)
kubectl apply -f world-deployment.yaml (in world directory)
kubectl apply -f aggregator-deployment.yaml (in aggregator directory)

use commands to get base url of every service
minikube service hello-service --url
minikube service world-service --url
minikube service aggregator-service --url

A url will be returned from the above commands
use that base url + endpoint in any browser or postman to see the results
examples are below
http://127.0.0.1:57491/hello (returns Hello)
![alt text](https://github.com/rajat343/cmpe_272_rajat/blob/main/hello_world_microservice/outputs/hello.png?raw=true)

http://127.0.0.1:57513/world (returns World)
![alt text](https://github.com/rajat343/cmpe_272_rajat/blob/main/hello_world_microservice/outputs/world.png?raw=true)

http://127.0.0.1:57540/helloworld (returns Hello World)
![alt text](https://github.com/rajat343/cmpe_272_rajat/blob/main/hello_world_microservice/outputs/aggregator.png?raw=true)

use ngrok to expose the local port to all
ngrok http <port_number> (eg. ngrok http 57540)

use the returned base url + endpoint to see the output
(eg. https://da14-2601-646-a002-b10-350f-6eea-eb9d-9bdd.ngrok-free.app/helloworld)
![alt text](https://github.com/rajat343/cmpe_272_rajat/blob/main/hello_world_microservice/outputs/aggregator_ngrok.png?raw=true)

Docker Hub images urls:

https://hub.docker.com/repository/docker/rajatmishra343/hello-service
https://hub.docker.com/repository/docker/rajatmishra343/world-service
https://hub.docker.com/repository/docker/rajatmishra343/aggregator-service
