For this assignment, I created three separate services:
- `hello-service`
- `world-service`
- `aggregator-service`

Each service is in its own folder. Run `npm install` inside each service folder before building.

Because `aggregator-service` calls both `hello-service` and `world-service` (in Docker) to produce `Hello World`, all containers must run on the same Docker network.

Create a Docker network:

```bash
docker network create <network_name>
# Example:
docker network create my_network
```

## Hello Service

Go to the `hello_service` directory and build the image:

```bash
docker build -t hello-service -f hello.Dockerfile .
```

Run the container:

```bash
docker run -d --name hello-container --network my_network -p 3001:3001 hello-service
```

Test:
- `http://localhost:3001/hello` -> returns `Hello`

Tag and push to Docker Hub:

```bash
docker tag hello-service:latest rajatmishra343/hello-service:latest
docker push rajatmishra343/hello-service:latest
```

## World Service

Go to the `world_service` directory and build the image:

```bash
docker build -t world-service -f world.Dockerfile .
```

Run the container:

```bash
docker run -d --name world-container --network my_network -p 3002:3002 world-service
```

Test:
- `http://localhost:3002/world` -> returns `World`

Tag and push to Docker Hub:

```bash
docker tag world-service:latest rajatmishra343/world-service:latest
docker push rajatmishra343/world-service:latest
```

## Aggregator Service

Go to the `aggregator_service` directory and build the image:

```bash
docker build -t aggregator-service -f aggregator.Dockerfile .
```

Run the container:

```bash
docker run -d --name aggregator-container --network my_network -p 3003:3003 aggregator-service
```

Test:
- `http://localhost:3003/helloworld` -> returns `Hello World`

Tag and push to Docker Hub:

```bash
docker tag aggregator-service:latest rajatmishra343/aggregator-service:latest
docker push rajatmishra343/aggregator-service:latest
```

All three Docker images are now available on Docker Hub.

## Kubernetes Deployment (Minikube)

Create deployments/services using:

```bash
# Run in hello_service directory
kubectl apply -f hello-deployment.yaml

# Run in world_service directory
kubectl apply -f world-deployment.yaml

# Run in aggregator_service directory
kubectl apply -f aggregator-deployment.yaml
```

Get the base URL for each service:

```bash
minikube service hello-service --url
minikube service world-service --url
minikube service aggregator-service --url
```

Use the returned URL + endpoint in your browser or Postman.

Examples:
- `http://127.0.0.1:57491/hello` (returns `Hello`)
![hello output](https://github.com/rajat343/cmpe_272_rajat/blob/main/hello_world_microservice/outputs/hello.png?raw=true)

- `http://127.0.0.1:57513/world` (returns `World`)
![world output](https://github.com/rajat343/cmpe_272_rajat/blob/main/hello_world_microservice/outputs/world.png?raw=true)

- `http://127.0.0.1:57540/helloworld` (returns `Hello World`)
![aggregator output](https://github.com/rajat343/cmpe_272_rajat/blob/main/hello_world_microservice/outputs/aggregator.png?raw=true)

## Expose Publicly with ngrok

Expose a local port:

```bash
ngrok http <port_number>
# Example:
ngrok http 57540
```

Use the returned ngrok URL + endpoint to test:
- Example: `https://da14-2601-646-a002-b10-350f-6eea-eb9d-9bdd.ngrok-free.app/helloworld`
![aggregator ngrok output](https://github.com/rajat343/cmpe_272_rajat/blob/main/hello_world_microservice/outputs/aggregator_ngrok.png?raw=true)

## Docker Hub Image URLs

- https://hub.docker.com/repository/docker/rajatmishra343/hello-service
- https://hub.docker.com/repository/docker/rajatmishra343/world-service
- https://hub.docker.com/repository/docker/rajatmishra343/aggregator-service
