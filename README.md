# Fleek IPFS API

This challenge includes the following modules:
- [API Server](./server)
- [Proxy Server](./proxy)
- [Client](./client/README.md)

## Getting started

There are a few things that you need in order to setup the project:

### Pre-requisites

- **[IPFS Desktop](https://docs.ipfs.io/install/command-line/)** (required for running the local IPFS node)
- **[Docker](https://www.docker.com/)**

After we've got the above installed, you should follow a few steps:

Clone this repository 

```
git clone https://github.com/tszemzo/ipfs-api.git
```

`cd` in to created directory

```
cd ipfs-api
```

Install all the modules with the following command:

```
npm run install-all
```

Run Docker Compose so we set up our mongo DB service
```
docker-compose up -d
```

Run our IPFS Daemon on another terminal.
```
ipfs daemon
```

Finally we need to run the three modules. First run `npm start` on ./proxy and ./server. And finally, run `npm start` on ./client.

## Resources
- A [Postman Collection Link](https://www.getpostman.com/collections/c2136eccce8d1186420b) to test the API and Proxy if needed]

## Written questions
### How would you improve this assignment for a production ready solution (e.g., security,deployment)?

...
### Describe IPFS and compare it to other protocols e.g., HTTP?

...
