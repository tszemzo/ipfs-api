# Fleek IPFS API

This challenge includes the following modules:
- [API Server](./server)
- [Proxy Server](./proxy)
- [Client](./client/README.md)

## Getting started

There are a few things that you need in order to setup the project:

### Pre-requisites

- **[IPFS Desktop](https://docs.ipfs.io/install/command-line/)** (required for running the local IPFS node)
- **[Docker](https://www.docker.com/)** (required for running our mongo DB service)
- **[NVM](https://github.com/nvm-sh/nvm)** (not mandatory, nvm allows you to quickly install and use different versions of node via the command line)

* If you aren't using NVM, be sure to have a version of Node higher than +12.

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
- A [Postman Collection Link](https://www.getpostman.com/collections/c2136eccce8d1186420b) to test the API and Proxy if needed.

## Written questions
### How would you improve this assignment for a production ready solution (e.g., security,deployment)?

There are a few improvements that I'd add to this solution:

- Better designs and UI on the client. Be more consistent on how we build the components on it.
- Improve the api component on the client so we can customize the requests easily (headers, tokens, error responses, etc...)
- Better authentication system, adding a robust Sessions model, probably using cookies for storing session token instead of localStorage.
- Dockerize each module making it easier for deployment.
- Add tests, specially in our server module.

### Describe IPFS and compare it to other protocols e.g., HTTP?

IPFS is a distributed system for storing and accessing files, websites, applications, and data. The key feature of IPFS is that it offers a peer to peer distributed file system and there is **no centralized server**. That being said, when using IPFS when requesting for a webpage, for example, you're not asking the response to a single distance-depending computer around the world, but to a descentralized network of computers to share the page with you.

And, when you use IPFS, you don't just download files from someone else — your computer also helps distribute them. So when someone closer to you now requests that page, they might be as likely to get it from you as they would from your neighbor or anyone else using IPFS.

IPFS makes this possible for not only web pages but also any kind of file a computer might store, whether it's a document, an email, or even a database record.

A few differences in comparison to other protocols like HTTP:

- HTTP uses a centralised client server approach, meanwhile IPFS aims to decentralize the internet with a peer-to-peer approach.
- On HTTP the data is requested using the address on which data is hosted, meanwhile IPFS uses the hash of that data.
- IPFS as mentioned copies its data on multiple nodes, hence it can be accessed whenever needed. If an HTTP server is down or fails you cannot access your data.
- Bandwidth is higher on IPFS, as data is requested from the closest peer who has the copy of that data.
- On the other hand, HTTP is well established as an industry standard, but IPFS is relatively new and is not yet as popular as HTTP.

Source:

- https://docs.ipfs.io/concepts/what-is-ipfs/
